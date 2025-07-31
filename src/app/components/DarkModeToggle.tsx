'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode') === 'true';
    setIsDark(saved);
    if (saved) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('dark-mode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggle}
      className="text-gray-700 dark:text-gray-300 hover:underline text-sm"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}