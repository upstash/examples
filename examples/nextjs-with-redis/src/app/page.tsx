"use client"
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState({
    success: true,
    count: 0,
    lastCalled: 'Never',
  });
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const res = await fetch('/api/increment');
      const data = await res.json();

      if (data.success) {
        setStatus(data);
        setMessage('');
      } else {
        setMessage(data.message || 'Error fetching data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setStatus({
        success: false,
        count: 0,
        lastCalled: 'Unknown',
      });
      setMessage('Error fetching data. Please check the environment variables.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-1/3 text-center">
        <p className="text-lg">This app now tracks API calls using Redis.</p>
        <p className="text-lg">Click the button below to call the API and get the call count and last called time.</p>
        <p className="text-lg pt-5">{message}</p>
      </div>

      <div className="absolute top-1/2 grid grid-cols-3 gap-8 justify-center transform -translate-y-1/2">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="text-center w-32">
            <div className="font-semibold">{key}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-1/3">
        <button
          onClick={handleClick}
          className="bg-[#dee2e3] hover:bg-[#9aa6a9] transition border-black text-[#5a6769] font-semibold py-2 px-4 rounded-lg"
        >
          Call API
        </button>
      </div>
    </div>
  );
}
