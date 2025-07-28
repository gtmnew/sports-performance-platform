'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Activity, Heart, Lock, Mail, Trophy } from 'lucide-react';
import React, { SyntheticEvent, useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submitted:', { email, password });
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/5 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-400/5 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-orange-400/5 rounded-full opacity-40 animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border border-gray-800/80 bg-black/90 backdrop-blur-sm ring-1 ring-white/5">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/10">
              <Activity className="w-10 h-10 text-black" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                SportsFisio Pro
              </CardTitle>
              <CardDescription className="text-gray-400 text-base">
                Sistema integrado de performance esportiva e reabilitação
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-gray-900/80 border-gray-700 focus:border-blue-400 focus:bg-gray-900 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-1 focus:ring-blue-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-200 flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-gray-900/80 border-gray-700 focus:border-blue-400 focus:bg-gray-900 text-white placeholder:text-gray-500 transition-all duration-200 focus:ring-1 focus:ring-blue-400/20"
                />
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">Entrar</div>
                )}
              </Button>
            </div>

            <div className="relative">
              <Separator className="my-6" />
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 border-2 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                onClick={() => console.log('Redirect to register')}
              >
                <Trophy className="w-4 h-4 mr-2 text-blue-600" />
                Criar nova conta
              </Button>

              <Button
                variant="ghost"
                className="w-full text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                onClick={() => console.log('Redirect to forgot password')}
              >
                Esqueceu sua senha?
              </Button>
            </div>
          </CardContent>

          <CardFooter className="pt-6">
            <div className="w-full text-center">
              <p className="text-xs text-gray-500 mb-2">
                Plataforma desenvolvida por fisioterapeuta especializado
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>Saúde</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-yellow-400" />
                  <span>Performance</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-green-400" />
                  <span>Tecnologia</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Stats cards at bottom */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center shadow-md border border-gray-800/50 ring-1 ring-white/5">
            <div className="text-lg font-bold text-blue-400">1.2K+</div>
            <div className="text-xs text-gray-500">Atletas</div>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center shadow-md border border-gray-800/50 ring-1 ring-white/5">
            <div className="text-lg font-bold text-green-400">95%</div>
            <div className="text-xs text-gray-500">Recuperação</div>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center shadow-md border border-gray-800/50 ring-1 ring-white/5">
            <div className="text-lg font-bold text-orange-400">24/7</div>
            <div className="text-xs text-gray-500">Suporte</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
