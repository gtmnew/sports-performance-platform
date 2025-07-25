import Athlete from '#models/athlete'
import VitalSign from '#models/vitalsign'
import { AthleteService } from '#services/AthleteService'
import { CreateAthleteSchema } from '#validators/create_athlete_schema'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import vine from '@vinejs/vine'

export default class AthletesController {
  public async store({ response, request }: HttpContext) {
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

    const athlete = await AthleteService.create(payload)

    return response.status(201).json({
      status: 201,
      message: 'Athlete created successfully',
      athlete,
    })
  }

  public async listWithCache({ response }: HttpContext) {
    const cacheKey = 'athletes:list'
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

  public async showAthleteProfileWithInjuryRisk({ params, response }: HttpContext) {
    const cacheKey = `athlete:${params.id}:profile`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const athlete = await Athlete.query()
      .where('id', params.id)
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

  public async getRecentVitalSigns({ params, response }: HttpContext) {
    const cacheKey = `athlete:${params.id}:vitals`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const vitals = await VitalSign.query()
      .where('athleteId', params.id)
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

  public async analyzeBiomechanicalProfile({ params, response }: HttpContext) {
    const cacheKey = `athlete:${params.id}:biomechanics`

    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return response.header('X-Cache', 'HIT').json(JSON.parse(cached))
      }
    } catch (error) {}

    const athlete = await Athlete.findOrFail(params.id)
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
  // Privates Functions
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
