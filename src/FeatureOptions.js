import React from 'react';

const FeatureOptions = ({ options = [], selected, onSelect }) => {
  return (
    <div className="flex justify-center">
      <div className="border-4 border-black rounded-[40px] px-12 py-10 bg-[#F5F1FA] flex gap-8 flex-wrap justify-center items-center min-w-[500px] min-h-[200px]">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-[100px] h-[100px] rounded-2xl flex justify-center items-center transition-all cursor-pointer border-4 ${
              selected === index
                ? 'border-accentYellow bg-[#FFFBEF]'
                : 'border-[#e2d9f3] bg-white hover:border-gray-300'
            }`}
          >
            <img src={opt} alt={`option-${index}`} className="w-[70%] h-[70%] object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureOptions;
