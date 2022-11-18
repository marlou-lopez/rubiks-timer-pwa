import React from 'react';

const StudyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <div className="flex items-center justify-between gap-2 px-6 pt-4 pb-2">
          <h1 className="text-3xl font-bold text-black dark:text-white">Study</h1>
        </div>
      </header>
      {children}
    </>
  );
};

export default StudyLayout;
