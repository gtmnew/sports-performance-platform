import { InjuryRecord } from '@/app/types/AthleteType';

export function mapInjuryRecords(apiInjuries: any[]): InjuryRecord[] {
  return apiInjuries.map((ir) => ({
    id: ir.id,
    athleteId: ir.athleteId,
    injuryType: ir.injuryType,
    bodyPart: ir.bodyPart,
    severity: ir.severity,
    status: ir.status,
    injuryDate: ir.injuryDate,
    recoveryDate: ir.recoveryDate,
    expectedRecovery: ir.expectedRecovery,
    actualRecovery: ir.actualRecovery,
    treatmentProtocol: ir.treatmentProtocol,
    cause: ir.cause,
    createdAt: ir.created_at,
  }));
}
