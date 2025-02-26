import React from 'react';

interface ClassesProps {
  course: string;
}

const Classes: React.FC<ClassesProps> = ({ course }) => {
  return <div className='bg-gray-500 p-2 rounded-md text-white text-center text-sm'>{course}</div>;
};

export default Classes;
