import { DefaultInput, ListInput } from './BentoInputTypes';
import { EquationFormat } from './EquationFormat';

export const BentoInput = ({ label, value, equation, listItems, onChange, inputType, trailingUnit, tooltip }) => {
    const renderInput = () => {
        const inputProps = {
            value,
            onChange,
            tooltip,
        };

        switch (inputType) {
            case 'list':
                return <ListInput {...inputProps} listItems={listItems} />;
            default:
                return <DefaultInput {...inputProps} />;
        }
    };

    return (
        <div className="w-full grid grid-cols-3 gap-2 items-center mb-1 text-xs border-black border-opacity-20 border-b-2 pb-3">
            <div className="text-black text-xs text-left">{label}</div>

            <div className="flex justify-end">
                {equation && <EquationFormat value={equation} />}
            </div>

            {renderInput()}
            {trailingUnit && (
                <span className="ml-1 text-xs text-black">{trailingUnit}</span>
            )}
        </div>
    );
};