// import React from 'react';

const CharacterPreview = ({ selections }) => {
  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Skin - base layer */}
      <img
        src={selections.skin}
        alt="skin"
        className="absolute w-full h-full object-contain z-0 scale-150 pointer-events-none"
      />
      {/* Clothes */}
      <img
        src={selections.clothes}
        alt="clothes"
        className="absolute w-full h-full object-contain z-10 scale-150 pointer-events-none"
      />
      {/* Hair */}
      <img
        src={selections.hair}
        alt="hair"
        className="absolute w-full h-full object-contain z-20 scale-150 pointer-events-none"
      />
      {/* Eyes */}
      <img
        src={selections.eyes}
        alt="eyes"
        className="absolute w-full h-full object-contain z-30 scale-150 pointer-events-none"
      />
      {/* Mouth */}
      <img
        src={selections.mouth}
        alt="mouth"
        className="absolute w-full h-full object-contain z-40 scale-150 pointer-events-none"
      />
      {/* Accessories */}
      <img
        src={selections.accessories}
        alt="accessories"
        className="absolute w-full h-full object-contain z-50 scale-150 pointer-events-none"
      />
    </div>
  );
};

export default CharacterPreview;
