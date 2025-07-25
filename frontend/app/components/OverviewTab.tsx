import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { getRiskColor } from '@/utils/getRiskColor';
import { Calendar, Shield, Target, TrendingUp } from 'lucide-react';

export const OverviewTab = ({ athlete }: any) => (
  <TabsContent value="overview" className="space-y-4 mt-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-zinc-700 text-white border-zinc-600">
        <CardContent className="pt-4">
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto text-blue-600 mb-2" />
            <p className="text-sm text-slate-400">Idade</p>
            <p className="text-xl font-bold">{athlete.age}</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-700 text-white border-zinc-600">
        <CardContent className="pt-4">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto text-green-600 mb-2" />
            <p className="text-sm text-slate-400">Altura</p>
            <p className="text-xl font-bold">{athlete.height}cm</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-700 text-white border-zinc-600">
        <CardContent className="pt-4">
          <div className="text-center">
            <Target className="w-6 h-6 mx-auto text-purple-600 mb-2" />
            <p className="text-sm text-slate-400">Peso</p>
            <p className="text-xl font-bold">{athlete.weight}kg</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-700 text-white border-zinc-600">
        <CardContent className="pt-4">
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto text-amber-600 mb-2" />
            <p className="text-sm text-slate-400">Risco</p>
            <Badge className={getRiskColor(athlete.riskLevel)}>
              {athlete.riskLevel}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </TabsContent>
);

export default OverviewTab;
