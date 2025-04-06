// import React from 'react';

// import body from './assets/body.svg';
// import eyes1 from './assets/features/eyes/eyes1.svg';
// import eyes2 from './assets/features/eyes/eyes2.svg';
// import eyes3 from './assets/features/eyes/eyes3.svg';
// import mouth1 from './assets/features/mouth/mouth1.svg';
// import mouth2 from './assets/features/mouth/mouth2.svg';
// import mouth3 from './assets/features/mouth/mouth3.svg';
// import hair1 from './assets/features/hair/hair1.svg';
// import hair2 from './assets/features/hair/hair2.svg';
// import hair3 from './assets/features/hair/hair3.svg';
// import clothes1 from './assets/features/clothes/clothes1.svg';
// import clothes2 from './assets/features/clothes/clothes2.svg';

// const overlays = {
//   eyes: [eyes1, eyes2, eyes3],
//   mouth: [mouth1, mouth2, mouth3],
//   hair: [hair1, hair2, hair3],
//   clothes: [clothes1, clothes2],
// };

// const featureStyles = {
//   eyes : [
//     { top: '193px', left: '154px', width: '147px', height: '97px' },
//     { top: '197px', left: '160px', width: '140px', height: '90px' },
//     { top: '193px', left: '159px', width: '140px', height: '95px' },
//   ],
//   mouth: [
//     { top: '243px', left: '200px', width: '70px', height: '50px' },
//     { top: '240px', left: '200px', width: '65px', height: '45px' }, 
//     { top: '240px', left: '195px', width: '65px', height: '45px' },  
//   ],
//   hair: [
//     { top: '179px', left: '139px', width: '200px', height: '135px' },
//     { top: '165px', left: '93px', width: '270px', height: '170px' },
//     { top: '170px', left: '85px', width: '270px', height: '170px' },
//   ],
//   clothes: [
//     { top: '275px', left: '117px', width: '230px', height: '220px' },
//     { top: '269px', left: '107px', width: '240px', height: '230px' },
//   ]
// };

// const CharacterPreview = ({ features }) => {
//   return (
//     <div className="relative w-[640px] h-[840px] flex justify-center items-center">
//       <img
//         src={body}
//         alt="base"
//         className="absolute w-full h-full object-contain z-0 pointer-events-none"
//       />

//       {/* Hair */}
//       <img
//         src={overlays.hair[features.hair]}
//         alt="hair"
//         style={featureStyles.hair[features.hair]}
//         className="absolute object-contain pointer-events-none z-10"
//       />

//       {/* Eyes */}
//       <img
//         src={overlays.eyes[features.eyes]}
//         alt="eyes"
//         style={featureStyles.eyes[features.eyes]}
//         className="absolute object-contain pointer-events-none z-20"
//       />

//       {/* Mouth */}
//       <img
//         src={overlays.mouth[features.mouth]}
//         alt="mouth"
//         style={featureStyles.mouth[features.mouth]}
//         className="absolute object-contain pointer-events-none z-30"
//       />

//       {/* Clothes */}
//       <img
//       src={overlays.clothes[features.clothes]}
//       alt="clothes"
//       style={featureStyles.clothes[features.clothes]}
//       className="absolute object-contain pointer-events-none z-40"
//     />
//     </div>
//   );
// };

// export default CharacterPreview;

import React, { useState } from 'react';
import body from './assets/body.svg';
import eyes1 from './assets/features/eyes/eyes1.svg';
import eyes2 from './assets/features/eyes/eyes2.svg';
import eyes3 from './assets/features/eyes/eyes3.svg';
import mouth1 from './assets/features/mouth/mouth1.svg';
import mouth2 from './assets/features/mouth/mouth2.svg';
import mouth3 from './assets/features/mouth/mouth3.svg';
import hair1 from './assets/features/hair/hair1.svg';
import hair2 from './assets/features/hair/hair2.svg';
import hair3 from './assets/features/hair/hair3.svg';
import clothes1 from './assets/features/clothes/clothes1.svg';
import clothes2 from './assets/features/clothes/clothes2.svg';

const overlays = {
  eyes: [eyes1, eyes2, eyes3],
  mouth: [mouth1, mouth2, mouth3],
  hair: [hair1, hair2, hair3],
  clothes: [clothes1, clothes2],
};

const featureStyles = {
  eyes: [
    { top: '193px', left: '154px', width: '147px', height: '97px' },
    { top: '197px', left: '160px', width: '140px', height: '90px' },
    { top: '193px', left: '159px', width: '140px', height: '95px' },
  ],
  mouth: [
    { top: '243px', left: '200px', width: '70px', height: '50px' },
    { top: '240px', left: '200px', width: '65px', height: '45px' },
    { top: '240px', left: '195px', width: '65px', height: '45px' },
  ],
  hair: [
    { top: '179px', left: '139px', width: '200px', height: '135px' },
    { top: '165px', left: '93px', width: '270px', height: '170px' },
    { top: '170px', left: '85px', width: '270px', height: '170px' },
  ],
  clothes: [
    { top: '275px', left: '117px', width: '230px', height: '220px' },
    { top: '269px', left: '107px', width: '240px', height: '230px' },
  ],
};

const CharacterPreview = ({ features, onAreaSelect }) => {
  const [start, setStart] = useState(null);
  const [rect, setRect] = useState(null);

  const handleMouseDown = (e) => {
    const box = e.currentTarget.getBoundingClientRect();
    setStart({ x: e.clientX - box.left, y: e.clientY - box.top });
  };

  const handleMouseMove = (e) => {
    if (!start) return;
    const box = e.currentTarget.getBoundingClientRect();
    const current = { x: e.clientX - box.left, y: e.clientY - box.top };
    setRect({
      x: Math.min(current.x, start.x),
      y: Math.min(current.y, start.y),
      width: Math.abs(current.x - start.x),
      height: Math.abs(current.y - start.y),
    });
  };

  const handleMouseUp = () => {
    if (rect) {
      onAreaSelect?.(rect);
    }
    setStart(null);
  };

  return (
    <div
      className="relative w-[640px] h-[840px] flex justify-center items-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src={body} alt="base" className="absolute w-full h-full object-contain z-0 pointer-events-none" />

      <img src={overlays.hair[features.hair]} alt="hair" style={featureStyles.hair[features.hair]} className="absolute object-contain pointer-events-none z-10" />
      <img src={overlays.eyes[features.eyes]} alt="eyes" style={featureStyles.eyes[features.eyes]} className="absolute object-contain pointer-events-none z-20" />
      <img src={overlays.mouth[features.mouth]} alt="mouth" style={featureStyles.mouth[features.mouth]} className="absolute object-contain pointer-events-none z-30" />
      <img src={overlays.clothes[features.clothes]} alt="clothes" style={featureStyles.clothes[features.clothes]} className="absolute object-contain pointer-events-none z-40" />

      {rect && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-200/30 z-50"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
          }}
        />
      )}
    
    </div>
  );
};

export default CharacterPreview;
