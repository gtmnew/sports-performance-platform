export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500 text-white font-bold border-red-500';
    case 'severe':
      return 'bg-orange-500 text-white font-bold border-orange-500';
    case 'moderate':
      return 'bg-yellow-500 text-white font-bold border-yellow-500';
    case 'minor':
      return 'bg-green-700 text-white  font-bold border-green-500';
    default:
      getSeverityColor;
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
