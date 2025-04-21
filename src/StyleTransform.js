// --- src/pages/StyleTransform.jsx ---
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import CharacterPreview from "./CharacterPreview";

const StyleTransform = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;
  const [styledImage, setStyledImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const styleOptions = [
    { type: "conan", label: "🕵️ Conan" },
    { type: "onepiece", label: "🏴‍☠️ One Piece" },
    { type: "ghibli", label: "🌸 Ghibli" },
    { type: "spongebob", label: "🍍 Spongebob" },
    { type: "patrick", label: "⭐ Patrick" },
    { type: "chinese", label: "🐉 Chinese" },
    { type: "starbucks", label: "☕ Starbucks" },
  ];

  const handleGenerate = async (styleType) => {
    setLoading(true);
    setStyledImage(null);

    // const canvas = await html2canvas(previewRef.current, {
    //   backgroundColor: null,
    //   useCORS: true,
    //   scale: 2,
    // });

    const target = previewRef.current;
    const canvas = await html2canvas(target, {
    backgroundColor: null,
    useCORS: true,
    scale: 2,
    });

    // const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
   

    // const formData = new FormData();
    // formData.append("file", blob, "character.png");
    // formData.append("style", styleType);

    const blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      
      // Ensure blob is valid
    if (!blob) {
        alert("Failed to create PNG image from canvas.");
        return;
      }
      
      // Create a proper File object (required for OpenAI API)
    const fixedBlob = new File([blob], "character.png", { type: "image/png" });
      

    const formData = new FormData();
    formData.append("file", fixedBlob); // <-- This ensures OpenAI sees it as image/png
    formData.append("style", styleType);

    try {
      const response = await fetch("http://localhost:8000/style-transform", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Image response:", data);

      if (data.image) {
        setStyledImage(`data:image/png;base64,${data.image}`);
        } else {
        alert("Image generation failed: " + (data.error || "Unknown error"));
        }
    } catch (err) {
      console.error("Style transformation failed", err);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = () => {
    const link = document.createElement("a");
    link.download = "styled_character.png";
    link.href = styledImage;
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4 min-h-screen bg-[#f3ecff]">
      <div className="w-full max-w-[1200px] flex items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="group relative border-4 border-[#dac3e7e0] text-[#c996ef] px-4 py-2 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
        >
          ← Back
        </button>
        <h1
          className="text-6xl font-bold mb-1 p-2"
          style={{ fontFamily: "Aclonica, sans-serif" }}
        >
          Refine With AI ✨
        </h1>
        <div className="w-24" />
      </div>

      <div className="w-full max-w-[1200px] bg-[#f3ecff] p-8 rounded-3xl shadow-lg flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-start">
          {/* Preview Area */}
          <div
            ref={previewRef}
            className="relative w-[320px] h-[600px] flex-shrink-0 flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
          >
            {styledImage ? (
              <img src={styledImage} alt="Styled Character" className="max-h-full object-contain" />
            ) : (
              selections && (
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <CharacterPreview selections={selections} />
                </div>
              )
            )}
          </div>

          {/* Style Options */}
          <div className="flex flex-col items-center w-full max-w-[600px] gap-6">
            <div className="text-lg font-semibold text-gray-700">
              Choose a style:
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {styleOptions.map((style) => (
                <button
                  key={style.type}
                  onClick={() => handleGenerate(style.type)}
                  className="w-20 h-20 rounded-full bg-white border-4 border-purple-300 text-sm font-medium text-center flex items-center justify-center shadow-md hover:scale-110 transition-all"
                  disabled={loading}
                >
                  {style.label}
                </button>
              ))}
            </div>

            {/* Save Button */}
            {styledImage && (
              <button
                onClick={handleSaveImage}
                className="group relative border-4 border-[#F5E960] text-[#B59E00] px-8 py-4 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md mt-6"
              >
                💾 Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleTransform;

