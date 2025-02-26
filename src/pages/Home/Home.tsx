import React from 'react';
import Years from '@components/Years';
import RequiredCourses from '@components/RequiredCourses';

const Home = () => {
  return (
    <div className='p-4'>
      <h1 className='p-4'>Navbar</h1>
      <div className='flex flex-row p-4 gap-x-4'>
        <RequiredCourses />
        <div className='flex flex-col flex-grow'>
          <h1 className='flex justify-center text-4xl font-extrabold mb-10'>Computer Science 4-Year Plan</h1>
          <div className='space-y-20'>
            <Years year={1} />
            <Years year={2} />
            <Years year={3} />
            <Years year={4} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
