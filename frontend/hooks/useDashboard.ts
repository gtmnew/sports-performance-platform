import api from "@/lib/login/login_api";
import { getCookie } from "@/utils/get_cookie";
import { useCallback, useEffect, useState } from "react";

type Overview = {
  total_athletes: number;
  active_athletes: number;
  high_risk_athletes: number;
  critical_fatigue_athletes: number;
  avg_vo2_max: number;
  updated_at: string;
};

type CriticalAlert = {
  athlete_id: number;
  name: string;
  position: string;
  alert_type: "critical_fatigue" | "high_risk" | "recent_injury";
  severity: "high" | "medium" | "low";
  time_ago?: string;
  fatigue_score?: number;
  risk_level?: string;
  injury_type?: string;
};

type CriticalAlerts = {
  critical_fatigue: CriticalAlert[];
  high_risk_active: CriticalAlert[];
  recent_injuries: CriticalAlert[];
  total_alerts: number;
  updated_at: string;
};

type DashboardData = {
  overview: Overview | null;
  alerts: CriticalAlerts | null;
};

export function useDashboard() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [alerts, setAlerts] = useState<CriticalAlerts | null>(null);
  const [loading, setLoading] = useState(true);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getCookie("auth_token");
      if (!token) throw new Error("Token não encontrado");
      const res = await api.get("/api/dashboard/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOverview(res.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Erro desconhecido";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlerts = useCallback(async () => {
    setAlertsLoading(true);
    setAlertsError(null);
    try {
      const token = getCookie("auth_token");
      if (!token) throw new Error("Token não encontrado");
      const res = await api.get("/api/dashboard/alerts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlerts(res.data);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Erro ao carregar alertas";
      setAlertsError(errorMessage);
    } finally {
      setAlertsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await Promise.all([fetchOverview(), fetchAlerts()]);
  }, [fetchOverview, fetchAlerts]);

  useEffect(() => {
    fetchOverview();
    fetchAlerts();

    const alertsInterval = setInterval(fetchAlerts, 30000);
    const overviewInterval = setInterval(fetchOverview, 300000);

    return () => {
      clearInterval(alertsInterval);
      clearInterval(overviewInterval);
    };
  }, [fetchOverview, fetchAlerts]);

  return {
    overview,
    alerts,
    loading,
    alertsLoading,
    error,
    alertsError,
    refetch,
    refetchOverview: fetchOverview,
    refetchAlerts: fetchAlerts,
  };
}
