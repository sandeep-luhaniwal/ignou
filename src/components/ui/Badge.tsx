import React from 'react'
import Icons from '../common/Icons'

interface BadgeProps {
    children: React.ReactNode,
    xs?: boolean,
    sm?: boolean,
    className?: string,
    orange?: boolean,
    blue?: boolean,
    gray?: boolean,
    yellow?: boolean,
    red?: boolean,
    roundedfull?: boolean,
    bgorange?: boolean,
    bgmainred?: boolean,
    icon?: string,
}
const Badge: React.FC<BadgeProps> = ({ children, xs, sm, className, orange, blue, gray, yellow, red, roundedfull, icon, bgorange, bgmainred }) => {
    return (
        <span className={`py-1 px-2 ${roundedfull ? "rounded-full" : "rounded-md"}
        ${xs ? "text-xs" : sm ? "text-sm" : "text-[10px]"} inline-flex items-center w-fit gap-1 leading-[105%]!
        ${orange ? "bg-light-orange text-orange" : bgmainred ? "bg-main-red text-white" : blue ? "bg-light-blue text-blue" : yellow ? "text-yellow bg-light-yellow" : gray ? "bg-light-gray text-gray" : red ? "bg-red/10 text-red" : bgorange ? "bg-orange text-white" : "bg-[#E6FAE5] text-off-green"}
        ${className}
        `}>
            {icon && <Icons icon={icon} className='' />}
            {children}
        </span>
    )
}

export default Badge
