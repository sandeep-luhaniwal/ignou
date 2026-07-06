"use client";

import React, { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import Icons from "../common/Icons";
import Paragraph from "./Paragraph";

interface InputWithLabelProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  required?: boolean;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  medium?: boolean,
  semibold?: boolean,
  bold?: boolean,
  extrabold?: boolean,
  light?: boolean,
  xs?: boolean,
  base?: boolean,
  lightwhite?: boolean,
  icon?: React.ReactNode,
  showpassword?: string,
  number?: boolean,
  stoashibold?: boolean,
  labelbase?: boolean,
  labelxs?: boolean,
  labelmedium?: boolean,
  labellight?: boolean,
  labelsemibold?: boolean,
  labelbold?: boolean,
  type?: string,
  isTextArea?: boolean;
  rows?: number;
  onChange?: (e: ChangeEvent<any>) => void,
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  required = false,
  error,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  medium,
  semibold,
  bold,
  extrabold,
  light,
  xs,
  base,
  lightwhite,
  icon,
  showpassword,
  number,
  stoashibold,
  type = "text",
  onChange,
  labelbase,
  labelxs,
  labelmedium,
  labellight,
  labelsemibold,
  labelbold,
  isTextArea,
  rows = 4,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className={`w-full flex flex-col gap-0.5 ${containerClassName}`}>
      {label && (
        <label
          className={`${labelxs ? 'text-xs' : labelbase ? 'text-sm md:text-base' : "text-sm"}   ${labelmedium ? "font-medium" : labellight ? "font-light" : labelsemibold ? "font-semibold" : labelbold ? "font-bold" : stoashibold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"} capitalize font-medium text-main-black pb-2 ${labelClassName}`}
        >
          {label}
        </label>
      )
      }

      <div className="relative">
        {isTextArea ? (
          <textarea
            {...(props as any)}
            rows={rows}
            onChange={onChange}
            className={`
            w-full
            border
            rounded-lg
            ${icon ? "ps-10 pe-4" : showpassword ? "pe-10 ps-4" : "px-4"}
            py-3
            outline-none
            transition-all
            duration-300
            border-off-white
            focus:border-orange
            placeholder:text-gray
            ${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"}
            ${lightwhite ? "bg-light-white" : "bg-dark-white"}
          
            ${inputClassName}
          `}
          />
        ) : (
          <input
            {...props}
            type={number ? "number" : showpassword ? (showPass ? "text" : "password") : type}
            onChange={onChange}
            className={`
            w-full
            border
            rounded-lg
            ${icon ? "ps-10 pe-4" : showpassword ? "pe-10 ps-4" : "px-4"}
            py-3
            outline-none
            transition-all
            duration-300
            border-off-white
            focus:border-orange
            placeholder:text-gray
            ${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"}
            ${lightwhite ? "bg-light-white" : "bg-dark-white"}
          
            ${inputClassName}
          `}
          />
        )}

        {icon && (
          <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center justify-center text-gray-400">
            {typeof icon === "string" ? <Icons icon={icon} /> : icon}
          </span>
        )}

        {showpassword && (
          <span className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={() => setShowPass(p => !p)}>
            <Icons icon={showPass ? "eye" : showpassword} />
          </span>
        )}
      </div>

      {
        error && (
          <Paragraph red xs>
            {error}
          </Paragraph>
        )
      }
    </div >
  );
};

export default InputWithLabel;