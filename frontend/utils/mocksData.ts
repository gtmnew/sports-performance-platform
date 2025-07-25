export const mockData = {
  overview: {
    total_athletes: 245,
    active_athletes: 189,
    high_risk_athletes: 12,
    critical_fatigue_athletes: 3,
    avg_vo2_max: 52,
    updated_at: new Date().toISOString(),
  },
  alerts: {
    critical_fatigue: [
      {
        athlete_id: 1,
        name: 'João Silva',
        position: 'Atacante',
        fatigue_score: 92,
        time_ago: '15 min ago',
        severity: 'high',
      },
      {
        athlete_id: 2,
        name: 'Pedro Santos',
        position: 'Meio-campo',
        fatigue_score: 88,
        time_ago: '22 min ago',
        severity: 'high',
      },
    ],
    recent_injuries: [
      {
        athlete_id: 3,
        name: 'Carlos Lima',
        position: 'Zagueiro',
        injury_type: 'Lesão muscular',
        time_ago: '2h ago',
        severity: 'medium',
      },
    ],
    total_alerts: 5,
  },
  trends: {
    daily_metrics: [
      { date: '2025-07-16', avg_fatigue: 45, avg_vo2: 48, avg_heart_rate: 72 },
      { date: '2025-07-17', avg_fatigue: 52, avg_vo2: 47, avg_heart_rate: 75 },
      { date: '2025-07-18', avg_fatigue: 48, avg_vo2: 49, avg_heart_rate: 73 },
      { date: '2025-07-19', avg_fatigue: 55, avg_vo2: 46, avg_heart_rate: 76 },
      { date: '2025-07-20', avg_fatigue: 42, avg_vo2: 51, avg_heart_rate: 70 },
      { date: '2025-07-21', avg_fatigue: 39, avg_vo2: 53, avg_heart_rate: 69 },
      { date: '2025-07-22', avg_fatigue: 47, avg_vo2: 52, avg_heart_rate: 71 },
    ],
  },
  teamPerformance: {
    by_position: [
      {
        position: 'Atacante',
        avg_vo2: 54,
        avg_fatigue: 45,
        total_athletes: 18,
        performance_score: 82,
      },
      {
        position: 'Meio-campo',
        avg_vo2: 56,
        avg_fatigue: 42,
        total_athletes: 32,
        performance_score: 85,
      },
      {
        position: 'Zagueiro',
        avg_vo2: 48,
        avg_fatigue: 38,
        total_athletes: 22,
        performance_score: 78,
      },
      {
        position: 'Goleiro',
        avg_vo2: 45,
        avg_fatigue: 35,
        total_athletes: 8,
        performance_score: 75,
      },
    ],
  },
};
