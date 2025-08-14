import { useState, useRef, useEffect } from 'react';

export const DefaultInput = ({ value, onChange, tooltip }) => {
    const formatValue = (raw) => {
        // Ensure number is parsed and rounded to 2 decimal places
        let num = parseFloat(raw);
        if (isNaN(num)) return '';
        return num.toFixed(2);
    };

    const handleBlur = (e) => {
        const formatted = formatValue(e.target.value);
        onChange({ target: { value: formatted } });
    };

    const handleChange = (e) => {
        const raw = e.target.value;
        if (/^\.\d*$/.test(raw)) {
            onChange({ target: { value: `0${raw}` } });
            return;
        }

        onChange(e);
    };

    return (
        <input
            title={tooltip}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Required"
            className="rounded border-black px-2 w-full border-b-4 bg-gray-100 text-end"
            type="number"
            min="0.01"
            max="100"
            step="0.01"
            required
        />
    );
};

export const ListInput = ({ value, listItems, onChange, tooltip }) => {
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
        <div ref={containerRef} className="relative w-full">
            <button
                type="button"
                title={tooltip}
                className="w-full border-b-1 bg-gray-100 px-2 text-left hover:bg-gray-300 pr-6" 
                onClick={() => setShowList((prev) => !prev)}
            >
                {value || "Select an option"}
            </button>
            <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-black">
                ▼
            </span>

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