'use client';

import React from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import {
  AlertTriangle,
  Users,
  Shield,
  Zap,
  RefreshCw,
  TrendingUp,
  Clock,
  Bell,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HeaderDashboard from '../components/HeaderDashborad';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { getSeverityColor } from '@/utils/getSeverityColor';
import DashboardCards from '../components/DashboardCards';
import { Progress } from '@/components/ui/progress';

interface Alert {
  id: string;
  alert_type: string;
  severity: string;
  name: string;
  position: string;
  fatigue_score?: number;
  risk_level?: string;
  time_ago?: string;
  injury_type?: string;
}

interface Alerts {
  total_alerts: number;
  critical_fatigue: Alert[];
  high_risk_active: Alert[];
  recent_injuries: Alert[];
}

interface PositionPerformance {
  position: string;
  total_athletes: number;
  avg_vo2: number;
  avg_fatigue: number;
  performance_score: number;
}

interface TeamPerformance {
  by_position: PositionPerformance[];
  by_team: {
    team: string;
    total_athletes: number;
    avg_vo2: number;
    avg_fatigue: number;
    performance_score: number;
  }[];
  risk_distribution: {
    position: string;
    total: number;
    low: number;
    medium: number;
    high: number;
  }[];
}

interface DailyMetric {
  date: string;
  avg_fatigue: number;
  avg_vo2: number;
  avg_heart_rate: number;
  total_measurements: number;
}

interface InjuryTrend {
  date: string;
  new_injuries: number;
}

interface Trending {
  daily_metrics: DailyMetric[];
  injury_trends: InjuryTrend[];
}

const DashboardPage = () => {
  const {
    loading,
    error,
    refetch,
    alerts,
    alertsError,
    alertsLoading,
    teamPerformance,
    performanceError,
    performanceLoading,
    trending,
    trendsError,
    trendsLoading,
  } = useDashboard() as {
    loading: boolean;
    error: unknown;
    refetch: () => Promise<any>;
    alerts?: Alerts;
    alertsError?: unknown;
    alertsLoading: boolean;
    teamPerformance?: TeamPerformance;
    performanceError?: unknown;
    performanceLoading: boolean;
    trending?: Trending;
    trendsError?: unknown;
    trendsLoading: boolean;
  };

  const getErrorMessage = (err: unknown): string =>
    err instanceof Error ? err.message : 'Erro desconhecido';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <span className="text-red-500 text-lg">{getErrorMessage(error)}</span>
          <Button
            onClick={refetch}
            className="mt-4 block mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  const getSeverityIcon = (alertType: string): JSX.Element => {
    switch (alertType) {
      case 'critical_fatigue':
        return <Zap className="w-4 h-4" />;
      case 'high_risk':
        return <Shield className="w-4 h-4" />;
      case 'recent_injury':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <HeaderDashboard />

      <div className="container mx-auto pt-6 pb-2">
        <div className="flex justify-end items-center">
          <Button
            onClick={refetch}
            className="flex items-center gap-2 mr-6 px-4 py-2 cursor-pointer rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </Button>
        </div>
      </div>

      <main className="container mx-auto py-4">
        <DashboardCards />

        <Tabs defaultValue="alerts" className="space-y-6 px-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-zinc-600 text-white">
            <TabsTrigger value="alerts">
              Alertas Críticos{' '}
              {alerts?.total_alerts && alerts.total_alerts > 0 && (
                <Badge variant="destructive">{alerts.total_alerts}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            {alertsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : alertsError ? (
              <Card className="bg-zinc-800">
                <CardContent className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-500 mb-4">
                    Erro ao carregar alertas: {getErrorMessage(alertsError)}
                  </p>
                  <Button
                    onClick={() => refetch()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Tentar novamente
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Zap className="w-5 h-5" />
                      Fadiga Crítica
                      {alerts?.critical_fatigue?.length ? (
                        <Badge className="bg-red-600 text-white">
                          {alerts.critical_fatigue.length}
                        </Badge>
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.critical_fatigue?.length ? (
                      alerts.critical_fatigue.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                        >
                          <div className="flex items-center gap-3">
                            {getSeverityIcon(alert.alert_type)}
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                {alert.name}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {alert.position}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600 mb-1">
                              {alert.fatigue_score}%
                            </div>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {alert.time_ago && (
                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                <Clock className="w-3 h-3" />
                                {alert.time_ago}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-400 text-center py-8">
                        Nenhum atleta com fadiga crítica 🎉
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <Shield className="w-5 h-5" />
                      Atletas de Alto Risco
                      {alerts?.high_risk_active?.length ? (
                        <Badge className="bg-amber-600 text-white">
                          {alerts.high_risk_active.length}
                        </Badge>
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.high_risk_active?.length ? (
                      alerts.high_risk_active.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
                        >
                          <div className="flex items-center gap-3">
                            {getSeverityIcon(alert.alert_type)}
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                {alert.name}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {alert.position} • Nível: {alert.risk_level}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-400 text-center py-8">
                        Nenhum atleta de alto risco ativo 🎉
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-zinc-800 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                      Lesões Recentes (24h)
                      {alerts?.recent_injuries?.length ? (
                        <Badge className="bg-orange-600 text-white">
                          {alerts.recent_injuries.length}
                        </Badge>
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.recent_injuries?.length ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {alerts.recent_injuries.map((injury) => (
                          <div
                            key={injury.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800"
                          >
                            <div className="flex items-center gap-3">
                              {getSeverityIcon(injury.alert_type)}
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                                  {injury.name}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {injury.position} • {injury.injury_type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                className={getSeverityColor(injury.severity)}
                              >
                                {injury.severity}
                              </Badge>
                              {injury.time_ago && (
                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                  <Clock className="w-3 h-3" />
                                  {injury.time_ago}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-400 text-center py-8">
                        Nenhuma lesão recente 🎉
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Performance por Posição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : performanceError ? (
                    <div className="text-red-400 text-center py-8">
                      {getErrorMessage(performanceError)}
                    </div>
                  ) : teamPerformance?.by_position?.length ? (
                    teamPerformance.by_position.map((position) => (
                      <div key={position.position} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-100">
                              {position.position}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {position.total_athletes} atletas • VO2:{' '}
                              {position.avg_vo2} • Fadiga:{' '}
                              {position.avg_fatigue}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-100">
                              {position.performance_score}
                            </div>
                            <p className="text-xs text-slate-500">Score</p>
                          </div>
                        </div>
                        <Progress
                          value={position.performance_score}
                          className="h-2"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400 text-center py-8">
                      Nenhum dado de performance disponível
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  Performance por Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamPerformance?.by_team?.length ? (
                    teamPerformance.by_team.map((team) => (
                      <div key={team.team} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-100">
                              {team.team}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {team.total_athletes} atletas • VO2:{' '}
                              {team.avg_vo2} • Fadiga: {team.avg_fatigue}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-100">
                              {team.performance_score}
                            </div>
                            <p className="text-xs text-slate-500">Score</p>
                          </div>
                        </div>
                        <Progress
                          value={team.performance_score}
                          className="h-2"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400 text-center py-8">
                      Nenhum dado de performance por time disponível
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Distribuição de Risco por Posição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance?.risk_distribution?.length ? (
                    teamPerformance.risk_distribution.map((risk) => (
                      <div key={risk.position} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-100">
                            {risk.position}
                          </h4>
                          <span className="text-sm text-slate-400">
                            {risk.total} atletas
                          </span>
                        </div>
                        <div className="flex space-x-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div
                            className="bg-green-500"
                            style={{
                              width: `${(risk.low / risk.total) * 100}%`,
                            }}
                          />
                          <div
                            className="bg-yellow-500"
                            style={{
                              width: `${(risk.medium / risk.total) * 100}%`,
                            }}
                          />
                          <div
                            className="bg-red-500"
                            style={{
                              width: `${(risk.high / risk.total) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Baixo: {risk.low}</span>
                          <span>Médio: {risk.medium}</span>
                          <span>Alto: {risk.high}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400 text-center py-8">
                      Nenhum dado de distribuição de risco disponível
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Tendências dos Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trendsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                  </div>
                ) : trendsError ? (
                  <div className="text-red-400 text-center py-8">
                    {getErrorMessage(trendsError)}
                  </div>
                ) : trending?.daily_metrics?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trending.daily_metrics.slice(-3).map((day) => (
                      <div
                        key={day.date}
                        className="p-4 rounded-lg bg-zinc-700"
                      >
                        <div className="text-sm text-slate-300 mb-2">
                          {new Date(day.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-white">
                              Fadiga Média
                            </span>
                            <span className="font-medium text-amber-400">
                              {day.avg_fatigue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-white">
                              VO2 Médio
                            </span>
                            <span className="font-medium text-blue-400">
                              {day.avg_vo2}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-white">
                              BPM Médio
                            </span>
                            <span className="font-medium text-purple-400">
                              {day.avg_heart_rate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-300">
                              Medições
                            </span>
                            <span className="text-xs text-slate-200">
                              {day.total_measurements}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400 text-center py-8">
                    Nenhum dado de tendência disponível
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Novas Lesões por Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trendsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
                  </div>
                ) : trendsError ? (
                  <div className="text-red-400 text-center py-8">
                    {getErrorMessage(trendsError)}
                  </div>
                ) : trending?.injury_trends?.length ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trending.injury_trends.slice(-8).map((inj) => (
                      <div
                        key={inj.date}
                        className="p-3 rounded-md bg-zinc-700"
                      >
                        <div className="text-xs text-slate-300">
                          {new Date(inj.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-lg font-semibold text-slate-100">
                          {inj.new_injuries}
                        </div>
                        <div className="text-xs text-slate-400">
                          novas lesões
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400 text-center py-8">
                    Nenhum dado de lesões no período
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
