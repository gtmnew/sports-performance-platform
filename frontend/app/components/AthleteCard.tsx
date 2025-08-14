import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Clock, Eye, Edit, AlertTriangle } from 'lucide-react';
import { getConditionColor } from '@/utils/getConditionColor';
import { getRiskColor } from '@/utils/getRiskColor';
import { getConditionFromVitals } from '@/utils/getConditionFromVitals';
import AthleteDetailsModal from './AthleteDetailsModal';
import { Athlete } from '@/hooks/useAthlete';

interface AthleteCardProps {
  athlete: Athlete;
  onSelectAthlete: (athlete: Athlete) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({
  athlete,
  onSelectAthlete,
}) => {
  const condition = getConditionFromVitals(athlete.vitalSigns);
  const latestVitals =
    athlete.vitalSigns.length > 0 ? athlete.vitalSigns[0] : null;
  const activeInjuries = athlete.injuryRecords.filter(
    (injury) => injury.status === 'active'
  );

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-zinc-800 text-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {athlete.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-100">
                {athlete.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="w-3 h-3" />
                {athlete.position} • {athlete.team}
              </div>
            </div>
          </div>
          <Badge className={getRiskColor(athlete.riskLevel)}>
            {athlete.riskLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Idade</p>
            <p className="font-medium">{athlete.age} anos</p>
          </div>
          <div>
            <p className="text-slate-400">Altura</p>
            <p className="font-medium">{athlete.height}cm</p>
          </div>
          <div>
            <p className="text-slate-400">Peso</p>
            <p className="font-medium">{athlete.weight}kg</p>
          </div>
        </div>

        {latestVitals && (
          <div
            className={`p-3 rounded-lg border ${getConditionColor(condition)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Condição Atual</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                {new Date(latestVitals.createdAt).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400">BPM:</span>
                <span className="ml-1 font-medium">
                  {latestVitals.heartRate}
                </span>
              </div>
              <div>
                <span className="text-slate-400">VO2:</span>
                <span className="ml-1 font-medium">{latestVitals.vo2Max}</span>
              </div>
              <div>
                <span className="text-slate-400">Fadiga:</span>
                <span className="ml-1 font-medium">
                  {latestVitals.fatigueScore}%
                </span>
              </div>
              <div>
                <span className="text-slate-400">Sono:</span>
                <span className="ml-1 font-medium">
                  {latestVitals.sleepQuality}/10
                </span>
              </div>
            </div>
          </div>
        )}

        {activeInjuries.length > 0 && (
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              <strong>{activeInjuries.length} lesão(ões) ativa(s)</strong>
              <div className="mt-1 text-xs">
                {activeInjuries[0].injuryType} - {activeInjuries[0].bodyPart}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white"
                onClick={() => onSelectAthlete(athlete)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </Button>
            </DialogTrigger>
            <AthleteDetailsModal athlete={athlete} />
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600 hover:text-white"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteCard;
