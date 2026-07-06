"use client";

import React, { useRef, useState } from "react";
import Icons from "../common/Icons";
import Paragraph from "./Paragraph";

interface UploadFileProps {
    label?: string;
    required?: boolean;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    uploadClassName?: string;
    icon?: string;
    title?: string;
    description?: string;
    accept?: string;
    xs?: boolean;
    base?: boolean;
    lightwhite?: boolean;
    medium?: boolean;
    semibold?: boolean;
    bold?: boolean;
    extrabold?: boolean;
    light?: boolean;
    py?: "py-6" | "py-8" | "py-16";
    onChange?: (file: File | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
    label,
    required = false,
    error,
    containerClassName = "",
    labelClassName = "",
    uploadClassName = "",
    icon,
    title = "Click to upload",
    description,
    accept,
    xs,
    base,
    lightwhite,
    medium,
    semibold,
    bold,
    extrabold,
    light,
    py = "py-8",
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFileName(file ? file.name : null);
        if (file && file.type.startsWith("image/")) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
        onChange?.(file);
    };

    return (
        <div className={`w-full flex flex-col gap-0.5 ${containerClassName}`}>
            {label && (
                <label
                    className={`${xs ? "text-xs" : base ? "text-sm md:text-base" : "text-sm"} capitalize font-medium text-main-black pb-2 ${labelClassName}`}
                >
                    {label}
                </label>
            )}

            <div
                onClick={() => inputRef.current?.click()}
                className={`
          w-full
          border-2 border-dashed border-border-white
          rounded-lg
          ${py}
          px-4
          cursor-pointer
          outline-none
          transition-all
          duration-300
          border-off-white
          hover:border-orange
          ${lightwhite ? "bg-light-white" : "bg-dark-white"}
          flex flex-col items-center justify-center gap-4
          ${uploadClassName}
        `}
            >
                {preview ? (
                    <img src={preview} alt="preview" className="max-h-40 rounded-lg object-contain" />
                ) : icon && <Icons icon={icon} />}

                <div className="flex flex-col items-center gap-1">
                    <span
                        className={`
              ${xs ? "text-xs" : base ? "text-sm md:text-base" : "text-sm"}
              ${medium ? "font-medium" : light ? "font-light" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"}
              text-main-black
            `}
                    >
                        {fileName || title}
                    </span>

                    {description && !fileName && (
                        <span className="text-xs text-main-green">{description}</span>
                    )}
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleChange}
            />

            {error && (
                <Paragraph red xs>
                    {error}
                </Paragraph>
            )}
        </div>
    );
};

export default UploadFile;
