"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Icons from "../common/Icons";

interface ActionOption {
    label: string;
    onClick: () => void;
    icon?: string;
    danger?: boolean;
}

interface TableActionProps {
    options: ActionOption[];
}

const TableAction: React.FC<TableActionProps> = ({ options }) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, showTop: false });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const updatePosition = useCallback(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const menuHeight = options.length * 40 + 16;

            // Check if there's space below
            const spaceBelow = windowHeight - rect.bottom;
            const shouldShowTop = spaceBelow < menuHeight && rect.top > menuHeight;

            setCoords({
                top: rect.top + window.scrollY,
                left: rect.right + window.scrollX,
                width: rect.width,
                showTop: shouldShowTop
            });
        }
    }, [options.length]);

    useEffect(() => {
        if (open) {
            updatePosition();
            window.addEventListener("scroll", updatePosition, true);
            window.addEventListener("resize", updatePosition);
        }
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open, updatePosition]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                // Also check if the click was inside the portal menu
                const portalMenu = document.getElementById("table-action-portal-menu");
                if (portalMenu && portalMenu.contains(event.target as Node)) return;

                setOpen(false);
            }
        };
        if (open) {
            window.addEventListener("mousedown", handleOutsideClick);
        }
        return () => window.removeEventListener("mousedown", handleOutsideClick);
    }, [open]);

    const menuHeight = options.length * 40 + 8; // approx

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                className="p-2 min-w-8 h-8 flex justify-center items-center hover:bg-white duration-300 rounded transition-all cursor-pointer focus:outline-none"
            >
                <Icons icon="vertical-dots" />
            </button>

            {open && mounted && createPortal(
                <div
                    id="table-action-portal-menu"
                    style={{
                        position: "absolute",
                        top: coords.showTop
                            ? `${coords.top - menuHeight - 8}px`
                            : `${coords.top + 40}px`, // 40 is approx button height
                        left: `${coords.left}px`,
                        zIndex: 9999,
                    }}
                    className="min-w-auto max-w-75 border border-off-white overflow-clip transform -translate-x-full rounded-lg bg-white"
                >
                    <div className="">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    option.onClick();
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center cursor-pointer px-4 text-nowrap py-2.5 text-sm font-medium transition-colors hover:bg-slate-50
                                    ${option.danger ? "text-red hover:bg-red/5" : "text-slate-700"}
                                `}
                            >
                                {option.icon && (
                                    <Icons icon={option.icon} className="mr-3 h-4 w-4" />
                                )}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default TableAction;

