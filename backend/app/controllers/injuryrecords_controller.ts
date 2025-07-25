import { InjuryRecordService } from '#services/InjuryRecordService'
import { CreateInjuryRecordSchema } from '#validators/create_injury_record_schema'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class InjuryRecordsController {
  public async createInjuryRecord({ response, request }: HttpContext) {
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

    return response.status(201).json({
      status: 201,
      message: 'Injury Record created successfully',
      injuryRecord,
    })
  }
}
