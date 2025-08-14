import { CreateInjuryRecordFormData } from '@/app/schemas/create_injury_record';
import api from '@/lib/api/api';
import { getCookie } from '@/utils/get_cookie';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function createInjuryRecord(data: CreateInjuryRecordFormData) {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');

  const res = await api.post('/api/injury-records', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export function useCreateInjuryRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInjuryRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['injuryRecords'] });
    },
    onError: (error) => {
      console.error('Erro ao criar registro de lesão:', error);
    },
  });
}
