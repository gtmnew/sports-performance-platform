'use client';

import { Badge } from '@/components/ui/badge';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Droplets,
  Heart,
  Pause,
  Play,
  Settings,
  Share2,
  Square,
  Thermometer,
  Wifi,
  WifiOff,
  Wind,
  Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { VitalSignPhysicalTest } from '../types/VitalSignPhysicalTest';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import VitalSignCard from '../components/VitalSignCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WaveChart from '../components/WaveChart';

const PhysicalTestPage = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [heartRate, setHeartRate] = useState(72);
  const [bloodPressure, setBloodPressure] = useState({
    systolic: 120,
    diastolic: 80,
  });
  const [temperature, setTemperature] = useState(36.5);
  const [oxygenSaturation, setOxygenSaturation] = useState(98);
  const [respiratoryRate, setRespiratoryRate] = useState(16);

  const [heartWave, setHeartWave] = useState<number[]>([]);
  const [pressureWave, setPressureWave] = useState<number[]>([]);
  const [tempWave, setTempWave] = useState<number[]>([]);
  const [oxygenWave, setOxygenWave] = useState<number[]>([]);
  const [respWave, setRespWave] = useState<number[]>([]);

  const vitals: VitalSignPhysicalTest[] = [
    {
      id: 'heart',
      icon: <Heart className="h-5 w-5" />,
      label: 'Frequência Cardíaca',
      value: Math.round(heartRate),
      unit: 'bpm',
      normalRange: '60-100 bpm',
      normalMin: 60,
      normalMax: 100,
      color: 'text-red-400',
      wave: heartWave,
      waveColor: '#ef4444',
      priority: 'high',
    },
    {
      id: 'pressure',
      icon: <Activity className="h-5 w-5" />,
      label: 'Pressão Arterial',
      value: bloodPressure.systolic,
      unit: `/${Math.round(bloodPressure.diastolic)} mmHg`,
      normalRange: '<120/80 mmHg',
      normalMin: 90,
      normalMax: 140,
      color: 'text-blue-400',
      wave: pressureWave,
      waveColor: '#3b82f6',
      priority: 'high',
    },
    {
      id: 'oxygen',
      icon: <Droplets className="h-5 w-5" />,
      label: 'Saturação O2',
      value: Math.round(oxygenSaturation),
      unit: '%',
      normalRange: '>95%',
      normalMin: 95,
      normalMax: 100,
      color: 'text-cyan-400',
      wave: oxygenWave,
      waveColor: '#06b6d4',
      priority: 'high',
    },
    {
      id: 'temperature',
      icon: <Thermometer className="h-5 w-5" />,
      label: 'Temperatura',
      value: parseFloat(temperature.toFixed(1)),
      unit: '°C',
      normalRange: '36.0-37.5°C',
      normalMin: 36.0,
      normalMax: 37.5,
      color: 'text-orange-400',
      wave: tempWave,
      waveColor: '#f97316',
      priority: 'medium',
    },
    {
      id: 'respiratory',
      icon: <Wind className="h-5 w-5" />,
      label: 'Freq. Respiratória',
      value: Math.round(respiratoryRate),
      unit: 'rpm',
      normalRange: '12-20 rpm',
      normalMin: 12,
      normalMax: 20,
      color: 'text-green-400',
      wave: respWave,
      waveColor: '#22c55e',
      priority: 'medium',
    },
  ];

  const criticalVitals = vitals.filter(
    (vital) => vital.value < vital.normalMin || vital.value > vital.normalMax
  );
  const isCritical = criticalVitals.length > 0;
  const overallStatus = isCritical ? 'ALERTA' : 'ESTÁVEL';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      if (isMonitoring) {
        setLastUpdate(new Date());
        setHeartRate((prev) =>
          Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 4))
        );
        setBloodPressure((prev) => ({
          systolic: Math.max(
            100,
            Math.min(140, prev.systolic + (Math.random() - 0.5) * 3)
          ),
          diastolic: Math.max(
            60,
            Math.min(90, prev.diastolic + (Math.random() - 0.5) * 2)
          ),
        }));
        setTemperature((prev) =>
          Math.max(35.0, Math.min(38.0, prev + (Math.random() - 0.5) * 0.1))
        );
        setOxygenSaturation((prev) =>
          Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5))
        );
        setRespiratoryRate((prev) =>
          Math.max(12, Math.min(20, prev + (Math.random() - 0.5) * 1))
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isMonitoring]);

  useEffect(() => {
    if (isMonitoring) {
      const waveInterval = setInterval(() => {
        const time = Date.now();

        const updateWave = (prevWave: number[], newValue: number) => {
          const wave = [...prevWave, newValue];
          return wave.length > 150 ? wave.slice(-150) : wave;
        };

        setHeartWave((prev) => {
          const heartPattern =
            Math.sin(time / 200) * 30 + Math.sin(time / 50) * 10;
          const spike = Math.sin(time / 100) > 0.8 ? 40 : 0;
          return updateWave(
            prev,
            50 + heartPattern + spike + (Math.random() - 0.5) * 3
          );
        });

        setPressureWave((prev) => {
          const pressurePattern =
            Math.sin(time / 300) * 20 + Math.sin(time / 150) * 8;
          return updateWave(
            prev,
            45 + pressurePattern + (Math.random() - 0.5) * 2
          );
        });

        setTempWave((prev) => {
          const tempPattern =
            Math.sin(time / 800) * 8 + Math.sin(time / 400) * 3;
          return updateWave(prev, 50 + tempPattern + (Math.random() - 0.5) * 1);
        });

        setOxygenWave((prev) => {
          const oxyPattern =
            Math.sin(time / 250) * 15 + Math.sin(time / 100) * 5;
          return updateWave(prev, 48 + oxyPattern + (Math.random() - 0.5) * 2);
        });

        setRespWave((prev) => {
          const respPattern =
            Math.sin(time / 600) * 25 + Math.sin(time / 300) * 8;
          return updateWave(prev, 52 + respPattern + (Math.random() - 0.5) * 2);
        });
      }, 80);

      return () => clearInterval(waveInterval);
    }
  }, [isMonitoring]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const resetMonitoring = () => {
    setIsMonitoring(false);
    setHeartRate(72);
    setBloodPressure({ systolic: 120, diastolic: 80 });
    setTemperature(36.5);
    setOxygenSaturation(98);
    setRespiratoryRate(16);
    setHeartWave([]);
    setPressureWave([]);
    setTempWave([]);
    setOxygenWave([]);
    setRespWave([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white">
      <header className="sticky top-0 z-50 bg-zinc-800/95 backdrop-blur-sm border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Monitoramento de Sinais Vitais
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Sistema de monitoramento em tempo real para atletas
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              <div className="text-sm font-mono text-zinc-400">
                {formatTime(currentTime)}
              </div>
              <Badge
                variant={isCritical ? 'destructive' : 'default'}
                className={`text-sm px-3 py-1 ${
                  isCritical ? 'bg-red-600 animate-pulse' : 'bg-green-600'
                }`}
              >
                {overallStatus}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {isCritical && (
          <Alert className="border-red-500 bg-red-950/50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-200">
              <strong>Atenção:</strong> {criticalVitals.length} sinal(is)
              vital(is) fora do normal:{' '}
              {criticalVitals.map((v) => v.label).join(', ')}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={toggleMonitoring}
            variant={isMonitoring ? 'destructive' : 'default'}
            className="flex items-center gap-2"
          >
            {isMonitoring ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar Monitoramento
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Iniciar Monitoramento
              </>
            )}
          </Button>
          <Button
            onClick={resetMonitoring}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vitals.map((vital) => (
            <VitalSignCard key={vital.id} vital={vital} />
          ))}
        </div>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5" />
              Monitor de Sinais Vitais - Tempo Real
              <Badge variant="outline" className="ml-auto">
                Última atualização: {formatTime(lastUpdate)}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitals.map((vital) => {
                const isCritical =
                  vital.value < vital.normalMin ||
                  vital.value > vital.normalMax;
                return (
                  <div key={vital.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: vital.waveColor }}
                      ></div>
                      <span
                        className={`font-medium ${vital.color} ${
                          isCritical ? 'animate-pulse' : ''
                        }`}
                      >
                        {vital.label} - {vital.value}
                        {vital.unit}
                      </span>
                      {isCritical && (
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                    <WaveChart
                      wave={vital.wave}
                      color={vital.waveColor}
                      height="h-20"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5" />
              Resumo do Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 ${
                    isCritical ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {overallStatus}
                </div>
                <div className="text-sm text-zinc-400">Status Geral</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2 text-blue-400">
                  {vitals.length - criticalVitals.length}/{vitals.length}
                </div>
                <div className="text-sm text-zinc-400">Sinais Normais</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold mb-2 ${
                    isMonitoring ? 'text-green-400' : 'text-zinc-400'
                  }`}
                >
                  {isMonitoring ? (
                    <CheckCircle className="h-8 w-8 mx-auto" />
                  ) : (
                    <Pause className="h-8 w-8 mx-auto" />
                  )}
                </div>
                <div className="text-sm text-zinc-400">
                  {isMonitoring ? 'Monitorando' : 'Pausado'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PhysicalTestPage;
