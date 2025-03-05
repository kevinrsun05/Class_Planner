import React, { useEffect, useState } from 'react';
import Classes from './Classes';

interface Class {
  code: string;
  units: number;
  category: string;
}

const RequiredCourses: React.FC = () => {
  const [groupedCourses, setGroupedCourses] = useState<{ [key: string]: Class[] }>({});

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

  const categoryElements: JSX.Element[] = [];

  for (const category in groupedCourses) {
    const courseElements: JSX.Element[] = [];

    for (const course of groupedCourses[category]) {
      courseElements.push(<Classes key={course.code} course={course.code} />);
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
