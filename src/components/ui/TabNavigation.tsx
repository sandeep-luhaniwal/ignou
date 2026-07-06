"use client";
import React, { useState, useEffect } from "react";

interface TabItem {
    label: string;
    value: string | number;
}

interface TabNavigationProps {
    tabs: TabItem[];
    value?: string | number;
    onChange?: (value: string | number) => void;
    containerClassName?: string;
    buttonClassName?: string;
    activeTabClassName?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs = [],
    value,
    onChange,
    containerClassName = "",
    buttonClassName = "",
    activeTabClassName = "",
}) => {
    const [activeTab, setActiveTab] = useState<string | number>(value || tabs[0]?.value);

    useEffect(() => {
        if (value !== undefined) {
            setActiveTab(value);
        }
    }, [value]);

    const handleTabClick = (val: string | number) => {
        setActiveTab(val);
        if (onChange) {
            onChange(val);
        }
    };

    return (
        <div className={`flex items-center gap-3 md:gap-4 border-b border-border-white overflow-x-auto no-scrollbar py-5 ${containerClassName}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => handleTabClick(tab.value)}
                    className={`pb-4 px-5 cursor-pointer text-sm font-bold duration-300 transition-all border-b-2 whitespace-nowrap
                    ${activeTab === tab.value
                            ? `text-orange border-orange ${activeTabClassName}`
                            : 'text-gray border-transparent hover:text-main-black'
                        } ${buttonClassName}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNavigation;
