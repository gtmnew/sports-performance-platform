'use client';

import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import InjuryRecordModalForm from './modals/InjuryRecordModalForm';

const HeaderInjuryRecord = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-50 bg-zinc-800">
        <div className="w-full py-4 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                Registros de Lesões
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Acompanhe e gerencie as lesões dos atletas
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Nova Lesão
              </Button>
            </div>
          </div>
        </div>
        <InjuryRecordModalForm open={open} onOpenChange={setOpen} />
      </header>
    </div>
  );
};

export default HeaderInjuryRecord;
