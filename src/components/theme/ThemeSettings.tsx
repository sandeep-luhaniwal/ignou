import React, { useState } from "react";
import { Edit3 } from "lucide-react";
import UploadBox from "./UploadBox";
import ColorBlock from "./ColorBlock";

export const ThemeSettings: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#FF6A00");
  const [textColor, setTextColor] = useState("#1F2937");
  const [bgColor, setBgColor] = useState("#EAF9FD");
  const [lang, setLang] = useState("English");
  const [mode, setMode] = useState("Hotel");
  const [active, setActive] = useState(true);

  return (
    <div 
      className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg border shadow-sm flex flex-col gap-8"
      style={{ borderColor: "var(--border-color, #EEF2F6)", fontFamily: "sans-serif" }}
    >
      <div className="flex items-center gap-2 border-b pb-4" style={{ borderColor: "rgba(0,0,0,0.03)" }}>
        <Edit3 size={20} style={{ color: "var(--main-black, #141B2C)" }} />
        <h2 className="font-heading font-black text-xl md:text-2xl" style={{ color: "var(--main-black, #141B2C)" }}>Theme Settings</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UploadBox label="Hotel Logo" subtext="SVG, PNG (max 500kb)" />
        <UploadBox label="Welcome Screen Image" subtext="1920x1080 Landscape" />
        <UploadBox label="TV App Logo" subtext="Transparent PNG recommended" />
        <UploadBox label="Home Hero Image" subtext="High Resolution Background" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ColorBlock label="Primary Color" value={primaryColor} onChange={setPrimaryColor} />
        <ColorBlock label="Text Color" value={textColor} onChange={setTextColor} />
        <ColorBlock label="Background Color" value={bgColor} onChange={setBgColor} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
        <div className="flex flex-col gap-2 w-full text-left">
          <label className="text-sm font-bold" style={{ color: "var(--main-black, #141B2C)" }}>Default Language</label>
          <select 
            value={lang} onChange={(e) => setLang(e.target.value)}
            className="w-full text-sm font-bold bg-transparent border rounded-lg px-3 py-3 outline-none cursor-pointer"
            style={{ borderColor: "var(--border-color, #EEF2F6)", color: "var(--main-black, #141B2C)" }}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full text-left">
          <label className="text-sm font-bold" style={{ color: "var(--main-black, #141B2C)" }}>Theme Mode</label>
          <div 
            className="flex p-1 rounded-lg border w-full max-w-[280px]"
            style={{ backgroundColor: "var(--background, #F5F7FA)", borderColor: "var(--border-color, #EEF2F6)" }}
          >
            {["Hotel", "Custom"].map(m => (
              <button
                key={m} onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm font-bold rounded-md border-none cursor-pointer transition-all"
                style={{ 
                  backgroundColor: mode === m ? "#ffffff" : "transparent",
                  color: mode === m ? "var(--main-black)" : "var(--gray)",
                  boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-6" style={{ borderColor: "rgba(0,0,0,0.03)" }}>
        <div className="flex flex-col text-left">
          <h4 className="font-bold text-sm" style={{ color: "var(--main-black)" }}>Publish Status</h4>
          <p className="text-xs" style={{ color: "var(--gray)" }}>Mark this theme as active or save as a draft</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold" style={{ color: "var(--gray)" }}>Draft</span>
          <button 
            onClick={() => setActive(!active)}
            className="w-12 h-6 rounded-full cursor-pointer relative transition-all duration-300 border-none outline-none"
            style={{ backgroundColor: active ? "var(--orange)" : "#E2E8F0" }}
          >
            <div 
              className="w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-xs"
              style={{ left: active ? "26px" : "2px" }}
            />
          </button>
          <span className="text-sm font-bold" style={{ color: "var(--main-black)" }}>Active</span>
        </div>
      </div>
    </div>
  );
};
export default ThemeSettings;
