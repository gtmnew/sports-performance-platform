export const getStatusColor = (
  status: 'active' | 'recovering' | 'recovered'
): string => {
  switch (status) {
    case 'active':
      return 'bg-red-100 text-red-800 border-red-500 dark:bg-transparent dark:text-red-500';
    case 'recovering':
      return 'bg-yellow-100 text-yellow-800 border-yellow-500 dark:bg-transparent dark:text-yellow-500';
    case 'recovered':
      return 'bg-green-100 text-green-800 border-green-500 dark:bg-transparent dark:text-green-500';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-100';
  }
};
