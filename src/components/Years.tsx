import React from 'react';
import Quarters from '@components/Quarters';

interface YearsProps {
  year: number;
}

const Years: React.FC<YearsProps> = ({ year }) => {
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, quarter: string) => {
    e.preventDefault();
    const class_id = e.dataTransfer.getData('course'); // Get dragged class ID
    if (!class_id) return;

    try {
      const response = await fetch('http://localhost:3001/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id, year, quarter }),
      });

      if (!response.ok) {
        throw new Error('Failed to add class to schedule');
      }

      console.log(`Added ${class_id} to Year ${year}, ${quarter}`);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className='text-2xl mb-5'>YEAR {year}</h1>
      <div className='flex flex-row'>
        <div onDrop={e => handleDrop(e, 'Fall')} onDragOver={handleDragOver}>
          <Quarters quarter={'Fall'} />
        </div>
        <div className='flex flex-row flex-grow justify-evenly'>
          <div onDrop={e => handleDrop(e, 'Winter')} onDragOver={handleDragOver}>
            <Quarters quarter={'Winter'} />
          </div>
          <div onDrop={e => handleDrop(e, 'Spring')} onDragOver={handleDragOver}>
            <Quarters quarter={'Spring'} />
          </div>
          <div onDrop={e => handleDrop(e, 'Summer')} onDragOver={handleDragOver}>
            <Quarters quarter={'Summer'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Years;
