import { useState, useRef, useEffect } from 'react';

export const DefaultInput = ({ value, onChange }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder="Required"
            className="rounded border-black px-2 w-1/3 border-b-4 bg-gray-100 text-end"
            type="number"
            min="0.01"
            max="100"
            step="0.01"
            required
        />
    );
};

export const ListInput = ({ value, listItems, onChange }) => {
    const [showList, setShowList] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowList(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-1/3">
            <button
                type="button"
                className="w-full border-b-1 bg-gray-100  px-2 text-left hover:bg-gray-300"
                onClick={() => setShowList((prev) => !prev)}
            >
                {value || "Select an option"}
            </button>

            {showList && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white rounded shadow z-10 overflow-y-auto text-xs">
                    {listItems.map((item, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className="block w-full text-left px-2 hover:bg-gray-300 text-xs"
                            onClick={() => {
                                onChange(item);
                                setShowList(false);
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};