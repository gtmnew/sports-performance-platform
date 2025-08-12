import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  CreateAthleteFormData,
  createAthleteSchema,
} from '@/app/schemas/create_athlete';
import { useCreateAthlete } from '@/hooks/useAthlete';

type AthleteModalFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AthleteModalForm({
  open,
  onOpenChange,
}: AthleteModalFormProps) {
  const { mutateAsync: createAthlete, error: createError } = useCreateAthlete();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateAthleteFormData>({
    resolver: zodResolver(createAthleteSchema),
    mode: 'onChange',
    // defaultValues: {
    //   name: '',
    //   position: '',
    //   age: 0,
    //   height: 0,
    //   weight: 0,
    //   team: '',
    //   isActive: true,
    //   biomechanicsProfile: '',
    //   currentInjuries: '',
    // },
  });

  const onSubmit: SubmitHandler<CreateAthleteFormData> = async (data) => {
    try {
      await createAthlete(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar atleta:', error);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] bg-zinc-800 text-zinc-100 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-semibold">
            Novo Atleta
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Preencha os dados para cadastrar um novo atleta.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 pb-4">
            {createError && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 dark:text-red-300">
                  {createError instanceof Error
                    ? createError.message
                    : String(createError)}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                placeholder="Ex: Gabriel"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Posição *</Label>
              <Input
                id="position"
                placeholder="Ex: Atacante"
                {...register('position')}
                className={errors.position ? 'border-red-500' : ''}
              />
              {errors.position && (
                <p className="text-sm text-red-400">
                  {errors.position.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 31"
                {...register('age', { valueAsNumber: true })}
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && (
                <p className="text-sm text-red-400">{errors.age.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="height">Altura (cm) *</Label>
              <Input
                id="height"
                type="number"
                placeholder="Ex: 171"
                {...register('height', { valueAsNumber: true })}
                className={errors.height ? 'border-red-500' : ''}
              />
              {errors.height && (
                <p className="text-sm text-red-400">{errors.height.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weight">Peso (kg) *</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 94"
                {...register('weight', { valueAsNumber: true })}
                className={errors.weight ? 'border-red-500' : ''}
              />
              {errors.weight && (
                <p className="text-sm text-red-400">{errors.weight.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Time *</Label>
              <Input
                id="team"
                placeholder="Ex: Corinthians"
                {...register('team')}
                className={errors.team ? 'border-red-500' : ''}
              />
              {errors.team && (
                <p className="text-sm text-red-400">{errors.team.message}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isActive">Ativo</Label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="riskLevel">Nível de risco *</Label>
              <Controller
                name="riskLevel"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="riskLevel"
                      className={errors.riskLevel ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Selecione o nível de risco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixo</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="high">Alto</SelectItem>
                      <SelectItem value="critical">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.riskLevel && (
                <p className="text-sm text-red-400">
                  {errors.riskLevel.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="biomechanicsProfile">Perfil biomecânico</Label>
              <Input
                id="biomechanicsProfile"
                placeholder="Ex: asymetry"
                {...register('biomechanicsProfile')}
                className={errors.biomechanicsProfile ? 'border-red-500' : ''}
              />
              {errors.biomechanicsProfile && (
                <p className="text-sm text-red-400">
                  {errors.biomechanicsProfile.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentInjuries">Lesões atuais</Label>
              <Input
                id="currentInjuries"
                placeholder="Ex: back"
                {...register('currentInjuries')}
                className={errors.currentInjuries ? 'border-red-500' : ''}
              />
              {errors.currentInjuries && (
                <p className="text-sm text-red-400">
                  {errors.currentInjuries.message}
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
            disabled={!isValid}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
