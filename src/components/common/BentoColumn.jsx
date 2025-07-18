export const BentoColumn = ({ children }) => {
    return (
        <div
            className={`flex-auto h-screen overflow-auto w-full sm:w-full py-2 px-4 md:px-6 lg:px-8`}
        >
            {children}
        </div>
    );
};