export const getSeverityText = (severity: string): string => {
  switch (severity) {
    case 'low':
      return 'Baixa';
    case 'medium':
      return 'Média';
    case 'high':
      return 'Alta';
    case 'critical':
      return 'Crítica';
    default:
      return severity;
  }
};
