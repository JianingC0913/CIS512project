// --- src/pages/RefineWithAI2.jsx ---
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import CharacterPreview from "./CharacterPreview";

const RefineWithAI2 = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;
  const [name, setName] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (type) => {
    if (!name.trim()) return alert("Please enter a name!");

    setLoading(true);
    setOutput(null);

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });
    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("name", name);
    formData.append("type", type);

    try {
      const resp = await fetch("http://localhost:8000/refine-ai2", {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();
      setOutput(data.text);
    } catch (err) {
      console.error("AI refinement failed", err);
      setOutput("Oops! Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = () => {
    if (!previewRef.current) return;

    // Find the save button inside previewRef and hide it
    const saveButton = previewRef.current.querySelector('.save-icon-button');

    // Store the original display style
    const originalDisplay = saveButton?.style.display;

    // Hide the save button for the screenshot
    if (saveButton) saveButton.style.display = 'none';

    
    html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      // Restore the original display after capture
      if (saveButton) saveButton.style.display = originalDisplay || 'block';

      const link = document.createElement("a");
      link.download = "oc.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4 min-h-screen bg-[#f3ecff]">
      {/* Header */}
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

      {/* Main */}
      <div className="w-full max-w-[1200px] bg-[#f3ecff] p-8 rounded-3xl shadow-lg flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-start">
          
          {/* Character Preview */}
          <div
            ref={previewRef}
            className="relative w-[320px] h-[600px] flex-shrink-0 flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
          >
            <CharacterPreview selections={selections} />

            {/* Save icon button */}
            <button
              onClick={handleSaveImage}
              className="save-icon-button group absolute bottom-2 right-2 border-2 rounded-full p-2 hover:bg-[#FBF6D1] transition shadow-md text-2xl"
              title="Save Image"
            >
              💾
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#ebbd34] text-white text-sm px-3 py-1 rounded-lg shadow font-bold">
                Save this image!
              </span>
            </button>
          </div>

          {/* Right Panel: Name + Buttons + Output */}
          <div className="flex flex-col items-center w-full max-w-[600px] gap-4">
            <input
              type="text"
              placeholder="Enter character name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded-lg w-full"
            />

            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="group relative">
                <button
                  onClick={() => handleGenerate("fantasy_story")}
                  className="bg-pink-100 p-3 rounded text-xl w-full font-semibold"
                >
                  💭 Fantasy Story
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-pink-300 text-white text-sm px-3 py-1 rounded-lg shadow text-center">
                  A short imaginative tale about your character.
                </span>
              </div>

              <div className="group relative">
                <button
                  onClick={() => handleGenerate("backstory")}
                  className="bg-green-100 p-3 rounded text-xl w-full font-semibold"
                >
                  🎭 Backstory
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-green-400 text-white text-sm px-3 py-1 rounded-lg shadow text-center">
                  Details about your character’s past and origin.
                </span>
              </div>

              <div className="group relative">
                <button
                  onClick={() => handleGenerate("self_intro")}
                  className="bg-blue-100 p-3 rounded text-xl w-full font-semibold"
                >
                  📖 Self-Intro
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-blue-300 text-white text-sm px-3 py-1 rounded-lg shadow text-center">
                  Your character introduces themselves in first person.
                </span>
              </div>

              <div className="group relative">
                <button
                  onClick={() => handleGenerate("superpowers")}
                  className="bg-yellow-100 p-3 rounded text-xl w-full font-semibold"
                >
                  🦸 Superpowers
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-yellow-400 text-white text-sm px-3 py-1 rounded-lg shadow text-center">
                  Shows magical or heroic powers your character has.
                </span>
              </div>
            </div>


            {loading ? (
              <div className="text-purple-500 text-xl italic animate-pulse font-medium mt-2">
                ✨ Generating your story, please wait...
              </div>
            ) : output && (
              <div className="bg-white border-4 border-[#D2BCFA] p-6 rounded-2xl text-xl text-gray-800 whitespace-pre-wrap max-h-[300px] overflow-y-auto shadow-inner leading-relaxed font-[Inter,sans-serif] w-full">
                {output}
              </div>
            )}

            {/*Button */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineWithAI2;
