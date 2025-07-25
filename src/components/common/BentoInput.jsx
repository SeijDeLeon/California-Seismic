import { DefaultInput, ListInput } from './BentoInputTypes';
import { EquationFormat } from './EquationFormat';

export const BentoInput = ({ label, value, equation, listItems, onChange, inputType, trailingUnit }) => {
    const renderInput = () => {
        switch (inputType) {
            case 'list':
                return <ListInput value={value} listItems={listItems} onChange={onChange} />;
            case 'default':
            default:
                return <DefaultInput value={value} onChange={onChange} />;
        }
    };

    return (
        <div className="w-full flex justify-between items-center mb-1 text-xs">
            {label && (
                <div className="w-1/3 flex text-start">
                    <label className="text-xs text-black">{label}</label>
                </div>
            )}
            {equation && (
                <EquationFormat value={equation} />
            )}
            {renderInput()}
            {trailingUnit && (
                <span className="text-xs text-black">{trailingUnit}</span>
            )}
        </div>
    );
};