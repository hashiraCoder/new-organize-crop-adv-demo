import React from 'react';

// A reusable component to wrap each screen with a title and a container.
const ScreenContainer = ({ title, children }) => {
  const logoSvg = (
    <svg className="w-16 h-16 text-green-600 animate-pulse-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8 14.8C18.8 15.6 18.4 16.4 17.8 17C17.2 17.6 16.4 18 15.6 18H8.4C7.6 18 6.8 17.6 6.2 17C5.6 16.4 5.2 15.6 5.2 14.8V12.4C5.2 11.6 5.6 10.8 6.2 10.2C6.8 9.6 7.6 9.2 8.4 9.2H15.6C16.4 9.2 17.2 9.6 17.8 10.2C18.4 10.8 18.8 11.6 18.8 12.4V14.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18V18.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.6 18L18.8 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.4 18L5.2 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9.2V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.4 9.2L5.2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.6 9.2L18.8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
    </svg>
  );

  return (
    <div className="flex-1 p-6 flex flex-col items-center min-h-screen relative z-10">
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};

export default ScreenContainer;

