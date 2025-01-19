import React from 'react';
import Classes from '@components/Classes';

interface QuartersProps {
  quarter: string;
}

const Quarters: React.FC<QuartersProps> = ({ quarter }) => {
  return (
    <div className='bg-gray-200 w-40 h-64 p-2'>
      <h3 className='mb-5'>{quarter}</h3>
      <Classes course='' />
      <Classes course='hello' />
    </div>
  );
};

export default Quarters;
