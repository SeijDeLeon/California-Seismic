export const BentoBox = ({ title, children }) => (
    <div className="w-full rounded-lg mb-5 overflow-x-hidden font-mono bg-slate-200 shadow border border-black pb-3">
        {title && (
            <h4 className="tracking-widest text-sm sm:text-base md:text-lg lg:text-xl mb-3 text-center font-bold px-2 py-2">
                {title}
            </h4>
        )}
        <div className="justify-between w-full h-auto flex flex-col p-2 sm:p-3">
            {children}
        </div>
    </div>
);