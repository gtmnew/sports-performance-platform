export interface VitalSignPhysicalTest {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: number;
  unit: string;
  normalRange: string;
  normalMin: number;
  normalMax: number;
  color: string;
  wave: number[];
  waveColor: string;
  priority: 'high' | 'medium' | 'low';
}
