import { InjuryRecord, VitalSign } from '@/app/types/AthleteType';
import { RiskLevelEnum } from '@/enums/risk_level_enum';
import api from '@/lib/api/api';
import { getCookie } from '@/utils/get_cookie';
import { mapInjuryRecords } from '@/utils/mapInjuryRecords';
import { mapVitalSigns } from '@/utils/mapVitalSigns';
import { showToast } from '@/utils/show_toaster';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Athlete = {
  id: number;
  name: string;
  position: string;
  team: string;
  age: number;
  height: number;
  weight: number;
  riskLevel: RiskLevelEnum;
  isActive: boolean;
  vitalSigns: VitalSign[];
  injuryRecords: InjuryRecord[];
};

export type CreateAthleteData = {
  name: string;
  position: string;
  age: number;
  height: number;
  weight: number;
  team: string;
  isActive?: boolean;
  riskLevel: RiskLevelEnum;
  biomechanicsProfile?: string;
  currentInjuries?: string;
};

async function fetchAthletes(): Promise<Athlete[]> {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');

  const res = await api.get('/api/athletes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.athletes.map((athlete: any) => ({
    id: athlete.id,
    name: athlete.name,
    position: athlete.position,
    team: athlete.team,
    age: athlete.age,
    height: athlete.height,
    weight: athlete.weight,
    riskLevel: athlete.riskLevel || athlete.risk_level,
    vitalSigns: mapVitalSigns(athlete.vitalSigns || athlete.vital_signs || []),
    injuryRecords: mapInjuryRecords(
      athlete.injuryRecords || athlete.injury_records || []
    ),
    isActive: athlete.isActive ?? true,
  }));
}

async function createAthlete(data: CreateAthleteData): Promise<Athlete> {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');

  const res = await api.post('/api/athletes', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (res.status !== 201) {
    throw new Error('Erro ao criar atleta');
  }

  showToast('Atleta criado com sucesso!', 'success');

  return res.data.athlete;
}

export function useGetAthlete() {
  const query = useQuery({
    queryKey: ['getAthlete'],
    queryFn: fetchAthletes,
    // enabled: !!getCookie('auth_token'),
  });

  return {
    getAthletes: query.data,
    refetchAthletes: query.refetch,
    isLoading: query.isLoading,
    error: query.error,
  };
}

export function useCreateAthlete() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['createAthlete'],
    mutationFn: createAthlete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getAthlete'],
      });
    },
    onError: () => {
      showToast('Erro ao criar atleta', 'error');
    },
  });

  return mutation;
}
