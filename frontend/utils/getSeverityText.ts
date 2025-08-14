export const getSeverityText = (severity: string): string => {
  switch (severity) {
    case 'minor':
      return 'Baixa';
    case 'moderate':
      return 'Média';
    case 'severe':
      return 'Alta';
    case 'critical':
      return 'Crítica';
    default:
      return severity;
  }
};
