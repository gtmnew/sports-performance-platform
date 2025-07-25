import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import React from 'react';

interface AthleteFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterPosition: string;
  setFilterPosition: (value: string) => void;
  filterRisk: string;
  setFilterRisk: (value: string) => void;
  filterTeam: string;
  setFilterTeam: (value: string) => void;
  positions: string[];
  teams: string[];
}

const AthleteFilters: React.FC<AthleteFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterPosition,
  setFilterPosition,
  filterRisk,
  setFilterRisk,
  filterTeam,
  setFilterTeam,
  positions,
  teams,
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou posição..."
            className="pl-10 bg-zinc-800 text-white border-zinc-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterPosition} onValueChange={setFilterPosition}>
          <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 text-white border-zinc-700">
            <SelectValue placeholder="Posição" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 text-white border-zinc-700">
            {positions.map((position: string) => (
              <SelectItem key={position} value={position}>
                {position === 'all' ? 'Todas as posições' : position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterRisk} onValueChange={setFilterRisk}>
          <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 text-white border-zinc-700">
            <SelectValue placeholder="Nível de Risco" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 text-white border-zinc-700">
            <SelectItem value="all">Todos os riscos</SelectItem>
            <SelectItem value="low">Baixo</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
            <SelectItem value="critical">Crítico</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterTeam} onValueChange={setFilterTeam}>
          <SelectTrigger className="w-full sm:w-[180px] bg-zinc-800 text-white border-zinc-700">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 text-white border-zinc-700">
            {teams.map((team: string) => (
              <SelectItem key={team} value={team}>
                {team === 'all' ? 'Todos os times' : team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AthleteFilters;
