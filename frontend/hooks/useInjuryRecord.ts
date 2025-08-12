import { ApiResponse, FormattedInjuryRecord } from '@/app/types/AthleteType';
import api from '@/lib/api/api';
import { getCookie } from '@/utils/get_cookie';
import { useQuery } from '@tanstack/react-query';

async function fetchInjuryRecords(): Promise<FormattedInjuryRecord[]> {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');

  const res = await api.get<ApiResponse>('/api/athletes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const allInjuryRecords: FormattedInjuryRecord[] = [];

  res.data.athletes.forEach((athlete) => {
    athlete.injuryRecords.forEach((record) => {
      allInjuryRecords.push({
        id: record.id,
        athlete_name: athlete.name,
        injuryType: record.injuryType,
        severity: record.severity,
        status: record.status,
        createdAt: record.injuryDate,
        daysOut: record.expectedRecovery || 0,
        team: athlete.team,
        description: record.cause || '',
        bodyPart: record.bodyPart,
        treatmentProtocol: record.treatmentProtocol,
        recoveryDate: record.recoveryDate,
        actualRecovery: record.actualRecovery,
      });
    });
  });

  return allInjuryRecords;
}

export function useInjuryRecords() {
  return useQuery({
    queryKey: ['injuryRecords'],
    queryFn: fetchInjuryRecords,
    enabled: !!getCookie('auth_token'),
  });
}
