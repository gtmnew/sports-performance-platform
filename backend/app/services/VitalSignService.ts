import VitalSign from '#models/vitalsign'

export class VitalSignService {
  static async create(payload: {
    heartRate: number
    vo2Max: number
    lactateLevel: number
    hydrationLevel: number
    fatigueScore: number
    trainingLoad: number
    sleepQuality: number
    perceivedExertion: number
  }): Promise<VitalSign> {
    const vitalSign = new VitalSign()
    vitalSign.heartRate = payload.heartRate
    vitalSign.vo2Max = payload.vo2Max
    vitalSign.lactateLevel = payload.lactateLevel
    vitalSign.hydrationLevel = payload.hydrationLevel
    vitalSign.fatigueScore = payload.fatigueScore
    vitalSign.trainingLoad = payload.trainingLoad
    vitalSign.sleepQuality = payload.sleepQuality
    vitalSign.perceivedExertion = payload.perceivedExertion

    await vitalSign.save()

    return vitalSign
  }
}
