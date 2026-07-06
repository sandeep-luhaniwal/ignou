"use client";

import React, { useEffect, useRef, useState } from "react";
import Icons from "../common/Icons";
import Paragraph from "./Paragraph";

interface DropDownOption {
    label: string;
    value: string | number;
}

interface DropDownMenuProps {
    options: DropDownOption[];
    value?: string | number;
    label?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    buttonClassName?: string;
    menuClassName?: string;
    optionClassName?: string;
    medium?: boolean;
    semibold?: boolean;
    bold?: boolean;
    extrabold?: boolean;
    light?: boolean;
    xs?: boolean;
    base?: boolean;
    lightwhite?: boolean;
    ptwo?: boolean;
    icon?: string;
    positionright?: boolean;
    onChange?: (value: string | number) => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ options = [], value, label, placeholder = "Select Option", required = false, error, containerClassName = "", labelClassName = "", buttonClassName = "", menuClassName = "", optionClassName = "", medium, semibold, bold, extrabold, light, xs, base, lightwhite, icon, onChange, ptwo, positionright }) => {

    const [open, setOpen] = useState(false);
    const [openUpward, setOpenUpward] = useState(false);

    const [selectedValue, setSelectedValue] = useState<string | number | undefined>(value);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(value);
    }, [value]);

    const selectedOption = options.find((item) => item.value === selectedValue);

    const handleSelect = (value: string | number) => {
        setSelectedValue(value);
        onChange?.(value);
        setOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className={`max-w-max flex flex-col gap-0.5 ${containerClassName}`}>
            {label && (
                <label className={`${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"} capitalize font-medium text-main-black pb-2 ${labelClassName}`}>
                    {label}
                    {required && <span className="text-red ml-1">*</span>}
                </label>
            )}

            <div ref={dropdownRef} className="relative">
                <button ref={buttonRef} type="button" onClick={() => {
                    if (buttonRef.current) {
                        const rect = buttonRef.current.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - rect.bottom;
                        setOpenUpward(spaceBelow < 200);
                    }
                    setOpen((p) => !p);
                }} className={`w-full border cursor-pointer rounded-lg ${icon ? "ps-10 pe-4 py-3" : ptwo ? "py-2 px-2.5" : "px-4 py-3"} outline-none transition-all duration-300 border-off-white ${lightwhite ? "bg-light-white" : "bg-dark-white"} flex items-center justify-between gap-2 ${buttonClassName}`}>
                    <div className="flex items-center gap-2">
                        {icon && (
                            <span>
                                <Icons icon={icon} />
                            </span>
                        )}
                        <label className={`block cursor-pointer truncate ${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"} ${medium ? "font-medium" : light ? "font-light" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"} ${selectedOption ? "text-main-black" : "text-gray"}`}>
                            {selectedOption?.label || placeholder}
                        </label>
                    </div>

                    <span className={`transition-all duration-300 ${open ? "rotate-180" : ""}`}>
                        <Icons icon="dropdown" />
                    </span>
                </button>
                <div
                    className={`absolute ${openUpward ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"} ${positionright ? "right-0" : "left-0"
                        } w-full min-w-30 border border-off-white rounded-lg overflow-hidden z-50 transition-all duration-300 ${lightwhite ? "bg-light-white" : "bg-dark-white"
                        } ${open
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        } ${menuClassName}`}
                >
                    {options.map((item, index) => (
                        <button key={index} type="button" onClick={() => handleSelect(item.value)} className={`w-full px-4 py-3 text-left hover:bg-off-white cursor-pointer transition-all duration-300 ${optionClassName}`}>
                            <label className={`block cursor-pointer truncate ${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"} ${medium ? "font-medium" : light ? "font-light" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"} text-main-black`}>
                                {item.label}
                            </label>

                        </button>
                    ))}

                </div>
            </div>

            {error && (
                <Paragraph red xs>
                    {error}
                </Paragraph>
            )}
        </div>
    );
};

export default DropDownMenu;