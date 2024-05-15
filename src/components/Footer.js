"use client"
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []); // memastikan useEffect hanya dijalankan 1x

  return (
    <footer className=" bg-gray-950 text-white p-1 pl-10 mt-0 text-sm">
      <p>{currentDate}</p>
    </footer>
  );
}
