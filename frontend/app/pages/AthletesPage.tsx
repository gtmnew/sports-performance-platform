'use client';

import { useEffect, useState } from 'react';
import HeaderAthletes from '../components/HeaderAthletes';
import AthleteFilters from '../components/AthleteFilters';
import AthleteCard from '../components/AthleteCard';
import EmptyState from '../components/EmptyState';
import { Athlete } from '../types/AthleteType';
import { mockAthletes } from '@/utils/mocksAthletes';

export const AthletesPage = () => {
  const [athletes, setAthletes] = useState<Athlete[]>(mockAthletes);
  const [filteredAthletes, setFilteredAthletes] =
    useState<Athlete[]>(mockAthletes);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  const positions = [
    'all',
    ...new Set(athletes.map((athlete) => athlete.position)),
  ];
  const teams = ['all', ...new Set(athletes.map((athlete) => athlete.team))];

  useEffect(() => {
    let currentFilteredAthletes = athletes;

    if (searchTerm) {
      currentFilteredAthletes = currentFilteredAthletes.filter(
        (athlete) =>
          athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          athlete.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPosition !== 'all') {
      currentFilteredAthletes = currentFilteredAthletes.filter(
        (athlete) => athlete.position === filterPosition
      );
    }

    if (filterRisk !== 'all') {
      currentFilteredAthletes = currentFilteredAthletes.filter(
        (athlete) => athlete.riskLevel === filterRisk
      );
    }

    if (filterTeam !== 'all') {
      currentFilteredAthletes = currentFilteredAthletes.filter(
        (athlete) => athlete.team === filterTeam
      );
    }

    setFilteredAthletes(currentFilteredAthletes);
  }, [searchTerm, filterPosition, filterRisk, filterTeam, athletes]);

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
          {filteredAthletes.map((athlete) => (
            <AthleteCard
              key={athlete.id}
              athlete={athlete}
              onSelectAthlete={setSelectedAthlete}
            />
          ))}
        </div>

        {filteredAthletes.length === 0 && <EmptyState />}
      </main>
    </div>
  );
};

export default AthletesPage;
