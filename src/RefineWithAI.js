
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

  const handleMouseUp = () => setIsDragging(false);

//   const handleRefine = async () => {
//     if (!selectionBox || !previewRef.current) return;

//     const scale = 2;
//     const padding = 20;

//     // Generate full character canvas
//     const canvas = await html2canvas(previewRef.current, {
//       backgroundColor: "#D9A2F4",
//       scale: scale,
//       useCORS: true,
//     });

//     const x = Math.max(0, (selectionBox.x - padding) * scale);
//     const y = Math.max(0, (selectionBox.y - padding) * scale);
//     const w = (selectionBox.width + padding * 2) * scale;
//     const h = (selectionBox.height + padding * 2) * scale;

//     // Cropped image
//     const cropCanvas = document.createElement("canvas");
//     cropCanvas.width = w;
//     cropCanvas.height = h;
//     cropCanvas.getContext("2d").drawImage(canvas, x, y, w, h, 0, 0, w, h);
//     const imageBlob = await new Promise((res) => cropCanvas.toBlob(res, "image/png"));

//     // Matching white mask on black
//     const maskCanvas = document.createElement("canvas");
//     maskCanvas.width = w;
//     maskCanvas.height = h;
//     const maskCtx = maskCanvas.getContext("2d");
//     maskCtx.fillStyle = "black";
//     maskCtx.fillRect(0, 0, w, h);

//     // Draw white area
//     maskCtx.fillStyle = "white";
//     maskCtx.fillRect(padding * scale, padding * scale, selectionBox.width * scale, selectionBox.height * scale);
//     const maskBlob = await new Promise((res) => maskCanvas.toBlob(res, "image/png"));

//     const formData = new FormData();
//     formData.append("file", imageBlob, "input.png");
//     formData.append("mask", maskBlob, "mask.png");
//     formData.append("instruction", instruction);

//     try {
//       const response = await fetch("http://localhost:8000/refine", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.url) {
//         window.open(data.url, "_blank");
//       }
//     } catch (err) {
//       console.error("Refinement failed", err);
//     }
//   };

const handleRefine = async () => {
    if (!selectionBox || !previewRef.current) return;
  
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: "#D9A2F4",
      scale: 2,
    });
  
    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
  
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("instruction", instruction);
    formData.append("box", JSON.stringify(selectionBox)); // Send box info
  
    try {
      const response = await fetch("http://localhost:8000/refine", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (result.url) window.open(result.url, "_blank");
    } catch (error) {
      console.error("AI refinement failed", error);
    }
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
          {isDragging && <div className="absolute inset-0 z-40 bg-transparent cursor-crosshair" />}
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
              placeholder="Describe what you'd like to change (e.g. 'Add a rose to the hand')"
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
