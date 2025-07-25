import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import OverviewTab from './OverviewTab';
import VitalsTab from './VitalsTab';
import InjuriesTab from './InjuriesTab';

const AthleteDetailsModal = ({ athlete }: any) => {
  return (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-zinc-800 text-white border-zinc-700">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {athlete?.name.charAt(0)}
          </div>
          {athlete?.name}
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="vitals"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Sinais Vitais
          </TabsTrigger>
          <TabsTrigger
            value="injuries"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Lesões
          </TabsTrigger>
        </TabsList>

        <OverviewTab athlete={athlete} />
        <VitalsTab athlete={athlete} />
        <InjuriesTab athlete={athlete} />
      </Tabs>
    </DialogContent>
  );
};

export default AthleteDetailsModal;
