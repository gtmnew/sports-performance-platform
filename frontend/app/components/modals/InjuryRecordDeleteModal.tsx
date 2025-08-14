'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { useDeleteInjuryRecord } from '@/hooks/useDeleteInjuryRecord';

type InjuryRecordDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recordId?: number;
};

const InjuryRecordDeleteModal = ({
  open,
  onOpenChange,
  recordId,
}: InjuryRecordDeleteModalProps) => {
  //   const { mutateAsync: deleteInjuryRecord } = useDeleteInjuryRecord();

  const handleDelete = async () => {
    if (!recordId) return;
    // await deleteInjuryRecord(recordId)
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Excluir Registro</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este registro? Essa ação não poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InjuryRecordDeleteModal;
