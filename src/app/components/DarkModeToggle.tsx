'use client';

// components/ThemeToggle.js
  import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';

  function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
      <button
        className="inline-flex items-center p-2 transition duration-300 ease-in-out rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <BiSun className="w-6 h-6 text-yellow-500" />
        ) : (
          <BiMoon className="w-6 h-6 text-gray-500" />
        )}
      </button>
    );
  }

  export default ThemeToggle;