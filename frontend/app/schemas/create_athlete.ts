import { RiskLevelEnum } from '@/enums/risk_level_enum';
import { z } from 'zod';

export const createAthleteSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),

  position: z
    .string()
    .min(2, 'Posição deve ter pelo menos 2 caracteres')
    .max(50, 'Posição deve ter no máximo 50 caracteres')
    .trim(),

  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(16, 'Idade mínima é 16 anos')
    .max(50, 'Idade máxima é 50 anos'),

  height: z
    .number()
    .int('Altura deve ser um número inteiro')
    .min(150, 'Altura mínima é 150cm')
    .max(220, 'Altura máxima é 220cm'),

  weight: z
    .number()
    .int('Peso deve ser um número inteiro')
    .min(50, 'Peso mínimo é 50kg')
    .max(150, 'Peso máximo é 150kg'),

  team: z
    .string()
    .min(2, 'Time deve ter pelo menos 2 caracteres')
    .max(50, 'Time deve ter no máximo 50 caracteres')
    .trim(),

  isActive: z.boolean(),

  riskLevel: z.enum(Object.values(RiskLevelEnum)),

  biomechanicsProfile: z.string(),

  currentInjuries: z.string(),
});

export type CreateAthleteFormData = z.infer<typeof createAthleteSchema>;
