import vine from '@vinejs/vine'

export const CreateVitalSignSchema = vine.object({
  heartRate: vine.number(),
  vo2Max: vine.number(),
  lactateLevel: vine.number(),
  hydrationLevel: vine.number(),
  fatigueScore: vine.number(),
  trainingLoad: vine.number(),
  sleepQuality: vine.number(),
  perceivedExertion: vine.number(),
})
