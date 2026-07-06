import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface UploadBoxProps {
  label: string;
  subtext: string;
  accept?: string;
}

export const UploadBox: React.FC<UploadBoxProps> = ({ label, subtext, accept = "image/*" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => fileInputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-bold" style={{ color: "var(--main-black, #141B2C)" }}>{label}</label>
      <div 
        onClick={handleClick}
        className="border-2 border-dashed cursor-pointer rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-[#F8FAFC]/50 transition-all duration-300 min-h-[110px]"
        style={{ borderColor: "rgba(226, 232, 240, 0.8)", backgroundColor: "var(--background, #F5F7FA)" }}
      >
        <input type="file" ref={fileInputRef} onChange={handleChange} accept={accept} className="hidden" />
        {fileName ? (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-center truncate max-w-[200px]" style={{ color: "var(--orange)" }}>{fileName}</span>
            <span className="text-[10px]" style={{ color: "var(--gray)" }}>Click to replace</span>
          </div>
        ) : (
          <>
            <span style={{ color: "var(--gray)" }}><Upload size={20} /></span>
            <span className="text-xs text-center" style={{ color: "var(--gray)" }}>{subtext}</span>
          </>
        )}
      </div>
    </div>
  );
};
export default UploadBox;
