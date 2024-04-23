'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Gradient() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (theme === 'dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [theme]);

  return (
    <div>
      {isDark ? (
        <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_115%_at_50%_10%,#000_60%,#135A13_100%)]'></div>
      ) : (
        <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(115%_115%_at_50%_10%,#fff_60%,#00FF99_100%)]'></div>
      )}
    </div>
  );
}

// Dark Mode: 1st color: black: #000 and 2nd color is dark green #135A13
// Light Mode: 1st color: white #FFF and 2nd color is light green #00FF99
