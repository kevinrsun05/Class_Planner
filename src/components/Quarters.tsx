import React from 'react';
import Classes from '@components/Classes';
import { Paper } from '@mui/material';

interface QuartersProps {
  quarter: string;
  schedule: { class_id: string }[];
  onRemove: (classId: string) => void;
}

const Quarters: React.FC<QuartersProps> = ({ quarter, schedule, onRemove }) => {
  const sortedSchedule = [...schedule].sort((a, b) => a.class_id.localeCompare(b.class_id)); // Sort classes
  return (
    <Paper elevation={5} className='bg-gray-200 w-48 h-80 p-2'>
      <h3 className='mb-5 text-lg'>{quarter}</h3>
      {sortedSchedule.map(entry => (
        <Classes key={entry.class_id} course={entry.class_id} inSchedule onRemove={onRemove} /> // creates a Class card for each class in the quarter
      ))}
    </Paper>
  );
};

export default Quarters;
