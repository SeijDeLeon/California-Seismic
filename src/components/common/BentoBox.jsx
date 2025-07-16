export const BentoBox = ({ title, children }) => (
    <div className="rounded-lg p-3 my-5 overflow-x-hidden  font-mono bg-[#EFE6BB] shadow border border-black h-fit min-w-[500px]">
        {title && <h4 className="tracking-widest text-4xl mb-8 text-center font-bold">{title}</h4>}
        <div className="gap-2 justify-between">
            {children}
        </div>
    </div>
);