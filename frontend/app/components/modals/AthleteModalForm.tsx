import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RiskLevelEnum } from "@/enums/RiskLevelEnum";
import { ScrollArea } from "@/components/ui/scroll-area";

type AthleteModalFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AthleteModalForm({
  open,
  onOpenChange,
}: AthleteModalFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <form className="grid gap-4 pb-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" placeholder="Ex: Gabriel" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Posição</Label>
              <Input id="position" name="position" placeholder="Ex: Atacante" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Idade</Label>
              <Input id="age" name="age" type="number" placeholder="Ex: 31" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="Ex: 171"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                placeholder="Ex: 94"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Time</Label>
              <Input id="team" name="team" placeholder="Ex: Corinthians" />
            </div>

            <div className="flex items-center gap-2">
              <Switch id="isActive" />
              <Label htmlFor="isActive">Ativo</Label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="riskLevel">Nível de risco</Label>
              <Select name="riskLevel">
                <SelectTrigger id="riskLevel">
                  <SelectValue placeholder="Selecione o nível de risco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={RiskLevelEnum.LOW}>Baixo</SelectItem>
                  <SelectItem value={RiskLevelEnum.MEDIUM}>Médio</SelectItem>
                  <SelectItem value={RiskLevelEnum.HIGH}>Alto</SelectItem>
                  <SelectItem value={RiskLevelEnum.CRITICAL}>
                    Crítico
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="biomechanicsProfile">Perfil biomecânico</Label>
              <Input
                id="biomechanicsProfile"
                name="biomechanicsProfile"
                placeholder="Ex: asymetry"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentInjuries">Lesões atuais</Label>
              <Input
                id="currentInjuries"
                name="currentInjuries"
                placeholder="Ex: back"
              />
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="px-6 pb-6">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
