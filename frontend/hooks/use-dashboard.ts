import { useState, useEffect, useCallback } from "react";

import { Athlete } from "@/app/types/AthleteType";
import {
  CriticalAlerts,
  OverviewMetrics,
  TeamPerformanceData,
  TrendingMetrics,
} from "@/app/types/dashboard/DashboardTypes";
import { dashboardAPI } from "@/lib/api/api";

interface UseDashboardReturn {
  overview: OverviewMetrics | null;
  trending: TrendingMetrics | null;
  alerts: CriticalAlerts | null;
  teamPerformance: TeamPerformanceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Estados da aplicação
 * - Loading e error handling automáticos
 * - Função de refetch para atualizar dados
 */
export const useDashboard = (): UseDashboardReturn => {
  const [overview, setOverview] = useState<OverviewMetrics | null>(null);
  const [trending, setTrending] = useState<TrendingMetrics | null>(null);
  const [alerts, setAlerts] = useState<CriticalAlerts | null>(null);
  const [teamPerformance, setTeamPerformance] =
    useState<TeamPerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardAPI.getAllDashboardData();

      setOverview(data.overview);
      setTrending(data.trending);
      setAlerts(data.alerts);
      setTeamPerformance(data.teamPerformance);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    overview,
    trending,
    alerts,
    teamPerformance,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Hook para gerenciar dados dos atletas
 */
export const useAthletes = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoading(true);
        const data = await dashboardAPI.getAthletes();
        setAthletes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar atletas"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const createAthlete = async (athleteData: Partial<Athlete>) => {
    try {
      const newAthlete = await dashboardAPI.createAthlete(athleteData);
      setAthletes((prev) => [...prev, newAthlete]);
      return newAthlete;
    } catch (err) {
      throw err;
    }
  };

  return { athletes, loading, error, createAthlete };
};
