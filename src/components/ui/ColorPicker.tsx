"use client";
import React from 'react'
import Paragraph from './Paragraph'

interface ColorPickerProps {
    label: string;
    value: string;
    onChange?: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2 w-full group">
            <label className="text-sm font-bold text-main-black capitalize">
                {label}
            </label>
            <div className="flex items-center gap-2.5 p-2.5 bg-[#F8FAFC] border border-border-white rounded-xl cursor-pointer hover:border-orange duration-300 transition-colors">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/5">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer border-none p-0 m-0"
                    />
                </div>
                <Paragraph sm bold gray className="uppercase tracking-wider">
                    {value}
                </Paragraph>
            </div>
        </div>
    )
}

export default ColorPicker
