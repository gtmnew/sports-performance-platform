"use client";

import React from "react";
import { useDashboard } from "@/hooks/useDashboard";
import {
  AlertTriangle,
  Users,
  Activity,
  Shield,
  Zap,
  Heart,
  RefreshCw,
  TrendingUp,
  Clock,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderDashboard from "../components/HeaderDashborad";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getSeverityColor } from "@/utils/getSeverityColor";

const DashboardPage = () => {
  const {
    overview,
    loading,
    error,
    refetch,
    alerts,
    alertsError,
    alertsLoading,
    refetchAlerts,
  } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <span className="text-red-500 text-lg">{error}</span>
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

  if (!overview) {
    return null;
  }

  const getSeverityIcon = (alertType: string) => {
    switch (alertType) {
      case "critical_fatigue":
        return <Zap className="w-4 h-4" />;
      case "high_risk":
        return <Shield className="w-4 h-4" />;
      case "recent_injury":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <HeaderDashboard />

      <div className="container mx-auto pt-6 pb-2">
        <div className="flex justify-between items-center justify-end">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 px-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Atletas
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                {overview.total_athletes}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                Atletas Ativos
              </CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800 dark:text-green-200">
                {overview.active_athletes}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                {overview.total_athletes
                  ? Math.round(
                      (overview.active_athletes / overview.total_athletes) * 100
                    )
                  : 0}
                % do total
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Alto Risco
              </CardTitle>
              <Shield className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-800 dark:text-amber-200">
                {overview.high_risk_athletes}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">
                Fadiga Crítica
              </CardTitle>
              <Zap className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800 dark:text-red-200">
                {overview.critical_fatigue_athletes}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                VO2 Max Médio
              </CardTitle>
              <Heart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                {overview.avg_vo2_max}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                ml/kg/min
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="text-xs text-zinc-400 text-right">
          Atualizado em: {new Date(overview.updated_at).toLocaleString("pt-BR")}
        </div>
        <Tabs defaultValue="alerts" className="space-y-6 px-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-zinc-600 text-white">
            <TabsTrigger value="alerts">
              Alertas Críticos{" "}
              {alerts && alerts.total_alerts > 0 && (
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
                    Erro ao carregar alertas: {alertsError}
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
                      {alerts?.critical_fatigue &&
                        alerts.critical_fatigue.length > 0 && (
                          <Badge className="bg-red-600 text-white">
                            {alerts.critical_fatigue.length}
                          </Badge>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.critical_fatigue &&
                    alerts.critical_fatigue.length > 0 ? (
                      alerts.critical_fatigue.map((alert, index) => (
                        <div
                          key={index}
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
                      {alerts?.high_risk_active &&
                        alerts.high_risk_active.length > 0 && (
                          <Badge className="bg-amber-600 text-white">
                            {alerts.high_risk_active.length}
                          </Badge>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.high_risk_active &&
                    alerts.high_risk_active.length > 0 ? (
                      alerts.high_risk_active.map((alert, index) => (
                        <div
                          key={index}
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
                      {alerts &&
                        alerts.recent_injuries &&
                        alerts.recent_injuries.length > 0 && (
                          <Badge className="bg-orange-600 text-white">
                            {alerts.recent_injuries.length}
                          </Badge>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {alerts?.recent_injuries &&
                    alerts.recent_injuries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {alerts.recent_injuries.map((injury, index) => (
                          <div
                            key={index}
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
                  {/* {data.teamPerformance?.by_position &&
                  data.teamPerformance.by_position.length > 0 ? (
                    data.teamPerformance.by_position.map((position) => (
                      <div key={position.position} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100">
                              {position.position}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {position.total_athletes} atletas • VO2:{' '}
                              {position.avg_vo2} • Fadiga:{' '}
                              {position.avg_fatigue}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
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
                  )} */}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* {data.trending?.daily_metrics &&
                  data.trending.daily_metrics.length > 0 ? (
                    data.trending.daily_metrics.slice(-3).map((day, index) => (
                      <div
                        key={day.date}
                        className="p-4 rounded-lg bg-zinc-700"
                      >
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
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
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-400 text-center py-8 col-span-3">
                      Nenhum dado de tendência disponível
                    </p>
                  )} */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
