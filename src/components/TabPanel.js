"use client"
import { useState } from 'react';

export default function TabPanel({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {children.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-gray-950' : ''}`} //style untuk panel yang aktif dengan garis dibawahnya
            onClick={() => setActiveTab(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="p-1">{children[activeTab]}</div>
    </div>
  );
}
