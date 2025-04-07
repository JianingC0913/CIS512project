// import React, { useState } from 'react';
// import { useEffect, useRef } from "react";
// import { useLocation } from 'react-router-dom';
// import html2canvas from "html2canvas";

// import CharacterPreview from './CharacterPreview';
// import ButtonPanelforAI from './ButtonPanelforAI';


// const RefineWithAI = () => {

//     const previewRef = useRef();
//     const [maskData, setMaskData] = useState([]);
//     const [selectedMask, setSelectedMask] = useState(null);
//     const location = useLocation();
//     const selections = location.state?.selections;
      
    
//   const [instruction, setInstruction] = useState('');
//   const [features, setFeatures] = useState({
//     eyes: 0,
//     mouth: 0,
//     hair: 0,
//     clothes: 0,
//   });


// return (
//     <div className="flex flex-col items-center gap-8 p-8">
//       <h1 className="text-5xl font-bold">Refine With AI ✨</h1>
//       <div className="flex gap-36 bg-[#f4f3fd] p-10 rounded-3xl shadow-lg w-[1000px]">
        
//         {/* Character Preview with overlay masks */}
//         <div
//           ref={previewRef}
//           className="relative w-[320px] h-[600px] flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
//         >
//           {selections && <CharacterPreview selections={selections} />}
//           <canvas
//             id="mask-canvas"
//             width={320}
//             height={600}
//             className="absolute top-0 left-0 z-50 pointer-events-none"
//             />

  
//           {/* Overlay clickable mask boxes */}
          



//         </div>
  
//         {/* Instructions and Refine Button Panel */}
//         <div className="flex flex-col gap-10 items-center w-[400px]">
          
//           {/* Textarea for user instruction */}
//           <div className="w-[500px] h-[320px] border-4 border-black rounded-xl p-4 bg-white shadow-inner">
//             <textarea
//               value={instruction}
//               onChange={(e) => setInstruction(e.target.value)}
//               placeholder="Describe what you'd like to change (e.g. 'Make the hair longer'), select the region you want to change, then click Refine button to refine."
//               className="w-full h-full bg-transparent resize-none outline-none text-lg"
//             />
//           </div>
  
//           {/* Refine Button */}
//           <div className="flex justify-center gap-4 mt-2 w-[500px] h-[100px]">
//             <ButtonPanelforAI
//               features={features}
//               setFeatures={setFeatures}
//               selectedMask={selectedMask}
//               instruction={instruction}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default RefineWithAI;


// RefineWithAI.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import html2canvas from "html2canvas";
// import CharacterPreview from "./CharacterPreview";
// import ButtonPanelforAI from "./ButtonPanelforAI";

// const RefineWithAI = () => {
//   const previewRef = useRef();
//   const [instruction, setInstruction] = useState("");
//   const [features, setFeatures] = useState({ eyes: 0, mouth: 0, hair: 0, clothes: 0 });
//   const location = useLocation();
//   const selections = location.state?.selections;

//   const [selectionBox, setSelectionBox] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const startPoint = useRef(null);

//   const handleMouseDown = (e) => {
//     const rect = previewRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     startPoint.current = { x, y };
//     setSelectionBox({ x, y, width: 0, height: 0 });
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const rect = previewRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const startX = startPoint.current.x;
//     const startY = startPoint.current.y;
//     setSelectionBox({
//       x: Math.min(x, startX),
//       y: Math.min(y, startY),
//       width: Math.abs(x - startX),
//       height: Math.abs(y - startY),
//     });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleRefine = async () => {
//     if (!selectionBox || !previewRef.current) return;

//     const canvas = await html2canvas(previewRef.current, { backgroundColor: "#D9A2F4", scale: 2 });
//     const croppedCanvas = document.createElement("canvas");
//     const ctx = croppedCanvas.getContext("2d");

//     croppedCanvas.width = selectionBox.width * 2;
//     croppedCanvas.height = selectionBox.height * 2;

//     ctx.drawImage(
//       canvas,
//       selectionBox.x * 2, selectionBox.y * 2,
//       selectionBox.width * 2, selectionBox.height * 2,
//       0, 0,
//       selectionBox.width * 2, selectionBox.height * 2
//     );

//     const blob = await new Promise((res) => croppedCanvas.toBlob(res, "image/png"));
//     const formData = new FormData();
//     formData.append("file", blob, "region.png");
//     formData.append("instruction", instruction);

//     const response = await fetch("http://localhost:8000/refine", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.blob();
//     const imageURL = URL.createObjectURL(result);
//     window.open(imageURL, "_blank");
//   };

//   return (
//     <div className="flex flex-col items-center gap-8 p-8">
//       <h1 className="text-5xl font-bold">Refine With AI ✨</h1>
//       <div className="flex gap-36 bg-[#f4f3fd] p-10 rounded-3xl shadow-lg w-[1000px]">
//         <div
//           ref={previewRef}
//           className="relative w-[320px] h-[600px] flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           {selections && <CharacterPreview selections={selections} />}

//           {selectionBox && (
//             <div
//               className="absolute border-2 border-blue-500 bg-blue-200/20 z-50"
//               style={{
//                 left: selectionBox.x,
//                 top: selectionBox.y,
//                 width: selectionBox.width,
//                 height: selectionBox.height,
//               }}
//             ></div>
//           )}
//         </div>

//         <div className="flex flex-col gap-10 items-center w-[400px]">
//           <div className="w-[500px] h-[320px] border-4 border-black rounded-xl p-4 bg-white shadow-inner">
//             <textarea
//               value={instruction}
//               onChange={(e) => setInstruction(e.target.value)}
//               placeholder="Describe what you'd like to change (e.g. 'Make the hair longer')"
//               className="w-full h-full bg-transparent resize-none outline-none text-lg"
//             />
//           </div>

//           <div className="flex justify-center gap-4 mt-2 w-[500px] h-[100px]">
//             <ButtonPanelforAI
//               features={features}
//               setFeatures={setFeatures}
//               instruction={instruction}
//               onClick={handleRefine}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RefineWithAI;



// RefineWithAI.jsx
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import CharacterPreview from "./CharacterPreview";
import ButtonPanelforAI from "./ButtonPanelforAI";

const RefineWithAI = () => {
  const previewRef = useRef();
  const [instruction, setInstruction] = useState("");
  const [features, setFeatures] = useState({ eyes: 0, mouth: 0, hair: 0, clothes: 0 });
  const location = useLocation();
  const selections = location.state?.selections;

  const [selectionBox, setSelectionBox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const startPoint = useRef(null);

  const handleMouseDown = (e) => {
    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startPoint.current = { x, y };
    setSelectionBox({ x, y, width: 0, height: 0 });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const startX = startPoint.current.x;
    const startY = startPoint.current.y;
    setSelectionBox({
      x: Math.min(x, startX),
      y: Math.min(y, startY),
      width: Math.abs(x - startX),
      height: Math.abs(y - startY),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRefine = async () => {
    if (!selectionBox || !previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { backgroundColor: "#D9A2F4", scale: 2 });
    const croppedCanvas = document.createElement("canvas");
    const ctx = croppedCanvas.getContext("2d");

    croppedCanvas.width = selectionBox.width * 2;
    croppedCanvas.height = selectionBox.height * 2;

    ctx.drawImage(
      canvas,
      selectionBox.x * 2, selectionBox.y * 2,
      selectionBox.width * 2, selectionBox.height * 2,
      0, 0,
      selectionBox.width * 2, selectionBox.height * 2
    );

    const blob = await new Promise((res) => croppedCanvas.toBlob(res, "image/png"));
    const formData = new FormData();
    formData.append("file", blob, "region.png");
    formData.append("instruction", instruction);

    const response = await fetch("http://localhost:8000/refine", {
      method: "POST",
      body: formData,
    });

    const result = await response.blob();
    const imageURL = URL.createObjectURL(result);
    window.open(imageURL, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-5xl font-bold">Refine With AI ✨</h1>
      <div className="flex gap-36 bg-[#f4f3fd] p-10 rounded-3xl shadow-lg w-[1000px]">
        <div
          ref={previewRef}
          className="relative w-[320px] h-[600px] flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {selections && <CharacterPreview selections={selections} />}

          {/* Prevent earrings from being draggable during selection */}
          {isDragging && (
            <div className="absolute inset-0 z-40 bg-transparent cursor-crosshair" />
          )}

          {selectionBox && (
            <div
              className="absolute border-2 border-blue-500 bg-blue-200/20 z-50"
              style={{
                left: selectionBox.x,
                top: selectionBox.y,
                width: selectionBox.width,
                height: selectionBox.height,
              }}
            ></div>
          )}
        </div>

        <div className="flex flex-col gap-10 items-center w-[400px]">
          <div className="w-[500px] h-[320px] border-4 border-black rounded-xl p-4 bg-white shadow-inner">
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Describe what you'd like to change (e.g. 'Make the hair longer')"
              className="w-full h-full bg-transparent resize-none outline-none text-lg"
            />
          </div>

          <div className="flex justify-center gap-4 mt-2 w-[500px] h-[100px]">
            <ButtonPanelforAI
              features={features}
              setFeatures={setFeatures}
              instruction={instruction}
              onClick={handleRefine}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineWithAI;
