export const getStatusText = (status: string): string => {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'recovering':
      return 'Recuperando';
    case 'recovered':
      return 'Recuperado';
    default:
      return status;
  }
};
