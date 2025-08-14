import { SeverityInjuryEnum } from '@/enums/severity_injury_enum';
import { StatusInjuryRecordEnum } from '@/enums/status_injury_record_enum';
import { z } from 'zod';

export const createInjuryRecordSchema = z.object({
  athleteId: z.number(),
  injuryType: z
    .string()
    .max(100, 'O tipo da lesão deve ter no máximo 100 caracteres')
    .trim(),
  bodyPart: z
    .string()
    .max(100, 'A região da lesão deve ter no máximo 100 caracteres')
    .trim(),
  severity: z.enum(Object.values(SeverityInjuryEnum)),
  cause: z
    .string()
    .max(100, 'A causa da lesão deve ter no máximo 100 caracteres')
    .trim(),
  expectedRecovery: z.number(),
  actualRecovery: z.number().nullable().optional(),
  treatmentProtocol: z.string(),
  status: z.enum(Object.values(StatusInjuryRecordEnum)),
  injuryDate: z.string(),
  recoveryDate: z.string().nullable().optional(),
});

export type CreateInjuryRecordFormData = z.infer<
  typeof createInjuryRecordSchema
>;
