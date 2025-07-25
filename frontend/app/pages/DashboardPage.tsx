'use client';

import React, { useState } from 'react';
import HeaderDashboard from '../components/HeaderDashborad';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Activity,
  AlertTriangle,
  Clock,
  Heart,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getRiskLevelColor } from '@/utils/getRiskLevelColor';
import { Badge } from '@/components/ui/badge';
import { getSeverityColor } from '@/utils/getSeverityColor';
import { Progress } from '@/components/ui/progress';
import { getPerformanceColor } from '@/utils/getPerformanceColor';
import { mockData } from '@/utils/mocksData';

const DashboardPage = () => {
  const [data, setData] = useState(mockData);
  return (
    <div className="min-h-screen bg-zinc-900">
      <HeaderDashboard />

      <main className="container mx-auto py-8">
        {data.alerts.total_alerts > 0 && (
          <div className="mb-8">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-300">
                <strong>{data.alerts.total_alerts} alertas críticos</strong>{' '}
                requerem atenção imediata
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Total Atletas
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                {data.overview.total_athletes}
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                +12 este mês
              </p>
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
                {data.overview.active_athletes}
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                77% do total
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
                {data.overview.high_risk_athletes}
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400">
                -3 esta semana
              </p>
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
                {data.overview.critical_fatigue_athletes}
              </div>
              <p className="text-xs text-red-600 dark:text-red-400">
                Últimos 30 min
              </p>
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
                {data.overview.avg_vo2_max}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                ml/kg/min
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto bg-zinc-600 text-white">
            <TabsTrigger value="alerts">Alertas Críticos</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Zap className="w-5 h-5" />
                    Fadiga Crítica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.alerts.critical_fatigue.map((athlete) => (
                    <div
                      key={athlete.athlete_id}
                      className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                    >
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          {athlete.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {athlete.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getRiskLevelColor(
                            athlete.fatigue_score
                          )}`}
                        >
                          {athlete.fatigue_score}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {athlete.time_ago}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                    Lesões Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.alerts.recent_injuries.map((injury, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
                    >
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          {injury.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {injury.position} • {injury.injury_type}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getSeverityColor(injury.severity)}>
                          {injury.severity}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {injury.time_ago}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
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
                  {data.teamPerformance.by_position.map((position) => (
                    <div key={position.position} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {position.position}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {position.total_athletes} atletas • VO2:{' '}
                            {position.avg_vo2} • Fadiga: {position.avg_fatigue}
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
                        style={{
                          ['--progress-background' as any]: getPerformanceColor(
                            position.performance_score
                          ),
                        }}
                      />
                    </div>
                  ))}
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
                  {data.trends.daily_metrics.slice(-3).map((day, index) => (
                    <div key={day.date} className="p-4 rounded-lg bg-zinc-700">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {new Date(day.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Fadiga Média</span>
                          <span
                            className={`font-medium ${getRiskLevelColor(
                              day.avg_fatigue
                            )}`}
                          >
                            {day.avg_fatigue}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">VO2 Médio</span>
                          <span className="font-medium text-blue-600">
                            {day.avg_vo2}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">BPM Médio</span>
                          <span className="font-medium text-purple-600">
                            {day.avg_heart_rate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
