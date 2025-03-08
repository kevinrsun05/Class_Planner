import React, { useEffect, useState } from 'react';
import Classes from './Classes';

interface Class {
  code: string;
  units: number;
  category: string;
}

interface RequiredCoursesProps {
  selectedCourses: Set<string>; // To deal with drag and drog
}

const RequiredCourses: React.FC<RequiredCoursesProps> = ({ selectedCourses }) => {
  const [groupedCourses, setGroupedCourses] = useState<{ [key: string]: Class[] }>({});
  const [inSchedule, setInSchedule] = useState<Set<string>>(new Set()); // To deal with refresh screen

  // fetch classes data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:3001/classes');
        const data = await response.json();

        // Group courses by category
        const grouped: { [key: string]: Class[] } = {};

        for (const course of data) {
          if (!grouped[course.category]) {
            grouped[course.category] = [];
          }
          grouped[course.category].push(course);
        }

        setGroupedCourses(grouped);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };

    fetchClasses();
  }, []);

  // fetch schedule data
  useEffect(() => {
    const fetchScheduledClasses = async () => {
      try {
        const response = await fetch('http://localhost:3001/schedule'); // Fetch scheduled classes
        const data = await response.json();

        const scheduledSet: Set<string> = new Set(data.map((cls: { class_id: string }) => cls.class_id));
        setInSchedule(scheduledSet);
      } catch (err) {
        console.error('Error fetching scheduled classes:', err);
      }
    };

    fetchScheduledClasses();
  }, []);

  const categoryElements: JSX.Element[] = [];

  for (const category in groupedCourses) {
    const courseElements: JSX.Element[] = [];

    const sortedCourses = groupedCourses[category].sort((a, b) => a.code.localeCompare(b.code));

    for (const course of sortedCourses) {
      if (!selectedCourses.has(course.code) && !inSchedule.has(course.code)) {
        courseElements.push(<Classes key={course.code} course={course.code} />);
      }
    }

    categoryElements.push(
      <div key={category} className='mb-8 '>
        <h4 className='font-bold text-base mb-2'>{category}</h4>
        <div className='space-y-2'>{courseElements}</div>
      </div>,
    );
  }

  return (
    <div className='w-1/5 border-r-2 border-black p-4'>
      <h3 className='text-blue-500 text-xl mb-8'>Required Coursework</h3>
      <hr className='border-t-2 border-black mb-8' />
      {categoryElements}
    </div>
  );
};

export default RequiredCourses;
