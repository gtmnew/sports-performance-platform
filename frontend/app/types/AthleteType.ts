import { InjuryRecord } from './InjuryRecordType';
import { VitalSign } from './VitalSignType';

export interface Athlete {
  id: number;
  name: string;
  position: string;
  team: string;
  age: number;
  height: number;
  weight: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  vitalSigns: VitalSign[];
  injuryRecords: InjuryRecord[];
}
