import Athlete from '#models/athlete'
import { VitalSignService } from '#services/VitalSignService'
import { CreateVitalSignSchema } from '#validators/create_vital_sign_schema'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import vine from '@vinejs/vine'
import DashboardController from './dashboard_controller.js'

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
}
