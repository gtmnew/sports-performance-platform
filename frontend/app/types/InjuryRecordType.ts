export interface InjuryRecord {
  id: number;
  athlete_id: number;
  injury_type: string;
  body_part: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'recovering' | 'recovered';
  injury_date: string;
  expected_recovery?: string;
}
