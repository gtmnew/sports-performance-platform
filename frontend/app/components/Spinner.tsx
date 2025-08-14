import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 20, className = '' }) => {
  return <Loader2 className={`animate-spin ${className}`} size={size} />;
};

export default Spinner;
