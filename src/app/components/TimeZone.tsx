'use client';

import { useState, useEffect } from 'react';

export default function SouthAfricaTimezone() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const southAfricaTime = now.toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
      setCurrentTime(southAfricaTime);
      setLoading(false);
    };

    updateTime();
    
    // Update time every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        padding: '1.5rem', 
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <p>Loading timezone...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        borderRadius: '8px',
      }}>
        <p style={{ 
          fontSize: '1.1rem',
          margin: '0 0 0.5rem 0',
          color: '#fff',
          fontWeight: '500'
        }}>
          📍 Based in South Africa (SAST)
        </p>
        
        <p style={{ 
          fontSize: '1rem',
          margin: '0',
          color: '#fff'
        }}>
          Current local time: {currentTime}
        </p>
      </div>
    </div>
  );
}