export interface InjuryRecordPageType {
  id: number;
  athlete_id: number;
  athlete_name: string;
  position: string;
  team: string;
  injury_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'recovering' | 'recovered';
  description: string;
  created_at: string;
  recovery_date: string;
  days_out: number;
}
