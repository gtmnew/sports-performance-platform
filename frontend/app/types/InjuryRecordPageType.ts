import { SeverityInjuryEnum } from '@/enums/severity_injury_enum';
import { StatusInjuryRecordEnum } from '@/enums/status_injury_record_enum';

export interface InjuryRecordPageType {
  id: number;
  athlete_id: number;
  athlete_name: string;
  position: string;
  team: string;
  injury_type: string;
  severity: SeverityInjuryEnum;
  status: StatusInjuryRecordEnum;
  description: string;
  created_at: string;
  recovery_date: string;
  days_out: number;
}
