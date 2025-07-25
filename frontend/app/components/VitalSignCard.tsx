import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { VitalSignPhysicalTest } from '../types/VitalSignPhysicalTest';
import { Progress } from '@/components/ui/progress';
import WaveChart from './WaveChart';

export const VitalSignCard = ({ vital }: { vital: VitalSignPhysicalTest }) => {
  const isCritical =
    vital.value < vital.normalMin || vital.value > vital.normalMax;
  const progressValue =
    vital.id === 'pressure'
      ? (vital.value / 160) * 100
      : vital.id === 'temperature'
      ? ((vital.value - 35) / 3) * 100
      : vital.id === 'oxygen'
      ? vital.value
      : (vital.value / (vital.normalMax * 1.2)) * 100;

  return (
    <Card
      className={`bg-zinc-800 border-zinc-700 transition-all duration-300 ${
        isCritical
          ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/20'
          : 'hover:shadow-lg'
      }`}
    >
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 ${vital.color}`}>
          {vital.icon}
          {vital.label}
          {isCritical && (
            <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">
              <span className={isCritical ? 'text-red-400' : vital.color}>
                {vital.value}
              </span>
              <span className="text-sm text-zinc-400 ml-1">{vital.unit}</span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              Normal: {vital.normalRange}
            </div>
            {isCritical && (
              <div className="text-xs text-red-400 font-medium mt-1">
                ⚠️ Fora do normal
              </div>
            )}
          </div>
          <div className="text-right">
            <Progress
              value={progressValue}
              className={`w-20 h-2 ${isCritical ? '[&>div]:bg-red-500' : ''}`}
            />
            <div className="text-xs text-zinc-500 mt-1">
              {Math.round(progressValue)}%
            </div>
          </div>
        </div>
        <WaveChart wave={vital.wave} color={vital.waveColor} />
      </CardContent>
    </Card>
  );
};

export default VitalSignCard;
