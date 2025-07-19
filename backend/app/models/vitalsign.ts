import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Athlete from './athlete.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class VitalSign extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare athleteId: number

  @column()
  declare heartRate: number

  @column()
  declare vo2Max: number

  @column()
  declare lactateLevel: number
  @column()
  declare hydrationLevel: number

  @column()
  declare fatigueScore: number

  @column()
  declare trainingLoad: number

  @column()
  declare sleepQuality: number

  @column()
  declare perceivedExertion: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Athlete)
  declare athlete: BelongsTo<typeof Athlete>
}
