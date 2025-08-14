import api from '@/lib/api/api';
import { getCookie } from '@/utils/get_cookie';
import { useQuery } from '@tanstack/react-query';

async function fetchOverview() {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');
  const res = await api.get('/api/dashboard/overview', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function fetchAlerts() {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');
  const res = await api.get('/api/dashboard/alerts', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function fetchTeamPerformance() {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');
  const res = await api.get('/api/dashboard/team-performance', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

async function fetchTrends() {
  const token = getCookie('auth_token');
  if (!token) throw new Error('Token não encontrado');
  const res = await api.get('/api/dashboard/trends', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export function useDashboard() {
  const overviewQuery = useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: fetchOverview,
    enabled: !!getCookie('auth_token'),
  });

  const alertsQuery = useQuery({
    queryKey: ['dashboard', 'alerts'],
    queryFn: fetchAlerts,
    refetchInterval: 30000,
    enabled: !!getCookie('auth_token'),
  });

  const teamPerformanceQuery = useQuery({
    queryKey: ['dashboard', 'teamPerformance'],
    queryFn: fetchTeamPerformance,
    enabled: !!getCookie('auth_token'),
  });

  const trendsQuery = useQuery({
    queryKey: ['dashboard', 'trends'],
    queryFn: fetchTrends,
    enabled: !!getCookie('auth_token'),
  });

  const refetch = () =>
    Promise.all([
      overviewQuery.refetch(),
      alertsQuery.refetch(),
      teamPerformanceQuery.refetch(),
      trendsQuery.refetch(),
    ]);

  return {
    overview: overviewQuery.data,
    alerts: alertsQuery.data,
    teamPerformance: teamPerformanceQuery.data,
    trending: trendsQuery.data,
    loading:
      overviewQuery.isLoading ||
      alertsQuery.isLoading ||
      teamPerformanceQuery.isLoading ||
      trendsQuery.isLoading,
    alertsLoading: alertsQuery.isLoading,
    performanceLoading: teamPerformanceQuery.isLoading,
    trendsLoading: trendsQuery.isLoading,
    error:
      overviewQuery.error ||
      alertsQuery.error ||
      teamPerformanceQuery.error ||
      trendsQuery.error,
    alertsError: alertsQuery.error,
    performanceError: teamPerformanceQuery.error,
    trendsError: trendsQuery.error,
    refetch,
    refetchOverview: overviewQuery.refetch,
    refetchAlerts: alertsQuery.refetch,
    refetchTeamPerformance: teamPerformanceQuery.refetch,
    refetchTrends: trendsQuery.refetch,
  };
}
