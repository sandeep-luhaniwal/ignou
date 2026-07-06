"use client";

import React, { useState } from "react";

interface TabItem {
    label: string;
    value: string | number;
}

interface TabsProps {
    tabs: TabItem[];
    value?: string | number;
    label?: string;
    onChange?: (value: string | number) => void;
    containerClassName?: string;
    labelClassName?: string;
    buttonClassName?: string;
    activeClassName?: string;
    medium?: boolean;
    semibold?: boolean;
    bold?: boolean;
    extrabold?: boolean;
    light?: boolean;
    xs?: boolean;
    base?: boolean;
    lightwhite?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
    tabs = [],
    value,
    label,
    onChange,
    containerClassName = "",
    labelClassName = "",
    buttonClassName = "",
    activeClassName = "",
    medium,
    semibold,
    bold,
    extrabold,
    light,
    xs,
    base,
    lightwhite,
}) => {

    const [selectedTab, setSelectedTab] = useState<string | number | undefined>(value || tabs[0]?.value);

    const handleTab = (value: string | number) => {
        setSelectedTab(value);
        onChange?.(value);
    };

    return (
        <div className={`w-full flex flex-col gap-3 ${containerClassName}`}>

            {label && (
                <label className={`${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"} capitalize font-medium text-main-black ${labelClassName}`}>
                    {label}
                </label>
            )}

            <div className={`w-full rounded-lg p-1 flex items-center gap-2 ${lightwhite ? "bg-light-white" : "bg-dark-white"}`}>

                {tabs.map((item, index) => {

                    const active = selectedTab === item.value;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleTab(item.value)}
                            className={`
                                flex-1
                                rounded-md
                                p-2
                                transition-all
                                duration-300
                                ${active ? "bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" : "bg-transparent"}
                                ${buttonClassName}
                                ${active ? activeClassName : ""}
                            `}
                        >
                            <label
                                className={`
                                    block
                                    cursor-pointer
                                    text-center
                                    ${xs ? 'text-xs' : base ? 'text-sm md:text-base' : "text-sm"}
                                    ${medium ? "font-medium" : light ? "font-light" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"}
                                    ${active ? "text-orange" : "text-main-gray"}
                                `}
                            >
                                {item.label}
                            </label>
                        </button>
                    );
                })}

            </div>
        </div>
    );
};

export default Tabs;