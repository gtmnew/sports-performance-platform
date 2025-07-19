import Athlete from '#models/athlete'
import { RiskLevelEnum } from '../enums/risk_level_enum.js'

export class AthleteService {
  static async create(payload: {
    name: string
    position: string
    age: number
    height: number
    weight: number
    team: string
    isActive: boolean
    riskLevel: RiskLevelEnum
    biomechanicsProfile: string
    currentInjuries: string
  }): Promise<Athlete> {
    const existingAthlete = await Athlete.query()
      .where('name', payload.name)
      .andWhere('team', payload.team)
      .first()
    if (existingAthlete) {
      throw new Error('Athlete already exists')
    }

    const athlete = new Athlete()
    athlete.name = payload.name
    athlete.position = payload.position
    athlete.age = payload.age
    athlete.height = payload.height
    athlete.weight = payload.weight
    athlete.team = payload.team
    athlete.isActive = payload.isActive
    athlete.riskLevel = payload.riskLevel
    athlete.biomechanicsProfile = payload.biomechanicsProfile
    athlete.currentInjuries = payload.currentInjuries

    await athlete.save()

    return athlete
  }
}
