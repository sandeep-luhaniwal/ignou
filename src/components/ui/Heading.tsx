"use client";
import React from 'react'

interface HeadingProps {
    children: React.ReactNode,
    small?: boolean,
    center?: boolean,
    medium?: boolean,
    semibold?: boolean,
    bold?: boolean,
    extrabold?: boolean,
    right?: boolean,
    big?: boolean,
    className?: string,
    mainblack?: boolean,
    white?: boolean,
    sora?: boolean,
    level?: number;
}

const Heading: React.FC<HeadingProps> = ({ children, center, right, small, big, className, medium, semibold, bold, extrabold, mainblack, white, sora, level = 2 }) => {
    const Tag = level === 1 ? "h1" : level === 3 ? "h3" : level === 4 ? "h4" : level === 5 ? "h5" : level === 6 ? "h6" : "h2";

    return (
        <Tag className={`
        ${className} ${small ? "text-xl md:text-2xl" : big ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}
        ${mainblack ? "text-main-black" : white ? "text-white" : "text-black"}
        ${medium ? "font-medium" : semibold ? "font-semibold" : bold ? "font-bold" : extrabold ? "font-extrabold" : "font-normal"}
        ${center ? "mx-auto text-center" : right ? "text-right ms-auto" : "text-left"} ${sora ? "font-sora" : ""}
        `}>
            {children}
        </Tag>
    )
}

export default Heading
