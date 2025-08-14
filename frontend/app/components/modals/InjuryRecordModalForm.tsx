'use client';

import {
  CreateInjuryRecordFormData,
  createInjuryRecordSchema,
} from '@/app/schemas/create_injury_record';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateInjuryRecord } from '@/hooks/useCreateInjuryRecord';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type InjuryRecordModalFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const InjuryRecordModalForm = ({
  open,
  onOpenChange,
}: InjuryRecordModalFormProps) => {
  const { mutateAsync: createInjuryRecord } = useCreateInjuryRecord();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateInjuryRecordFormData>({
    resolver: zodResolver(createInjuryRecordSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateInjuryRecordFormData) => {
    try {
      await createInjuryRecord(data);

      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar um registro de lesão:', error);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] bg-zinc-800 text-zinc-100 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-semibold">
            Novo Registro de Lesão
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Preencha os dados para cadastrar uma nova lesão.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 pb-4">
            <div className="grid gap-2">
              <Label htmlFor="athleteId">ID</Label>
              <Input
                id="athleteId"
                type="number"
                placeholder="Ex: 1"
                {...register('athleteId', { valueAsNumber: true })}
                className={errors.athleteId ? 'border-red-500' : ''}
              />
              {errors.athleteId && (
                <p className="text-sm text-red-400">
                  {errors.athleteId.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="injuryType">Tipo de Lesão</Label>
              <Input
                id="injuryType"
                placeholder="Ex: Ruptura ligamentar"
                {...register('injuryType')}
                className={errors.injuryType ? 'border-red-500' : ''}
              />
              {errors.injuryType && (
                <p className="text-sm text-red-400">
                  {errors.injuryType.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bodyPart">Região da Lesão</Label>
              <Input
                id="bodyPart"
                placeholder="Ex: Posterior de coxa"
                {...register('bodyPart')}
                className={errors.bodyPart ? 'border-red-500' : ''}
              />
              {errors.bodyPart && (
                <p className="text-sm text-red-400">
                  {errors.bodyPart.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 justify-between">
              <div className="flex-2 grid gap-2">
                <Label htmlFor="severity">Gravidade</Label>
                <Controller
                  name="severity"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="severity"
                        className={errors.severity ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Selecione o nível de gravidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minor">Leve</SelectItem>
                        <SelectItem value="moderate">Moderado</SelectItem>
                        <SelectItem value="severe">Grave</SelectItem>
                        <SelectItem value="critical">Gravíssimo</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.severity && (
                  <p className="text-sm text-red-400">
                    {errors.severity.message}
                  </p>
                )}
              </div>

              <div className="flex-1 grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="status"
                        className={errors.status ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Selecione o status da lesão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="recovering">
                          Em tratamento
                        </SelectItem>
                        <SelectItem value="recovered">
                          Recuperação concluída
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-sm text-red-400">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="height">Causa da Lesão</Label>
              <Input
                id="cause"
                placeholder="Ex: Trauma no tornozelo"
                {...register('cause')}
                className={errors.cause ? 'border-red-500' : ''}
              />
              {errors.cause && (
                <p className="text-sm text-red-400">{errors.cause.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expectedRecovery">
                Estimativa de Recuperação
              </Label>
              <div className="relative">
                <Input
                  id="expectedRecovery"
                  type="number"
                  placeholder="Ex: 12"
                  {...register('expectedRecovery', { valueAsNumber: true })}
                  className={`pr-16 appearance-none ${
                    errors.expectedRecovery ? 'border-red-500' : ''
                  }`}
                  style={{
                    MozAppearance: 'textfield',
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none text-sm">
                  em dias
                </span>
              </div>
              {errors.expectedRecovery && (
                <p className="text-sm text-red-400">
                  {errors.expectedRecovery.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="actualRecovery">
                Estimativa de Recuperação Atual
              </Label>
              <div className="relative">
                <Input
                  id="actualRecovery"
                  type="number"
                  placeholder="Ex: 12"
                  {...register('actualRecovery', { valueAsNumber: true })}
                  className={`pr-16 appearance-none ${
                    errors.actualRecovery ? 'border-red-500' : ''
                  }`}
                  style={{
                    MozAppearance: 'textfield',
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none text-sm">
                  em dias
                </span>
              </div>
              {errors.actualRecovery && (
                <p className="text-sm text-red-400">
                  {errors.actualRecovery.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Protocolo de Atendimento</Label>
              <Input
                id="treatmentProtocol"
                placeholder="Ex: Fisioterapia e gelo"
                {...register('treatmentProtocol')}
                className={errors.treatmentProtocol ? 'border-red-500' : ''}
              />
              {errors.treatmentProtocol && (
                <p className="text-sm text-red-400">
                  {errors.treatmentProtocol.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="injuryDate">Data da Lesão</Label>
              <Input
                id="injuryDate"
                {...register('injuryDate')}
                className={errors.injuryDate ? 'border-red-500' : ''}
              />
              {errors.injuryDate && (
                <p className="text-sm text-red-400">
                  {errors.injuryDate.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recoveryDate">Data de Recuperação</Label>
              <Input
                id="recoveryDate"
                {...register('recoveryDate')}
                className={errors.recoveryDate ? 'border-red-500' : ''}
              />
              {errors.recoveryDate && (
                <p className="text-sm text-red-400">
                  {errors.recoveryDate.message}
                </p>
              )}
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 pb-6">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            // disabled={creating || !isValid}
          >
            Salvar
            {/* {creating ? 'Salvando...' : 'Salvar'} */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InjuryRecordModalForm;
