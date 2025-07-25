export interface OverviewMetrics {
  total_athletes: number;
  active_athletes: number;
  high_risk_athletes: number;
  critical_fatigue_athletes: number;
  avg_vo2_max: number;
  updated_at: string;
}

export interface DailyMetric {
  date: string;
  avg_fatigue: number;
  avg_vo2: number;
  avg_heart_rate: number;
  total_measurements: number;
}

export interface InjuryTrend {
  date: string;
  new_injuries: number;
}

export interface TrendingMetrics {
  daily_metrics: DailyMetric[];
  injury_trends: InjuryTrend[];
  period: string;
  updated_at: string;
}

export interface CriticalAlert {
  athlete_id: number;
  name: string;
  position: string;
  alert_type: "critical_fatigue" | "high_risk" | "recent_injury";
  severity: "high" | "medium";
  time_ago?: string;
  fatigue_score?: number;
  risk_level?: string;
  injury_type?: string;
}

export interface CriticalAlerts {
  critical_fatigue: CriticalAlert[];
  high_risk_active: CriticalAlert[];
  recent_injuries: CriticalAlert[];
  total_alerts: number;
  updated_at: string;
}

export interface PositionPerformance {
  position: string;
  avg_vo2: number;
  avg_fatigue: number;
  total_athletes: number;
  performance_score: number;
}

export interface TeamPerformance {
  team: string;
  avg_vo2: number;
  avg_fatigue: number;
  total_athletes: number;
  performance_score: number;
}

export interface RiskDistribution {
  [position: string]: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export interface TeamPerformanceData {
  by_position: PositionPerformance[];
  by_team: TeamPerformance[];
  risk_distribution: RiskDistribution;
  updated_at: string;
}

// Tipos para outros endpoints
export interface Athlete {
  id: number;
  name: string;
  position: string;
  team: string;
  risk_level: "low" | "medium" | "high" | "critical";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AthleteProfile {
  athlete: Athlete;
  injury_risk: any; // Ajustar conforme o retorno do seu controller
}

export interface VitalSign {
  id: number;
  athlete_id: number;
  fatigue_score: number;
  vo2_max: number;
  heart_rate: number;
  created_at: string;
}

export interface InjuryRecord {
  id: number;
  athlete_id: number;
  injury_type: string;
  status: "active" | "recovering" | "healed";
  created_at: string;
}
