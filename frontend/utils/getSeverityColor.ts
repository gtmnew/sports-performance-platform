export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      getSeverityColor;
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
