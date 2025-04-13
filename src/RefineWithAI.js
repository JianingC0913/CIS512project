import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import CharacterPreview from "./CharacterPreview";

const RefineWithAI = () => {
  const navigate = useNavigate();
  const previewRef = useRef();
  const location = useLocation();
  const selections = location.state?.selections;

  // Chat state
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your character creation assistant. Would you like me to generate a story or self-introduction based on your new character? If so, what's your character's name?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");

 
  // ---------------------------
  // Save Image Function
  // ---------------------------
  const handleSaveImage = () => {
    if (!previewRef.current) return;
    html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "oc.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  // ---------------------------
  // Chat Send Handler (Image Capture)
  // ---------------------------
  const handleSend = async () => {
    const trimmedMsg = userMessage.trim();
    if (!trimmedMsg) return;

    // Add the user's message to the chat history
    const updatedMessages = [...messages, { role: "user", content: trimmedMsg }];
    setMessages(updatedMessages);
    setUserMessage("");

    // Capture the current character preview
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      useCORS: true,
      scale: 2,
    });
    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));

    // Prepare the FormData to send the image and user instruction
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("instruction", trimmedMsg);

    try {
      const resp = await fetch("http://localhost:8000/refine-image-chat", {
        method: "POST",
        body: formData,
      });
      const data = await resp.json();
      const aiReply = data.text || "Sorry, no response.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (err) {
      console.error("Error in image chat refinement", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, something went wrong while contacting the AI." },
      ]);
    }
  };

  // ---------------------------
  // Render a single chat message bubble
  // ---------------------------
  const renderMessageBubble = (msg, idx) => {
    const isAssistant = msg.role === "assistant";
    return (
      <div
        key={idx}
        className={`flex w-full mb-3 ${isAssistant ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`max-w-[70%] p-3 rounded-xl shadow ${
            isAssistant
              ? "bg-purple-100 text-purple-900"
              : "bg-pink-100 text-pink-900"
          }`}
        >
          <div className="text-sm font-semibold mb-1">
            {isAssistant ? "LeadBot" : "You"}
          </div>
          <div className="text-base whitespace-pre-wrap">{msg.content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 min-h-screen bg-[#f3ecff]">
      {/* Top Header with Back Button */}
      <div className="w-full max-w-[1200px] flex items-center justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="group relative border-4 border-[#dac3e7e0] text-[#c996ef] px-4 py-2 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
        >
          ← Back
        </button>
        <h1 className="text-5xl font-bold">Refine With AI ✨</h1>
        <div className="w-24" /> {/* Spacer to balance the layout */}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1200px] bg-[#f4f3fd] p-8 rounded-3xl shadow-lg flex flex-col gap-8">
        {/* Top Row: Character Preview and Chat */}
        <div className="flex flex-col lg:flex-row gap-16 justify-center items-start">
          {/* Character Preview with Selection Box */}
          <div
            ref={previewRef}
            className="relative w-[320px] h-[600px] flex-shrink-0 flex justify-center items-center border-4 border-black rounded-3xl p-4 bg-white"
            
          >
            {selections && <CharacterPreview selections={selections} />}
            {(
              <div className="absolute inset-0 z-40 bg-transparent cursor-crosshair" />
            )}
            
          </div>

          {/* Chat Container */}
          <div className="flex flex-col items-center w-full max-w-[600px] gap-4">
            <div className="w-full border-4 border-[#D2BCFA] rounded-2xl bg-white shadow-inner flex flex-col justify-between h-[500px]">
              {/* Messages */}
              <div className="p-4 overflow-y-auto flex-1">
                {messages.map((msg, idx) => renderMessageBubble(msg, idx))}
              </div>

              {/* Input Row inside Chatbox */}
              <div className="flex p-3 border-t border-gray-300 gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-400 px-3 py-2 rounded-lg focus:outline-none text-base"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <button
                  onClick={handleSend}
                  className="bg-white border-2 border-pink-300 text-pink-700 rounded-full px-5 py-2 hover:bg-pink-100 shadow transition-all font-semibold"
                >
                  ✉️ Send
                </button>
              </div> 
            </div>

            {/* Bottom Row: Save Button */}
            <div className="flex justify-center">
            <button
                onClick={handleSaveImage}
                className="group relative border-4 border-[#F5E960] text-[#B59E00] px-8 py-4 rounded-full bg-white hover:bg-[#FBF6D1] font-semibold text-2xl transition-all duration-200 hover:scale-105 shadow-md"
            >
                💾 Save
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-[#F5E960] text-black text-sm px-3 py-1 rounded-lg shadow">
                Save as PNG!
                </span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineWithAI;
