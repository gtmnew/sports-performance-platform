import { VitalSignService } from '#services/VitalSignService'
import { CreateVitalSignSchema } from '#validators/create_vital_sign_schema'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class VitalSignsController {
  public async store({ response, request }: HttpContext) {
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

    return response.status(201).json({
      status: 201,
      message: 'Vital sign created successfully',
      vitalSign,
    })
  }
}
