export const BentoContainer = ({ children }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            {children}
        </div>
    );
};