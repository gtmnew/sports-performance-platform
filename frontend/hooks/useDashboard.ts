import api from '@/lib/login/login_api';
import { getCookie } from '@/utils/get_cookie';
import { useCallback, useEffect, useState } from 'react';

type Overview = {
  total_athletes: number;
  active_athletes: number;
  high_risk_athletes: number;
  critical_fatigue_athletes: number;
  avg_vo2_max: number;
  updated_at: string;
};

type DashboardData = {
  overview: Overview | null;
};

export function useDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getCookie('auth_token');
      if (!token) throw new Error('Token não encontrado');
      const res = await api.get('/api/dashboard/overview', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOverview(res.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    overview,
    loading,
    error,
    refetch: fetchOverview,
  };
}
