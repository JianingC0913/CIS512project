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

    setLoading(true); // 🟡 Show loading
    setOutput(null);  // 🧽 Clear previous response

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
      console.log("Response from backend:", data);
      setOutput(data.text);
    } catch (err) {
      console.error("AI refinement failed", err);
      setOutput("Oops! Something went wrong.");
    }finally {
        setLoading(false); // ✅ Done loading
      }
  };

  return (
    <div className="min-h-screen bg-[#f3ecff] flex flex-col items-center py-10">
      <h1 className="text-5xl font-bold mb-6">Refine With AI 2 ✨</h1>
      <div className="flex gap-8">
        <div
          ref={previewRef}
          className="relative w-[320px] h-[600px] border-4 border-black rounded-3xl p-4 bg-white"
        >
        <img
            src="/character.png"
            alt="Character"
            className="w-full h-full object-contain"
            />

          {selections && <CharacterPreview selections={selections} />}
        </div>

        <div className="flex flex-col gap-4 w-[500px]">
          <input
            type="text"
            placeholder="Enter character name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-lg"
          />

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleGenerate("fantasy_story")} className="bg-pink-100 p-3 rounded text-xl ">💭 Fantasy Story</button>
            <button onClick={() => handleGenerate("backstory")} className="bg-green-100 p-3 rounded text-xl ">🎭 Backstory</button>
            <button onClick={() => handleGenerate("self_intro")} className="bg-blue-100 p-3 rounded text-xl ">📖 Self-Intro</button>
            <button onClick={() => handleGenerate("superpowers")} className="bg-yellow-100 p-3 rounded text-xl">🦸 Superpowers</button>
          </div>

          {loading ? (
            <div className="text-purple-500 text-xl italic animate-pulse font-medium">
                ✨ Generating your story, please wait...
            </div>
            ) : output && (
            <div className="bg-white border-4 border-[#D2BCFA] p-6 rounded-2xl text-xl text-gray-800 whitespace-pre-wrap max-h-[300px] overflow-y-auto shadow-inner leading-relaxed font-[Inter,sans-serif]">
                {output}
            </div>
            )}



            

        </div>
      </div>
    </div>
  );
};

export default RefineWithAI2;