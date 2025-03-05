import React from 'react';
import Classes from '@components/Classes';
import { Paper } from '@mui/material';

interface QuartersProps {
  quarter: string;
  schedule: { class_id: string }[];
}

const Quarters: React.FC<QuartersProps> = ({ quarter, schedule }) => {
  return (
    <Paper elevation={5} className='bg-gray-200 w-40 h-64 p-2'>
      <h3 className='mb-5 text-lg'>{quarter}</h3>
      {schedule.map(entry => (
        <Classes key={entry.class_id} course={entry.class_id} /> // creates a Class card for each class in the quarter
      ))}
    </Paper>
  );
};

export default Quarters;
