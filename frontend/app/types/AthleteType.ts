export interface VitalSign {
  id: number;
  athleteId: number;
  heartRate: number;
  vo2Max: string;
  lactateLevel: string;
  hydrationLevel: string;
  fatigueScore: number;
  trainingLoad: number;
  sleepQuality: number;
  perceivedExertion: number;
  createdAt: string;
}

export interface InjuryRecord {
  id: number;
  athleteId: number;
  injuryType: string;
  bodyPart: string;
  cause: string;
  expectedRecovery: number;
  actualRecovery: number | null;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'active' | 'recovering' | 'recovered';
  treatmentProtocol: string;
  injuryDate: string;
  recoveryDate: string | null;
  createdAt: string;
}

export interface Athlete {
  id: number;
  name: string;
  position: string;
  team: string;
  age: number;
  height: number;
  weight: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  vitalSigns: VitalSign[];
  injuryRecords: InjuryRecord[];
}

export interface ApiResponse {
  athletes: Athlete[];
  updated_at: string;
}

export interface FormattedInjuryRecord {
  id: number;
  athlete_name: string;
  injuryType: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'active' | 'recovering' | 'recovered';
  createdAt: string;
  daysOut: number;
  team: string;
  description: string;
  bodyPart: string;
  treatmentProtocol: string;
  actualRecovery: number | null;
  recoveryDate?: string | null;
}
