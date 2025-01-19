import React from 'react';
import Quarters from '@components/Quarters';

interface YearsProps {
  year: number;
}

const Years: React.FC<YearsProps> = ({ year }) => {
  return (
    <div>
      <h1 className='text-2xl mb-5'>YEAR {year}</h1>
      <div className='flex flex-row flex-grow justify-evenly'>
        <Quarters quarter={'Fall'} />
        <Quarters quarter={'Winter'} />
        <Quarters quarter={'Spring'} />
        <Quarters quarter={'Summer'} />
      </div>
    </div>
  );
};

export default Years;
