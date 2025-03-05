import React from 'react';

interface ClassesProps {
  course: string;
}

const Classes: React.FC<ClassesProps> = ({ course }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('course', course); // Store class code when dragging
  };

  return (
    <div className='bg-gray-500 p-2 rounded-md text-white text-center text-sm cursor-pointer' draggable onDragStart={handleDragStart}>
      {course}
    </div>
  );
};

export default Classes;
