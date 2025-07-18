export const BentoBox = ({ title, children }) => (
    <div className="rounded-lg p-3 my-5 overflow-x-hidden font-mono bg-[#EFE6BB] shadow border border-black">
        {title && (
            <h4 className="tracking-widest text-2xl md:text-3xl lg:text-4xl mb-8 text-center font-bold">
                {title}
            </h4>
        )}
        <div className="justify-between">
            {children}
        </div>
    </div>
);