import React, { ReactNode } from 'react'
interface CardProps {
    children?: ReactNode;
    className?: string;
    maxw?: string;
    darkwhite?: boolean;
    border?: boolean;
    pfour?: boolean;

}
const Card: React.FC<CardProps> = ({ children, className, darkwhite, border, pfour }) => {
    return (
        <div className={`${darkwhite ? "bg-dark-white" : "bg-white"} border ${border ? "border-border-white" : "border-transparent"} rounded-lg ${pfour ? "p-4" : "p-4 lg:p-6"} ${className}`}>
            {children}
        </div>
    )
}

export default Card
