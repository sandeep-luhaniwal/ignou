import React, { ReactNode } from 'react'
import Link from 'next/link';
import Icons from '../common/Icons';

interface MainButtonProps {
    children: ReactNode;
    onClick?: () => void;
    url?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    light?: boolean;
    normal?: boolean;
    medium?: boolean;
    bold?: boolean;
    extrabold?: boolean;
    xs?: boolean;
    base?: boolean;
    center?: boolean;
    right?: boolean;
    mainblack?: boolean;
    icon?: string;
    iconclassName?: string;
    ten?: boolean;
    ptwo?: boolean;
    gray?: boolean;
    mainorange?: boolean;
    sora?: boolean;
}
const MainButton: React.FC<MainButtonProps> = ({ children, onClick, url, target = "_self", className = "", disabled = false, type = "button", light, normal, medium, bold, extrabold, xs, base, center, right, mainblack, mainorange, icon, iconclassName, ten, ptwo, gray, sora }) => {
    return (
        <>
            {url ? (
                <Link href={url} target={target}
                    className={`border-2 text-nowrap duration-300 rounded-lg group/button cursor-pointer px-2.5 md:px-4 lg:px-5 lg:rounded-xl flex items-center gap-1.5 lg:gap-2
                           ${className} ${ptwo ? "py-2" : "py-2.5"} ${sora ? "font-sora" : ""}
                            ${medium ? "font-medium" : light ? "font-light" : normal ? "font-normal" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-semibold"}
                            ${xs ? 'text-xs' : base ? 'text-base' : ten ? "text-[10px]" : 'text-sm'}
                            ${center ? "mx-auto text-center justify-center" : right ? "text-right ms-auto" : "text-left"}
                            ${mainblack ? "border-white text-white hover:text-main-black hover:bg-white" : mainorange ? "border-orange text-orange bg-transparent hover:bg-main-black" : gray ? "bg-light-gray text-gray hover:bg-orange hover:text-white" : "border-transparent text-white bg-custom-orange-gradient"} 
                           `}>
                    {icon && <Icons icon={icon} className={`${iconclassName} ${mainblack ? "fill-main-black group-hover/button:fill-white" : "fill-white"} duration-300`} />}
                    {children}
                </Link>
            ) :
                (
                    <button
                        type={type}
                        onClick={!disabled ? onClick : undefined}
                        disabled={disabled} className={`border-2 text-nowrap duration-300 rounded-lg group/button cursor-pointer px-2.5 md:px-4 lg:px-5 lg:rounded-xl flex items-center gap-1.5 lg:gap-2
                           ${className} ${ptwo ? "py-2" : "py-2.5"} ${sora ? "font-sora" : ""}
                            ${medium ? "font-medium" : light ? "font-light" : normal ? "font-normal" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-semibold"}
                            ${xs ? 'text-xs' : base ? 'text-base' : ten ? "text-[10px]" : 'text-sm'}
                            ${center ? "mx-auto text-center justify-center" : right ? "text-right ms-auto" : "text-left"}
                                                        ${mainblack ? "border-white text-white hover:text-main-black hover:bg-white" : mainorange ? "border-orange text-orange bg-transparent hover:bg-main-black" : gray ? "bg-light-gray text-gray hover:bg-orange hover:text-white" : "border-transparent text-white bg-custom-orange-gradient"} 
                           ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                            
                            `}>
                        {icon && <Icons icon={icon} className={`${iconclassName} ${mainblack ? "fill-main-black group-hover/button:fill-white" : "fill-white"} duration-300`} />}
                        {children}
                    </button>
                )}
        </>
    )
}

export default MainButton