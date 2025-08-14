import { VitalSign } from '@/app/types/AthleteType';

export function mapVitalSigns(apiVitalSigns: any[]): VitalSign[] {
  return apiVitalSigns.map((vs) => ({
    id: vs.id,
    athleteId: vs.athleteId,
    heartRate: vs.heartRate,
    vo2Max: vs.vo2Max,
    lactateLevel: vs.lactateLevel,
    hydrationLevel: vs.hydrationLevel,
    fatigueScore: vs.fatigueScore,
    trainingLoad: vs.trainingLoad,
    sleepQuality: vs.sleepQuality,
    perceivedExertion: vs.perceivedExertion,
    createdAt: vs.createdAt,
  }));
}
