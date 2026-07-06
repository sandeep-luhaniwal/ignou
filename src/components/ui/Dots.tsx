import React from 'react'

interface DotsProps {
    xs?: boolean;
    sm?: boolean;
    orange?: boolean;
    blue?: boolean;
    gray?: boolean;
    yellow?: boolean;
    red?: boolean;
    white?: boolean;
    green?: boolean;
    className?: string;
}

const Dots: React.FC<DotsProps> = ({ xs, sm, orange, blue, gray, yellow, red, white, className, green }) => {
    return (
        <span
            className={`
        rounded-full inline-block shrink ${className}
        ${xs ? "w-1.5 h-1.5 min-w-1.5" : sm ? "w-2 h-2 min-w-2" : "w-1 h-1 min-w-1"}
        ${orange ? "bg-orange" : blue ? "bg-blue" : green ? "bg-off-green" : white ? "bg-white" : gray ? "bg-gray" : yellow ? "bg-yellow" : red ? "bg-red" : "bg-green"}
      `}
        />
    );
};

export default Dots;
