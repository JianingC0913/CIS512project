import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CharacterPreview from './CharacterPreview';
import { jsPDF } from 'jspdf';

const RefineWithAI2 = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;

  const [name, setName] = useState('');
  const [textType, setTextType] = useState('');
  const [platform, setPlatform] = useState('');
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);


  const handleSaveImage = () => {
    if (!previewRef.current) return;
    const saveButton = previewRef.current.querySelector('.save-icon-button');
    const originalDisplay = saveButton?.style.display;
    if (saveButton) saveButton.style.display = 'none';

    html2canvas(previewRef.current, { backgroundColor: null, useCORS: true, scale: 2 }).then((canvas) => {
      if (saveButton) saveButton.style.display = originalDisplay || 'block';
      const link = document.createElement('a');
      link.download = 'oc.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };


  const handleSavePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const maxLineHeight = 10;
    const lines = doc.splitTextToSize(output, 180);
  
    let cursorY = margin;
  
    lines.forEach((line) => {
      if (cursorY + maxLineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += maxLineHeight;
    });
  
    doc.save('CharacterStory.pdf');
  };
  

  const handleGenerate = async () => {
    if (!name.trim() || !textType || !platform) {
      return alert('Please enter a name and select both a text type and platform.');
    }
    setLoading(true);
    setOutput(null);

    const canvas = await html2canvas(previewRef.current, { backgroundColor: null, useCORS: true, scale: 2 });
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('name', name);
    formData.append('type', textType);
    formData.append('platform', platform);

    try {
      const resp = await fetch('http://localhost:8000/refine-ai2', {
        method: 'POST',
        body: formData,
      });
      const data = await resp.json();
      setOutput(data.text);
    } catch (err) {
      console.error('AI refinement failed', err);
      setOutput('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const buttonBase = 'p-3 rounded text-xl w-full font-semibold transition flex items-center gap-3';

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[90vw] min-h-[80vh] bg-[#f4f3fd] p-6 md:p-10 rounded-3xl shadow-lg flex flex-col md:flex-row gap-6">
        {/* Character Preview */}
        <div ref={previewRef} className="w-full md:w-1/3 flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white relative">
          <CharacterPreview selections={selections} />
          <button onClick={handleSaveImage} className="save-icon-button group absolute bottom-2 right-2 border-2 rounded-full p-2 hover:bg-[#FBF6D1] transition shadow-md text-2xl" title="Save Image">
            💾
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#ebbd34] text-white text-sm px-3 py-1 rounded-lg shadow font-bold">Save this image!</span>
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col items-start flex-1 gap-6">
          <input
            type="text"
            placeholder="Enter character name, choose 2 buttons, and click Go Writing!"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-400 rounded-lg w-full text-xl"
          />

          <h2 className="text-left text-xl font-semibold">Question 1: What kind of text do you want to generate?</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {[
              { label: '💭 Fantasy Story', type: 'fantasy_story', bg: 'bg-pink-100', hover: 'hover:bg-pink-200', tooltip: 'bg-pink-400', desc: 'A short imaginative tale.' },
              { label: '🎭 Backstory', type: 'backstory', bg: 'bg-green-100', hover: 'hover:bg-green-200', tooltip: 'bg-green-400', desc: 'Character’s origin story.' },
              { label: '📖 Self-Intro', type: 'self_intro', bg: 'bg-blue-100', hover: 'hover:bg-blue-200', tooltip: 'bg-blue-400', desc: 'First-person introduction.' },
              { label: '🦸 Superpowers', type: 'superpowers', bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', tooltip: 'bg-yellow-400', desc: 'Magical or heroic skills.' },
            ].map((btn, idx) => (
              <div className="group relative" key={idx}>
                <button
                  onClick={() => setTextType(btn.type)}
                  className={`${buttonBase} ${btn.bg} ${btn.hover} ${textType === btn.type ? 'ring-4 ring-offset-2 ring-purple-400' : ''}`}
                >
                  {btn.label}
                </button>
                <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ${btn.tooltip} text-white text-sm px-3 py-1 rounded-lg shadow`}>
                  {btn.desc}
                </span>
              </div>
            ))}
          </div>

          <h2 className="text-left text-xl font-semibold mt-4">Question 2: Where do you want to post this?</h2>
          <div className="grid grid-cols-2 gap-4 w-full">
            {[
              { name: 'Instagram', image: '/ins.webp', bg: 'bg-orange-100', hover: 'hover:bg-orange-200', tooltip: 'bg-orange-300', value: 'instagram', desc: 'Reels and carousel posts' },
              { name: 'YouTube', image: '/youtube.webp', bg: 'bg-red-100', hover: 'hover:bg-red-200', tooltip: 'bg-red-500', value: 'youtube', desc: 'Video storytelling' },
              { name: 'TikTok', image: '/tiktok-6338432_1280.webp', bg: 'bg-pink-100', hover: 'hover:bg-pink-200', tooltip: 'bg-pink-400', value: 'tiktok', desc: 'Snappy intros' },
              { name: 'Facebook', image: '/Facebook_logo_(square).png', bg: 'bg-blue-100', hover: 'hover:bg-blue-200', tooltip: 'bg-blue-500', value: 'facebook', desc: 'Family & friends content' },
              { name: 'LinkedIn', image: '/Linkedin.webp', bg: 'bg-sky-100', hover: 'hover:bg-sky-200', tooltip: 'bg-sky-400', value: 'linkedin', desc: 'Professional tone' },
              { name: 'Twitter/X', image: '/X_logo.jpg', bg: 'bg-gray-200', hover: 'hover:bg-gray-300', tooltip: 'bg-gray-400', value: 'twitter', desc: 'Short tweet-style story' },
            ].map((btn, idx) => (
              <div className="group relative" key={idx}>
                <button
                  onClick={() => setPlatform(btn.value)}
                  className={`${buttonBase} ${btn.bg} ${btn.hover} ${platform === btn.value ? 'ring-4 ring-offset-2 ring-purple-400' : ''}`}
                >
                  <img src={btn.image} alt={btn.name} className="w-8 h-8 object-contain" />
                  {btn.name}
                </button>
                <span className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all ${btn.tooltip} text-white text-sm px-3 py-1 rounded-lg shadow`}>
                  {btn.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="w-full flex justify-center mt-4 gap-6">
            <button
              onClick={() => navigate(-1)}
              className="border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl shadow-md"
            >
              ← Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={!name.trim() || !textType || !platform}
              className="border-4 border-[#F49097] px-8 py-4 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl shadow-md transition-all"
            >
              🖊️ Go Writing
            </button>
          </div>


          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
              <div className="bg-white p-10 rounded-2xl shadow-lg text-3xl font-semibold text-gray-800 animate-pulse"  style={{ fontFamily: 'Aclonica, sans-serif' }}>
                ✨ Generating your story ......
              </div>
            </div>
          )}

          {output && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-gray-100 p-8 rounded-3xl shadow-xl w-[90vw] max-w-2xl text-gray-800 relative">
                {/* Close Button */}
                <button
                  onClick={() => setOutput(null)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
                  title="Close"
                >
                  ✕
                </button>

                {/* Title */}
                <h3 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Aclonica, sans-serif' }}>
                  🎉 Here's Your Story!
                </h3>

                {/* Story Text */}
                <div className="whitespace-pre-wrap text-xl leading-relaxed font-[Inter,sans-serif] max-h-[400px] overflow-y-auto mb-6">
                  {output}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-6 mt-2">
                  {/* Copy Text Button */}
                  <button
                      onClick={() => {
                        navigator.clipboard.writeText(output).then(() => {
                          setCopied(true);
                        });
                      }}
                   className="border-4 border-[#dac3e7] text-[#c996ef] px-6 py-3 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl shadow-md transition-all duration-200 hover:scale-105"
                  >
                    📋 Copy Text
                  </button>

                  {/* Save to PDF Button */}
                  <button
                    onClick={handleSavePDF}
                    className="border-4 border-[#F49097] text-[#F49097] px-6 py-3 rounded-full bg-white hover:bg-[#FDE7EA] font-semibold text-2xl shadow-md transition-all duration-200 hover:scale-105"
                  >
                    📄 Save as PDF
                  </button>
                </div>
              </div>
            </div>
          )}


          {copied && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  z-[9999]">
              <div className="bg-white text-center p-8 rounded-3xl shadow-xl w-[90vw] max-w-md text-gray-800 relative">
                <button
                  onClick={() => setCopied(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
                  title="Close"
                >
                  ✕
                </button>
                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Aclonica, sans-serif' }}>
                  ✅ Copied to Clipboard!
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Your story has been copied successfully. You can now paste it anywhere!
                </p>
              </div>
            </div>
          )}



        </div>
      </div>
    </div>
  );
};

export default RefineWithAI2;
