import React from 'react';

const FeatureTab = ({ selected, onSelect }) => {
  return (
    <div className="flex space-x-3 mb-4 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`text-2xl p-3 rounded-lg border-4 transition-all ${
            selected === tab.id
              ? 'bg-accentYellow border-yellow-500'
              : 'bg-white border-gray-300 hover:bg-gray-100'
          }`}          
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
};

export default FeatureTab;