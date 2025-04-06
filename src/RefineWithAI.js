import React, { useState } from 'react';
import { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";

import CharacterPreview from './CharacterPreview';
import ButtonPanelforAI from './ButtonPanelforAI';

// Tab icons
import eyeIcon from './assets/icons/eyes-icon.svg';
import mouthIcon from './assets/icons/lips-icon.svg';
import hairIcon from './assets/icons/comb-hair-icon.svg';
import clothesIcon from './assets/icons/tshirt-icon.svg';
import dotsIcon from './assets/icons/dots-icon.svg';

// Feature SVGs
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
import body from './assets/body.svg';

// Define available tabs and icons
const TABS = [
  { id: 'eyes', icon: eyeIcon },
  { id: 'mouth', icon: mouthIcon },
  { id: 'hair', icon: hairIcon },
  { id: 'clothes', icon: clothesIcon },
  { id: 'extra', icon: dotsIcon },
];

// Define options for each feature
const featureOptions = {
  eyes: [eyes1, eyes2, eyes3],
  mouth: [mouth1, mouth2, mouth3],
  hair: [hair1, hair2, hair3],
  clothes: [clothes1, clothes2],
  extra: [],
};

const RefineWithAI = () => {

    const previewRef = useRef();
    const [maskData, setMaskData] = useState([]);
    const [selectedMask, setSelectedMask] = useState(null);
    const location = useLocation();
    const selections = location.state?.selections;
      
    
  const [instruction, setInstruction] = useState('');
  const [features, setFeatures] = useState({
    eyes: 0,
    mouth: 0,
    hair: 0,
    clothes: 0,
  });

//   useEffect(() => {
//     // const captureAndSegment = async () => {
//     //   const canvas = await html2canvas(previewRef.current, {
//     //     useCORS: true,
//     //     backgroundColor: "#D9A2F4",
//     //     scale: 2 // for higher resolution
//     //   });
  
//     //   document.body.appendChild(canvas); 
//     //   const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
//     //   const formData = new FormData();
//     //   formData.append("file", blob, "preview.png");
  
//     //   const res = await fetch("http://localhost:8000/segment", {
//     //     method: "POST",
//     //     body: formData,
//     //   });
  
//     //   const data = await res.json();
//     //   setMaskData(data.masks);
//     // };
  
//     // captureAndSegment();
//   }, [features]);
  


return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-5xl font-bold">Refine With AI ✨</h1>
      <div className="flex gap-36 bg-[#f4f3fd] p-10 rounded-3xl shadow-lg w-[1000px]">
        
        {/* Character Preview with overlay masks */}
        <div
          ref={previewRef}
          className="relative w-[320px] h-[600px] flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
        >
          {selections && <CharacterPreview selections={selections} />}
  
          {/* Overlay clickable mask boxes */}
          {maskData.map((mask) => (
            <div
              key={mask.id}
              className={`absolute z-50 bg-blue-300/30 border-2 ${
                selectedMask?.id === mask.id ? "border-blue-500" : "border-transparent"
              } cursor-pointer`}
              onClick={() => setSelectedMask(mask)}
              style={{
                left: `${mask.bbox[0]}px`,
                top: `${mask.bbox[1]}px`,
                width: `${mask.bbox[2]}px`,
                height: `${mask.bbox[3]}px`,
              }}
            />
          ))}
        </div>
  
        {/* Instructions and Refine Button Panel */}
        <div className="flex flex-col gap-10 items-center w-[400px]">
          
          {/* Textarea for user instruction */}
          <div className="w-[500px] h-[320px] border-4 border-black rounded-xl p-4 bg-white shadow-inner">
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Describe what you'd like to change (e.g. 'Make the hair longer'), select the region you want to change, then click Refine button to refine."
              className="w-full h-full bg-transparent resize-none outline-none text-lg"
            />
          </div>
  
          {/* Refine Button */}
          <div className="flex justify-center gap-4 mt-2 w-[500px] h-[100px]">
            <ButtonPanelforAI
              features={features}
              setFeatures={setFeatures}
              selectedMask={selectedMask}
              instruction={instruction}
            />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default RefineWithAI;