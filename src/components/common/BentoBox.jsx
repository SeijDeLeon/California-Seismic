export const BentoBox = ({ title, children }) => (
    <div className="w-full rounded-lg mb-5 overflow-x-hidden font-mono bg-[#EFE6BB] shadow border border-blac pb-3">
        {title && (
            <h4 className="tracking-widest text-lg md:text-md lg:text-xl mb-3 text-center font-bold">
                {title}
            </h4>
        )}
        <div className="justify-between w-full h-auto flex flex-col p-1">
            {children}
        </div>
    </div>
);