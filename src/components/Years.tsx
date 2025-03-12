import React, { useEffect, useState } from 'react';
import Quarters from '@components/Quarters';

interface YearsProps {
  year: number;
  onCourseAdded: (courseId: string) => void;
  onCourseRemoved: (courseId: string) => void;
}

interface ScheduleEntry {
  id: number;
  class_id: string;
  year: number;
  quarter: string;
}

const Years: React.FC<YearsProps> = ({ year, onCourseAdded, onCourseRemoved }) => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);

  // Fetch schedule data for the year when it changes
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('http://localhost:3001/schedule');
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [schedule]);

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
      // Move class from quarter to quarter
      if (!response.ok) {
        const updateResponse = await fetch('http://localhost:3001/schedule', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ class_id, newYear: year, newQuarter: quarter }), // 🔹 Send correct year!
        });
        if (!updateResponse.ok) {
          throw new Error('Failed to move class to new year/quarter');
        }
        const updatedEntry = await updateResponse.json();

        setSchedule(prevSchedule => {
          return prevSchedule
            .filter(course => course.class_id !== class_id) // Remove old class
            .concat(updatedEntry); // Add updated class
        });
      } else {
        // Add new entry to schedule so it updates in UI
        const newEntry = await response.json();
        setSchedule(prevSchedule => [...prevSchedule, newEntry]);
      }

      onCourseAdded(class_id); // Add to selected courses to deal with drag and drop dissapear

      console.log(`Added ${class_id} to Year ${year}, ${quarter}`);
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  // allows to be valid drop target
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); //prevents default browser behavior (blocks drops)
  };

  // remove class from schedule
  const handleRemoveClass = async (class_id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/schedule/${class_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove class');
      }
      // Remove the class from the local state
      setSchedule(prevSchedule => prevSchedule.filter(course => course.class_id !== class_id));
      onCourseRemoved(class_id);
      console.log(`Removed ${class_id} from schedule`);
    } catch (error) {
      console.error('Error removing class:', error);
    }
  };

  return (
    <div>
      <h1 className='text-2xl mb-5'>YEAR {year}</h1>
      <div className='flex flex-row'>
        <div onDrop={e => handleDrop(e, 'Fall')} onDragOver={handleDragOver}>
          <Quarters
            quarter={'Fall'}
            schedule={schedule.filter(entry => entry.year == year && entry.quarter === 'Fall')}
            onRemove={handleRemoveClass}
          />
        </div>
        <div className='flex flex-row flex-grow justify-evenly'>
          <div onDrop={e => handleDrop(e, 'Winter')} onDragOver={handleDragOver}>
            <Quarters
              quarter={'Winter'}
              schedule={schedule.filter(entry => entry.year == year && entry.quarter === 'Winter')}
              onRemove={handleRemoveClass}
            />
          </div>
          <div onDrop={e => handleDrop(e, 'Spring')} onDragOver={handleDragOver}>
            <Quarters
              quarter={'Spring'}
              schedule={schedule.filter(entry => entry.year == year && entry.quarter === 'Spring')}
              onRemove={handleRemoveClass}
            />
          </div>
          <div onDrop={e => handleDrop(e, 'Summer')} onDragOver={handleDragOver}>
            <Quarters
              quarter={'Summer'}
              schedule={schedule.filter(entry => entry.year == year && entry.quarter === 'Summer')}
              onRemove={handleRemoveClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Years;
