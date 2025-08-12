'use client';

import { Activity, AlertTriangle, Check, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getStatusColor } from '@/utils/getStatusColor';
import { getSeverityColor } from '@/utils/getSeverityColor';
import { getStatusText } from '@/utils/getStatusText';
import { getSeverityText } from '@/utils/getSeverityText';
import HeaderInjuryRecord from '../components/HeaderInjuryRecord';
import { useInjuryRecords } from '@/hooks/useInjuryRecord';
import { FormattedInjuryRecord } from '../types/AthleteType';

const InjuryRecordPage = () => {
  const [filteredInjuries, setFilteredInjuries] = useState<
    FormattedInjuryRecord[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  const { data: injuries = [], isLoading, error, refetch } = useInjuryRecords();

  const teams = [...new Set(injuries.map((injury) => injury.team))].filter(
    Boolean
  );

  useEffect(() => {
    let filtered = injuries;

    if (searchTerm) {
      filtered = filtered.filter(
        (injury) =>
          injury.athlete_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          injury.injuryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          injury.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((injury) => injury.status === statusFilter);
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(
        (injury) => injury.severity === severityFilter
      );
    }

    if (teamFilter !== 'all') {
      filtered = filtered.filter((injury) => injury.team === teamFilter);
    }

    setFilteredInjuries(filtered);
  }, [searchTerm, statusFilter, severityFilter, teamFilter, injuries]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Carregando registros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl mb-4">Erro ao carregar registros</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="">
        <HeaderInjuryRecord />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-6">
            {[
              {
                label: 'Total de Lesões',
                value: injuries.length,
                icon: <Activity className="w-6 h-6 text-blue-600" />,
                bg: 'bg-zinc-600',
                text: 'text-white',
              },
              {
                label: 'Lesões Ativas',
                value: injuries.filter((i) => i.status === 'active').length,
                icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
                bg: 'bg-zinc-600',
                text: 'text-red-600',
              },
              {
                label: 'Recuperando',
                value: injuries.filter((i) => i.status === 'recovering').length,
                icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
                bg: 'bg-zinc-600',
                text: 'text-yellow-600',
              },
              {
                label: 'Recuperados',
                value: injuries.filter((i) => i.status === 'recovered').length,
                icon: <Check className="w-6 h-6 text-green-600" />,
                bg: 'bg-zinc-600',
                text: 'text-green-600',
              },
            ].map((card, idx) => (
              <div key={idx} className={`${card.bg} rounded-xl p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {card.label}
                    </p>
                    <p className={`text-2xl font-bold ${card.text}`}>
                      {card.value}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar atleta, tipo ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-700 w-full md:w-1/3"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="recovering">Recuperando</option>
              <option value="recovered">Recuperado</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="all">Todas Severidades</option>
              <option value="minor">Leve</option>
              <option value="moderate">Moderado</option>
              <option value="severe">Grave</option>
              <option value="critical">Crítico</option>
            </select>

            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="all">Todos os Times</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-gray-400 border-b border-zinc-700">
                <tr>
                  <th className="py-2 px-3">Atleta</th>
                  <th className="py-2 px-3">Tipo</th>
                  <th className="py-2 px-3">Severidade</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Data</th>
                  <th className="py-2 px-3">Dias Afastado</th>
                </tr>
              </thead>
              <tbody>
                {filteredInjuries.map((injury) => (
                  <tr key={injury.id} className="border-b border-zinc-700">
                    <td className="py-2 px-3">{injury.athlete_name}</td>
                    <td className="py-2 px-3">{injury.injuryType}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(
                          injury.severity
                        )}`}
                      >
                        {getSeverityText(injury.severity)}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                          injury.status
                        )}`}
                      >
                        {getStatusText(injury.status)}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {formatDate(injury.createdAt)}
                    </td>
                    <td className="py-2 px-3">{injury.daysOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInjuries.length === 0 && !isLoading && (
              <div className="text-center py-6 text-gray-400">
                Nenhum registro encontrado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InjuryRecordPage;
