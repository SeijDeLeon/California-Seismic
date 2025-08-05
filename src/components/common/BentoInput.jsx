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
            case 'default':
            default:
                return <DefaultInput {...inputProps} />;
        }
    };

    return (
        <div className="w-full flex justify-between items-center mb-1 text-xs">
            <div className="w-1/3 flex items-center text-start">
                {label && (
                    <label className="text-xs text-black">
                        {label}
                    </label>
                )}

            </div>

            {equation && <EquationFormat value={equation} />}
            {renderInput()}
            {trailingUnit && (
                <span className="text-xs text-black">{trailingUnit}</span>
            )}
        </div>
    );
};