'use client';

import { useEffect } from 'react';

export default function DarkModeScript() {
  useEffect(() => {
    const html = document.documentElement;
    const saved = localStorage.getItem('dark-mode');

    const enableDarkMode = saved ? saved === 'true' : false;

    if (enableDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Optional: sync with system preference on first visit
    // if (saved === null) {
    //   const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //   if (systemPrefersDark) html.classList.add('dark');
    // }

  }, []);

  return null;
}