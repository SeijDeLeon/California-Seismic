import { useState, useEffect } from 'react';

export const BentoContainer = ({ children, title }) => {
    const [columnCount, setColumnCount] = useState(() =>
        typeof window !== 'undefined' && window.innerWidth >= 2560 ? 3 : 2
    );

    useEffect(() => {
        const onResize = () => {
            setColumnCount(window.innerWidth >= 2560 ? 3 : 2);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);


    return (
        <div className="flex-col h-full w-screen">
            <header className="flex items-center bg-white z-10 py-2">
                <div className="flex-1 text-center">
                    <h1 className="text-4xl font-bold">{title}</h1>
                </div>
            </header>

            <div
                className={`overflow-y-auto p-4 bg-gray-500 ${columnCount === 3 ? 'grid-cols-[33vw] flex-row ' : 'grid-cols-[50vw]'}`}
                style={{
                    columnCount,
                    columnGap: '1rem'
                }}
            >
                {children}
            </div>
        </div>
    );
};