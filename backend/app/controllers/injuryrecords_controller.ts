import Athlete from '#models/athlete'
import { InjuryRecordService } from '#services/InjuryRecordService'
import { CreateInjuryRecordSchema } from '#validators/create_injury_record_schema'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import vine from '@vinejs/vine'
import DashboardController from './dashboard_controller.js'

export default class InjuryRecordsController {
  public async create({ response, request }: HttpContext) {
    const data = request.only([
      'athleteId',
      'injuryType',
      'bodyPart',
      'severity',
      'cause',
      'expectedRecovery',
      'actualRecovery',
      'treatmentProtocol',
      'status',
      'injuryDate',
      'recoveryDate',
    ])

    const payload = await vine.validate({ schema: CreateInjuryRecordSchema, data })

    const injuryRecord = await InjuryRecordService.create(payload)

    const athlete = await Athlete.find(injuryRecord.athleteId)
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
      message: 'Injury Record created successfully',
      injuryRecord,
    })
  }
}
