import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { VitalSign } from '../types/VitalSignType';

export const VitalsTab = ({ athlete }: any) => (
  <TabsContent value="vitals" className="mt-4">
    {athlete.vitalSigns.length > 0 ? (
      <div className="space-y-4">
        {athlete.vitalSigns.map((vital: VitalSign) => (
          <Card
            key={vital.id}
            className="bg-zinc-700 text-white border-zinc-600"
          >
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Frequência Cardíaca</p>
                  <p className="text-lg font-bold text-red-600">
                    {vital.heart_rate} BPM
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">VO2 Max</p>
                  <p className="text-lg font-bold text-blue-600">
                    {vital.vo2_max}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Score de Fadiga</p>
                  <p className="text-lg font-bold text-amber-600">
                    {vital.fatigue_score}%
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Qualidade do Sono</p>
                  <p className="text-lg font-bold text-green-600">
                    {vital.sleep_quality}/10
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Registrado em:{' '}
                {new Date(vital.created_at).toLocaleString('pt-BR')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-center text-slate-500 py-8">
        Nenhum sinal vital registrado
      </p>
    )}
  </TabsContent>
);

export default VitalsTab;
