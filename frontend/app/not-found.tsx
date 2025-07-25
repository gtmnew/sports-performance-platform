'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Activity,
  Heart,
  MapPin,
  Zap,
  Home,
  ArrowLeft,
  AlertTriangle,
  Timer,
  Signal,
} from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [heartRate, setHeartRate] = useState(72);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHeartRate((prev) => 60 + Math.floor(Math.random() * 40));
    }, 2000);

    const timeInterval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(heartInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const vitalSigns = [
    {
      icon: Heart,
      label: 'Frequência Cardíaca',
      value: `${heartRate} BPM`,
      status: 'normal',
      color: 'text-red-500',
    },
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Desconhecida',
      status: 'error',
      color: 'text-orange-500',
    },
    {
      icon: Signal,
      label: 'Sinal',
      value: 'Perdido',
      status: 'error',
      color: 'text-red-500',
    },
    {
      icon: Timer,
      label: 'Tempo Offline',
      value: formatTime(elapsedTime),
      status: 'warning',
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="relative">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-9xl font-black text-red-500/20 blur-sm">
              404
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <Badge variant="destructive" className="text-sm font-semibold">
              ATLETA FORA DE ALCANCE
            </Badge>
          </div>
        </div>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-slate-300">
                Monitor Cardíaco
              </span>
            </div>

            <div className="h-20 flex items-center justify-center relative overflow-hidden">
              <svg
                viewBox="0 0 800 80"
                className="w-full h-full"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))',
                }}
              >
                <defs>
                  <linearGradient
                    id="heartbeat"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="url(#heartbeat)"
                  strokeWidth="3"
                  points="0,40 50,40 70,10 90,70 110,40 150,40 170,20 190,60 210,40 250,40 270,10 290,70 310,40 350,40 370,20 390,60 410,40 450,40 470,10 490,70 510,40 550,40 570,20 590,60 610,40 650,40 670,10 690,70 710,40 800,40"
                  className="animate-pulse"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vitalSigns.map((vital, index) => {
            const IconComponent = vital.icon;
            return (
              <Card
                key={index}
                className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-slate-700/50 ${vital.color}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">
                        {vital.label}
                      </p>
                      <p className={`text-lg font-bold ${vital.color}`}>
                        {vital.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-slate-800/30 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">
              Atleta Não Encontrado
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              O atleta que você estava monitorando saiu da área de cobertura ou
              a página foi movida. Verifique a URL ou retorne ao painel
              principal para continuar o acompanhamento.
            </p>

            <Separator className="my-6 bg-slate-700" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                <Home className="mr-2 h-5 w-5" />
                Voltar ao Dashboard
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Página Anterior
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-slate-500 text-sm">
          <p>Sistema de Monitoramento de Atletas • Erro 404</p>
          <p className="mt-1">
            Verifique sua conexão ou entre em contato com o suporte técnico
          </p>
        </div>
      </div>
    </div>
  );
}
