'use client';

import { useState, useMemo } from 'react';
import { useGetAthlete } from '@/hooks/useAthlete';
import HeaderAthletes from '../components/HeaderAthletes';
import AthleteFilters from '../components/AthleteFilters';
import AthleteCard from '../components/AthleteCard';
import EmptyState from '../components/EmptyState';
import { Athlete } from '../types/AthleteType';

export const AthletesPage = () => {
  const { getAthletes, refetchAthletes, isLoading, error } = useGetAthlete();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterTeam, setFilterTeam] = useState('all');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const filteredAthletes = useMemo(() => {
    if (!getAthletes) return [];

    let current = getAthletes;

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      current = current.filter(
        (a) =>
          a.name.toLowerCase().includes(lowerSearch) ||
          a.position.toLowerCase().includes(lowerSearch)
      );
    }
    if (filterPosition !== 'all') {
      current = current.filter((a) => a.position === filterPosition);
    }
    if (filterRisk !== 'all') {
      current = current.filter((a) => a.riskLevel === filterRisk);
    }
    if (filterTeam !== 'all') {
      current = current.filter((a) => a.team === filterTeam);
    }

    return current;
  }, [getAthletes, searchTerm, filterPosition, filterRisk, filterTeam]);

  const positions = useMemo(() => {
    if (!getAthletes) return ['all'];
    return ['all', ...Array.from(new Set(getAthletes.map((a) => a.position)))];
  }, [getAthletes]);

  const teams = useMemo(() => {
    if (!getAthletes) return ['all'];
    return ['all', ...Array.from(new Set(getAthletes.map((a) => a.team)))];
  }, [getAthletes]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        Carregando atletas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        Erro ao carregar atletas: {(error as Error).message || String(error)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <HeaderAthletes athletesCount={filteredAthletes.length} />

      <main className="container mx-auto px-6 py-8">
        <AthleteFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPosition={filterPosition}
          setFilterPosition={setFilterPosition}
          filterRisk={filterRisk}
          setFilterRisk={setFilterRisk}
          filterTeam={filterTeam}
          setFilterTeam={setFilterTeam}
          positions={positions}
          teams={teams}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAthletes.length > 0 ? (
            filteredAthletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                onSelectAthlete={setSelectedAthlete}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
};

export default AthletesPage;
