export const Loader = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-solid rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 border-solid rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-blue-600 font-medium text-sm">
                {title}
            </p>
        </div>
    );
};
