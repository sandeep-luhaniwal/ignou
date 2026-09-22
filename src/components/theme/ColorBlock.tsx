import React, { useRef } from "react";

interface ColorBlockProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export const ColorBlock: React.FC<ColorBlockProps> = ({ label, value, onChange }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-bold" style={{ color: "var(--main-black, #141B2C)" }}>{label}</label>
      <div
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-white"
        style={{ borderColor: "var(--border-color, #EEF2F6)" }}
      >
        <div
          onClick={() => colorInputRef.current?.click()}
          className="w-7 h-7 rounded cursor-pointer border shadow-xs  transition-transform"
          style={{ backgroundColor: value, borderColor: "rgba(0,0,0,0.1)" }}
        />
        <input
          type="color"
          ref={colorInputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="hidden"
        />
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm font-bold bg-transparent border-none outline-none"
          style={{ color: "var(--main-black, #141B2C)" }}
        />
      </div>
    </div>
  );
};
export default ColorBlock;
