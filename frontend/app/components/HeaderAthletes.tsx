import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

const HeaderAthletes = ({ athletesCount }: { athletesCount: number }) => {
  return (
    <header className="sticky top-0 z-50 bg-zinc-800">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Atletas
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {athletesCount} atletas encontrados
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer">
            <Plus className="w-4 h-4 mr-2" />
            Novo Atleta
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAthletes;
