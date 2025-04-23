import React from 'react';

const stylePerFeature = {
  skin: {
    container: 'w-[160px] h-[160px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: {},
  },
  clothes: {
    container: 'w-[120px] h-[120px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: { transform: 'scale(1.5) translateX(1px) translateY(-10px)' },
  },
  mouth: {
    container: 'w-[120px] h-[120px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: { transform: 'scale(11) translateX(1px) translateY(26.5px)' },
  },
  eyes: {
    container: 'w-[120px] h-[120px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: { transform: 'scale(9) translateX(1px) translateY(30px)' },
  },
  hair: {
    container: 'w-[120px] h-[120px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: { transform: 'scale(4) translateX(1px) translateY(30px)' },
  },
  accessories: {
    container: 'w-[120px] h-[120px] flex justify-center items-center rounded-2xl overflow-hidden',
    image: 'w-[80%] h-[80%] object-contain',
    style: { transform: 'scale(4) translateX(1px) translateY(30px)' },
  },
};

const FeatureOptions = ({ options = [], selected, onSelect, featureType }) => {
  const { container, image, style } = stylePerFeature[featureType] || stylePerFeature.skin;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-5/6 h-[500px] border-4 border-black rounded-[40px] px-12 py-10 bg-[#F5F1FA] grid grid-cols-3 gap-8 min-h-[200px]">   
        
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`flex justify-center items-center rounded-2xl transition-all cursor-pointer border-4 ${
              selected === index
                ? 'border-accentYellow bg-[#FFFBEF]'
                : 'border-[#e2d9f3] bg-white hover:border-gray-300'
            }`}
          >
            <div className={container}>
              <img
                src={opt}
                alt={`option-${index}`}
                className={image}
                style={style}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeatureOptions;