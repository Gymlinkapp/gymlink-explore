import React, { useEffect, useState } from 'react';

const PromptCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentDate = new Date();
      const targetDate = new Date(
        currentDate.toISOString().split('T')[0] + 'T17:00:00.000Z'
      );

      if (currentDate > targetDate) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const timeDiff = targetDate.getTime() - currentDate.getTime();
      setTimeRemaining(timeDiff);
    };

    calculateTimeRemaining();

    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeRemaining = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='bg-dark-500 py-2 px-4 rounded-full border-2 border-dashed border-dark-400 w-fit'>
      <div className='font-ProstoOne text-tertiaryDark text-sm'>
        {formatTimeRemaining(timeRemaining)}
      </div>
    </div>
  );
};

export default PromptCountdown;
