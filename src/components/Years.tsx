import React, { useEffect, useState } from 'react';
import Quarters from '@components/Quarters';

interface YearsProps {
  year: number;
  onCourseAdded: (courseId: string) => void;
}

interface ScheduleEntry {
  id: number;
  class_id: string;
  year: number;
  quarter: string;
}

const Years: React.FC<YearsProps> = ({ year, onCourseAdded }) => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  // Fetch schedule data for the year when it changes
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('http://localhost:3001/schedule');
        const data = await response.json();
        setSchedule(data.filter((entry: ScheduleEntry) => entry.year === year));
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [year]);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, quarter: string) => {
    e.preventDefault();
    const class_id = e.dataTransfer.getData('course'); // Get dragged class ID
    if (!class_id) return;

    // Posts class into schedule table when dropped into quarter
    try {
      const response = await fetch('http://localhost:3001/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ class_id, year, quarter }),
      });

      if (!response.ok) {
        throw new Error('Failed to add class to schedule');
      }

      // Add new entry to schedule so it updates in UI
      const newEntry = await response.json();
      setSchedule(prevSchedule => [...prevSchedule, newEntry]);

      onCourseAdded(class_id);

      console.log(`Added ${class_id} to Year ${year}, ${quarter}`);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  // allows to be valid drop target
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); //prevents default browser behavior (blocks drops)
  };

  return (
    <div>
      <h1 className='text-2xl mb-5'>YEAR {year}</h1>
      <div className='flex flex-row'>
        <div onDrop={e => handleDrop(e, 'Fall')} onDragOver={handleDragOver}>
          <Quarters quarter={'Fall'} schedule={schedule.filter(entry => entry.quarter === 'Fall')} />
        </div>
        <div className='flex flex-row flex-grow justify-evenly'>
          <div onDrop={e => handleDrop(e, 'Winter')} onDragOver={handleDragOver}>
            <Quarters quarter={'Winter'} schedule={schedule.filter(entry => entry.quarter === 'Winter')} />
          </div>
          <div onDrop={e => handleDrop(e, 'Spring')} onDragOver={handleDragOver}>
            <Quarters quarter={'Spring'} schedule={schedule.filter(entry => entry.quarter === 'Spring')} />
          </div>
          <div onDrop={e => handleDrop(e, 'Summer')} onDragOver={handleDragOver}>
            <Quarters quarter={'Summer'} schedule={schedule.filter(entry => entry.quarter === 'Summer')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Years;
