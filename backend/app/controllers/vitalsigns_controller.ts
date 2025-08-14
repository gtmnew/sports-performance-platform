import Athlete from '#models/athlete'
import { VitalSignService } from '#services/VitalSignService'
import { CreateVitalSignSchema } from '#validators/create_vital_sign_schema'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import vine from '@vinejs/vine'
import DashboardController from './dashboard_controller.js'
import VitalSign from '#models/vitalsign'

export default class VitalSignsController {
  public async create({ response, request }: HttpContext) {
    const data = request.only([
      'athleteId',
      'heartRate',
      'vo2Max',
      'lactateLevel',
      'hydrationLevel',
      'fatigueScore',
      'trainingLoad',
      'sleepQuality',
      'perceivedExertion',
    ])

    const payload = await vine.validate({ schema: CreateVitalSignSchema, data })

    const vitalSign = await VitalSignService.create(payload)

    const athlete = await Athlete.find(vitalSign.athleteId)
    if (athlete) {
      const userId = athlete.userId
      const cacheKey = `athletes:list:${userId}`

      try {
        await redis.del(cacheKey)
        console.log(
          `🗑️ Cache da lista de atletas invalidado para usuário ${userId} após criar sinal vital`
        )
        await DashboardController.invalidateDashboardCaches(userId)
      } catch (error) {
        console.error('❌ Erro ao invalidar cache após criar sinal vital:', error)
      }
    }

    return response.status(201).json({
      status: 201,
      message: 'Vital sign created successfully',
      vitalSign,
    })
  }

  public async update({ auth, params, response, request }: HttpContext) {
    const userId = auth.user!.id
    const vitalId = params.id

    const data = request.only([
      'athleteId',
      'heartRate',
      'vo2Max',
      'lactateLevel',
      'hydrationLevel',
      'fatigueScore',
      'trainingLoad',
      'sleepQuality',
      'perceivedExertion',
    ])

    const payload = await vine.validate({ schema: CreateVitalSignSchema, data })

    const vital = await VitalSign.findOrFail(vitalId)

    const athlete = await Athlete.findOrFail(vital.athleteId)
    if (athlete.userId !== userId) {
      return response.status(403).json({ message: 'Acesso negado' })
    }

    vital.merge(payload)
    await vital.save()

    const listCacheKey = `athletes:list:${userId}`
    const profileCacheKey = `athlete:${athlete.id}:profile:${userId}`
    const vitalsCacheKey = `athlete:${athlete.id}:vitals:${userId}`

    try {
      await Promise.all([
        redis.del(listCacheKey),
        redis.del(profileCacheKey),
        redis.del(vitalsCacheKey),
      ])
      await DashboardController.invalidateDashboardCaches(userId)
      console.log(
        `🗑️ Caches de lista, perfil e vitals invalidados após atualizar vitalSign ${vitalId}`
      )
    } catch (error) {
      console.error('❌ Erro ao invalidar cache de vital sign:', error)
    }

    return response.status(200).json({
      status: 200,
      message: 'Vital sign updated successfully',
      vital,
    })
  }

  public async delete({ auth, params, response }: HttpContext) {
    const userId = auth.user!.id
    const vitalId = params.id

    const vital = await VitalSign.findOrFail(vitalId)

    const athlete = await Athlete.findOrFail(vital.athleteId)
    if (athlete.userId !== userId) {
      return response.status(403).json({ message: 'Acesso negado' })
    }

    await vital.delete()

    const listCacheKey = `athletes:list:${userId}`
    const profileCacheKey = `athlete:${athlete.id}:profile:${userId}`

    try {
      await Promise.all([redis.del(listCacheKey), redis.del(profileCacheKey)])
      await DashboardController.invalidateDashboardCaches(userId)
      console.log(`🗑️ Caches de lista e perfil invalidados após deletar injuryRecord ${vitalId}`)
    } catch (error) {
      console.error('❌ Erro ao invalidar cache após deletar lesão:', error)
    }

    return response.status(200).json({ status: 200, message: 'Vital sign deleted successfully' })
  }
}
