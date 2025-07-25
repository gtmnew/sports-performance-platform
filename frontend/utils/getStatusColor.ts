export const getStatusColor = (
  status: 'active' | 'recovering' | 'recovered'
): string => {
  switch (status) {
    case 'active':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
    case 'recovering':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
    case 'recovered':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-100';
  }
};
