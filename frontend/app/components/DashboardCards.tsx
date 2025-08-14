import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboard } from '@/hooks/useDashboard';
import { Activity, Heart, Shield, Users, Zap } from 'lucide-react';

const DashboardCards = () => {
  const { overview } = useDashboard();

  if (!overview) {
    return null;
  }

  return (
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
      <div className="col-span-full text-xs text-zinc-400 flex justify-end">
        Atualizado em: {new Date(overview.updated_at).toLocaleString('pt-BR')}
      </div>
    </div>
  );
};

export default DashboardCards;
