import { useState, useEffect } from 'react';

export const BentoContainer = ({ children, title }) => {
    const [columnCount, setColumnCount] = useState(() => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 2560) return 3;
            if (window.innerWidth >= 1024) return 2;
            return 1;
        }
        return 2;
    });

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 2560) {
                setColumnCount(3);
            } else if (window.innerWidth >= 1024) {
                setColumnCount(2);
            } else {
                setColumnCount(1);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const getColumnStyles = () => {
        if (columnCount === 1) {
            return {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '0.5rem'
            };
        }
        return {
            columnCount,
            columnGap: '1rem',
            padding: '1rem'
        };
    };

    return (
        <div className="flex-col h-full w-screen">
            <header className="flex items-center bg-white z-10 py-2 px-2 sm:px-4">
                <div className="flex-1 text-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h1>
                </div>
            </header>

            <div
                className="overflow-y-auto bg-sky-500"
                style={getColumnStyles()}
            >
                {children}
            </div>
        </div>
    );
};