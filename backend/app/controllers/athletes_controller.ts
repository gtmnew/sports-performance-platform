import Athlete from '#models/athlete'
import VitalSign from '#models/vitalsign'
import { AthleteService } from '#services/AthleteService'
import { CreateAthleteSchema } from '#validators/create_athlete_schema'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import vine from '@vinejs/vine'

export default class AthletesController {
  public async store({ auth, response, request }: HttpContext) {
    const data = request.only([
      'name',
      'position',
      'age',
      'height',
      'weight',
      'team',
      'isActive',
      'riskLevel',
      'biomechanicsProfile',
      'currentInjuries',
    ])

    const payload = await vine.validate({ schema: CreateAthleteSchema, data })

    const athlete = await AthleteService.create({
      ...payload,
      userId: auth.user!.id,
    })

    return response.status(201).json({
      status: 201,
      message: 'Athlete created successfully',
      athlete,
    })
  }

  public async getAllAthletes({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    const athletes = await Athlete.query().where('userId', userId).orderBy('id', 'asc')
    const total = athletes.length

    return response.json({
      athletes,
      total,
    })
  }

  public async listWithCache({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    const cacheKey = `athletes:list:${userId}`
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {
      return 'Move on without cached'
    }

    const athletes = await Athlete.query()
      .select(['id', 'name', 'position', 'team', 'riskLevel', 'isActive'])
      .where('isActive', true)
      .where('userId', userId)
      .preload('vitalSigns', (vitalSignQuery) => {
        vitalSignQuery.select([
          'id',
          'athlete_id',
          'heart_rate',
          'vo2_max',
          'lactate_level',
          'hydration_level',
          'fatigue_score',
          'training_load',
          'sleep_quality',
          'perceived_exertion',
          'created_at',
        ])
      })
      .preload('injuryRecords', (injuryQuery) => {
        injuryQuery.select([
          'id',
          'athlete_id',
          'injury_type',
          'body_part',
          'severity',
          'status',
          'injury_date',
          'recovery_date',
          'expected_recovery',
          'actual_recovery',
          'treatment_protocol',
          'cause',
          'created_at',
        ])
      })
      .orderBy('created_at', 'desc')
      .limit(5)

    const result = {
      athletes,
      updated_at: new Date().toISOString(),
    }

    try {
      await redis.setex(cacheKey, 300, JSON.stringify(result))
    } catch (error) {}
    return response.header('X-Cache', 'MISS').json(result)
  }

  public async showAthleteProfileWithInjuryRisk({ auth, params, response }: HttpContext) {
    const userId = auth.user!.id
    const cacheKey = `athlete:${params.id}:profile:${userId}`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const athlete = await Athlete.query()
      .where('id', params.id)
      .where('userId', userId)
      .preload('injuryRecords', (query) => {
        query.whereIn('status', ['active', 'recovering'])
      })
      .firstOrFail()

    const injuryRisk = athlete.calculateInjuryRisk()
    const result = {
      ...athlete.serialize(),
      injury_risk_score: injuryRisk,
      cached_at: new Date().toISOString(),
    }

    try {
      await redis.setex(cacheKey, 3600, JSON.stringify(result))
    } catch (error) {}

    return response.header('X-Cache', 'MISS').json(result)
  }

  public async getRecentVitalSigns({ auth, params, response }: HttpContext) {
    const userId = auth.user!.id
    const cacheKey = `athlete:${params.id}:vitals:${userId}`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const athlete = await Athlete.query()
      .where('id', params.id)
      .where('userId', userId)
      .firstOrFail()

    const vitals = await VitalSign.query()
      .where('athleteId', athlete.id)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .first()

    if (!vitals) {
      return response.status(404).json({ message: 'Vital signs not found' })
    }

    const result = {
      ...vitals.serialize(),
      status: this.evaluateAthleteCondition(vitals),
      cached_at: new Date().toISOString(),
    }

    try {
      await redis.setex(cacheKey, 30, JSON.stringify(result))
    } catch (error) {}

    return response.header('X-Cache', 'MISS').json(result)
  }

  public async analyzeBiomechanicalProfile({ auth, params, response }: HttpContext) {
    const userId = auth.user!.id
    const cacheKey = `athlete:${params.id}:biomechanics:${userId}`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const athlete = await Athlete.query()
      .where('id', params.id)
      .where('userId', userId)
      .firstOrFail()
    const profile = JSON.parse(athlete.biomechanicsProfile || '{}')

    const analysis = {
      athlete_id: athlete.id,
      asymmetry_score: profile.asymmetry || 0,
      flexibility_score: profile.flexibility || 0,
      strength_balance: profile.strength_balance || 0,
      movement_quality: profile.movement_quality || 0,
      recommendations: this.generateRehabilitationSuggestions(profile),
      injury_risk: athlete.calculateInjuryRisk(),
      next_assessment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      cached_at: new Date().toISOString(),
    }

    try {
      await redis.setex(cacheKey, 1800, JSON.stringify(analysis))
    } catch (error) {}

    return response.header('X-Cache', 'MISS').json(analysis)
  }

  private evaluateAthleteCondition(vitals: VitalSign): string {
    if (vitals.fatigueScore > 80) return 'critical'
    if (vitals.heartRate > 180 || vitals.fatigueScore > 60) return 'warning'
    if (vitals.trainingLoad > 85) return 'caution'
    return 'normal'
  }

  private generateRehabilitationSuggestions(profile: any): string[] {
    const suggestions: string[] = []

    if (profile.asymmetry > 15) {
      suggestions.push('Unilateral strength exercises')
      suggestions.push('Stretching focused on dominant side')
    }

    if (profile.flexibility < 70) {
      suggestions.push('Daily flexibility routine')
      suggestions.push('Myofascial release before training')
    }

    if (profile.strength_imbalance > 20) {
      suggestions.push('Eccentric strength training')
      suggestions.push('Advanced proprioceptive training')
    }

    return suggestions
  }
}
