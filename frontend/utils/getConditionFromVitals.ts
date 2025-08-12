import { VitalSign } from '@/app/types/AthleteType';

export const getConditionFromVitals = (vitalSigns: VitalSign[]): string => {
  if (!vitalSigns || vitalSigns.length === 0) return 'N/A';
  const latest = vitalSigns[0];
  if (latest.fatigueScore > 50 || latest.sleepQuality < 5) {
    return 'Preocupante';
  }
  if (latest.fatigueScore > 30 || latest.sleepQuality < 7) {
    return 'Atenção';
  }
  return 'Excelente';
};
