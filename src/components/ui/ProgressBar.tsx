"use client";
import React from 'react';
import Paragraph from './Paragraph';

interface ProgressBarProps {
    title?: string;
    value: number;
    color?: 'green' | 'red' | 'yellow' | 'black' | 'orange';
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, value, color = 'orange', className = '' }) => {
    // Mapping color prop to project's theme classes
    const colorClasses = {
        green: 'bg-green',
        red: 'bg-red',
        yellow: 'bg-yellow',
        black: 'bg-main-black',
        orange: 'bg-orange',
    };

    return (
        <div className={`w-full flex items-center ${className}`}>
            <div className="flex flex-col gap-2 flex-1">
                <Paragraph sm medium maingray className="opacity-80">
                    {title}
                </Paragraph>
                <div className="w-full bg-transparent h-2.5 rounded-full">
                    <div
                        className={`${colorClasses[color]} h-full rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${value}%` }}
                    ></div>
                </div>
            </div>
            <Paragraph sm bold mainblack className='flex items-center'>
                {value}%
            </Paragraph>

        </div>
    );
};

export default ProgressBar;
