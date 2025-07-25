import { User } from 'lucide-react';

export const EmptyState = () => (
  <div className="text-center py-12">
    <User className="w-16 h-16 mx-auto text-slate-400 mb-4" />
    <h3 className="text-lg font-semibold text-slate-400 mb-2">
      Nenhum atleta encontrado
    </h3>
    <p className="text-slate-500">
      Tente ajustar os filtros ou adicione novos atletas.
    </p>
  </div>
);

export default EmptyState;
