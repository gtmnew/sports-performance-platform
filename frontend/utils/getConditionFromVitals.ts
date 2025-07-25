interface VitalSign {
  id: number;
  athlete_id: number;
  heart_rate: number;
  vo2_max: number;
  fatigue_score: number;
  sleep_quality: number;
  created_at: string;
}

export const getConditionFromVitals = (vitalSigns: VitalSign[]): string => {
  if (!vitalSigns || vitalSigns.length === 0) return 'N/A';
  const latest = vitalSigns[0];
  if (latest.fatigue_score > 50 || latest.sleep_quality < 5) {
    return 'Preocupante';
  }
  if (latest.fatigue_score > 30 || latest.sleep_quality < 7) {
    return 'Atenção';
  }
  return 'Excelente';
};
