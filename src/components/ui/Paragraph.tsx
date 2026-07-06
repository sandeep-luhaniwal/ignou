"use client";
import React from 'react';

interface ParagraphProps {
    children: React.ReactNode,
    sm?: boolean,
    base?: boolean,
    lg?: boolean,
    xl?: boolean,
    white?: boolean,
    center?: boolean,
    medium?: boolean,
    semibold?: boolean,
    bold?: boolean,
    extrabold?: boolean,
    right?: boolean,
    sora?: boolean,
    hoveryellow?: boolean,
    hoverpink?: boolean,
    black?: boolean,
    pink?: boolean,
    gray?: boolean,
    light?: boolean,
    xs?: boolean,
    blue?: boolean,
    italic?: boolean,
    grayprimary?: boolean,
    red?: boolean,
    green?: boolean,
    orange?: boolean,
    mainblack?: boolean,
    maingreen?: boolean,
    maingray?: boolean,
    offgreen?: boolean,
    className?: string,
    size?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ children, italic, light, xs, center, right, sm, base, lg, xl, medium, semibold, bold, extrabold, red, black, mainblack, white, orange, gray, green, blue, maingreen, offgreen, className, sora, maingray, size }) => {
    const isSm = sm || size === "sm";
    const isBase = base || size === "base";
    const isLg = lg || size === "lg";
    const isXl = xl || size === "xl";
    const isXs = xs || size === "xs";

    return (
        <p className={`${isSm ? 'text-sm' : isBase ? 'text-sm md:text-base' : isXs ? 'text-xs' : isLg ? 'text-[15px] md:text-base lg:text-lg' : isXl ? 'text-base md:text-lg lg:text-xl' : "text-lg md:text-xl lg:text-[22px]"}
        ${medium ? "font-medium" : light ? "font-light" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"}
        ${center ? "mx-auto text-center" : right ? "text-right ms-auto" : "text-left"} ${italic ? "italic" : ""} 
         duration-300 ${className} ${sora ? "font-sora" : ""}
         ${black ? "text-black" : mainblack ? "text-main-black" : white ? "text-white" : orange ? "text-orange" : gray ? "text-gray" : green ? "text-green" : red ? "text-red" : offgreen ? "text-off-green" : blue ? "text-blue" : maingreen ? "text-main-green" : maingray ? "text-main-gray" : "text-main-gray"}
        `}>
            {children}
        </p>
    )
}

export default Paragraph
