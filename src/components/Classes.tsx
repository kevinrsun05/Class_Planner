import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface ClassesProps {
  course: string;
  inSchedule?: boolean;
  onRemove?: (course: string) => void;
}

const Classes: React.FC<ClassesProps> = ({ course, inSchedule, onRemove }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('course', course); // Store class code when dragging
  };

  return (
    <div
      className='bg-gray-500 p-2 rounded-md text-white text-center text-sm cursor-pointer mb-3 flex justify-between items-center'
      draggable
      onDragStart={handleDragStart}
    >
      <span>{course}</span>
      {inSchedule && onRemove && (
        <IconButton size='small' onClick={() => onRemove(course)} className='ml-auto'>
          <DeleteIcon fontSize='small' className='text-white' />
        </IconButton>
      )}
    </div>
  );
};

export default Classes;
