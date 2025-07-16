export const BentoColumn = ({ children, scrollable = false }) => {
    return (
        <div
            className={`gap-4 py-2 px-8 ${scrollable ? "overflow-y-auto max-h-screen scroll-smooth overscroll-contain" : ""
                } flex-auto border-r-6  border-black w-4/12 min-h-[300px] `}
        >
            {children}
        </div>
    );
};