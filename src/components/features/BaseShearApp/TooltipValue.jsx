import React, { useState } from "react";

export default function TooltipValue({ value, unit = "", reference, link, children }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="cursor-help border-b border-dotted border-gray-500">
                {children || (typeof value === 'number' && !isNaN(value) ? `${value.toFixed(3)} ${unit}` : 'N/A')}
            </span>
            {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
                    {reference && (
                        <div className="font-semibold">
                            {link ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">
                                    {reference}
                                </a>
                            ) : (
                                reference
                            )}
                        </div>
                    )}
                    {typeof value === 'number' && !isNaN(value) && (
                        <div>Value: {value.toFixed(6)} {unit}</div>
                    )}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </span>
    );
}
