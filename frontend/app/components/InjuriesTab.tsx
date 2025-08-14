import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { getStatusColor } from '@/utils/getStatusColor';
import { InjuryRecord } from '../types/AthleteType';

export const InjuriesTab = ({ athlete }: any) => (
  <TabsContent value="injuries" className="mt-4">
    {athlete.injuryRecords.length > 0 ? (
      <div className="space-y-4">
        {athlete.injuryRecords.map((injury: InjuryRecord) => (
          <Card
            key={injury.id}
            className="bg-zinc-700 text-white border-zinc-600"
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{injury.injuryType}</h4>
                  <p className="text-sm text-slate-400">{injury.bodyPart}</p>
                </div>
                <Badge className={getStatusColor(injury.status)}>
                  {injury.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Gravidade</p>
                  <p className="font-medium">{injury.severity}</p>
                </div>
                <div>
                  <p className="text-slate-400">Data da Lesão</p>
                  <p className="font-medium">
                    {new Date(injury.injuryDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {injury.expectedRecovery && (
                  <div className="col-span-2">
                    <p className="text-slate-400">Recuperação Esperada</p>
                    <p className="font-medium">
                      {new Date(injury.expectedRecovery).toLocaleDateString(
                        'pt-BR'
                      )}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <p className="text-center text-slate-500 py-8">
        Nenhuma lesão registrada
      </p>
    )}
  </TabsContent>
);

export default InjuriesTab;
