export const getRiskLevelColor = (score: number) => {
  if (score >= 85) return 'text-red-600';
  if (score >= 70) return 'text-amber-600';
  if (score >= 50) return 'text-blue-600';
  return 'text-green-600';
};
