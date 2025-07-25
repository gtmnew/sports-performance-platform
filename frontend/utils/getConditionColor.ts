export const getConditionColor = (condition: string): string => {
  switch (condition) {
    case 'Excelente':
      return 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-300';
    case 'Atenção':
      return 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-300';
    case 'Preocupante':
      return 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300';
    default:
      return 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-950/20 dark:text-gray-300';
  }
};
