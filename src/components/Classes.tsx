import React from 'react';

interface ClassesProps {
  course: string;
}

const Classes: React.FC<ClassesProps> = ({ course }) => {
  return <div className='bg-gray-500'>{course}</div>;
};

export default Classes;
