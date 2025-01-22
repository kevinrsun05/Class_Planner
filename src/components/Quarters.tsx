import React from 'react';
import Classes from '@components/Classes';
import { Paper } from '@mui/material';

interface QuartersProps {
  quarter: string;
}

const Quarters: React.FC<QuartersProps> = ({ quarter }) => {
  return (
    <Paper elevation={5} className='bg-gray-200 w-40 h-64 p-2'>
      <h3 className='mb-5 text-lg'>{quarter}</h3>
    </Paper>
  );
};

export default Quarters;
