import OutputTemplate from "../DiaphragmAnalysis/OutputTemplate";
import Workflow from "../DiaphragmAnalysis/Workflow";
import ChevronCard from "../DiaphragmAnalysis/ChevronCard";
import Tooltip from "../../common/Tooltip";
import { MathJax } from "better-react-mathjax";

export default function BaseShearCard({ results, inputs }) {
    const totalBaseShear = results.find(result => result.key === 'V')?.value || 0;
    const sds = results.find(result => result.key === 'SDS')?.value || 0;
    const sd1 = results.find(result => result.key === 'SD1')?.value || 0;
    const cs_final = results.find(result => result.key === 'Cs_final')?.value || 0;
    const ts = results.find(result => result.key === 'Ts')?.value || 0;
    const fv = results.find(result => result.key === 'Fv')?.value || 0;
    const fa = results.find(result => result.key === 'Fa')?.value || 0;
    const sms = results.find(result => result.key === 'SMS')?.value || 0;
    const sm1 = results.find(result => result.key === 'SM1')?.value || 0;
    const cs_initial = results.find(result => result.key === 'Cs_initial')?.value || 0;
    const cs_min = results.find(result => result.key === 'Cs_min')?.value || 0;
    const cs_max = results.find(result => result.key === 'Cs_max')?.value || 0;

    // Calculate total weight from floors
    const totalWeight = inputs.floors ? inputs.floors.reduce((sum, floor) => sum + (floor.weight || 0), 0) : 0;

    const workflow = [
        {
            title: "Calculate Site-Modified Spectral Acceleration Parameters",
            content: (
                <div className="space-y-3 text-center">
                    <div className="font-mono text-xs sm:text-sm">
                        <MathJax inline>{"\\(S_{MS} = F_a \\times S_s = \\)"}</MathJax>
                        <span>
                            <Tooltip value={fa} reference="ASCE 7-16 Table 11.4-1">
                                {fa.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" × "}
                        <span>
                            <Tooltip value={parseFloat(inputs.shortPeriodSpectralAcceleration)} unit="g">
                                {parseFloat(inputs.shortPeriodSpectralAcceleration).toFixed(2)}
                            </Tooltip>
                        </span>
                        {" g = "}
                        <span>
                            <Tooltip value={sms} unit="g" reference="ASCE 7-16 Equation 11.4-1">
                                {sms.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g"}
                    </div>
                    <div className="font-mono text-xs sm:text-sm">
                        <MathJax inline>{"\\(S_{M1} = F_v \\times S_1 = \\)"}</MathJax>
                        <span>
                            <Tooltip value={fv} reference="ASCE 7-16 Table 11.4-2">
                                {fv.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" × "}
                        <span>
                            <Tooltip value={parseFloat(inputs.longPeriodSpectralAcceleration)} unit="g">
                                {parseFloat(inputs.longPeriodSpectralAcceleration).toFixed(2)}
                            </Tooltip>
                        </span>
                        {" g = "}
                        <span>
                            <Tooltip value={sm1} unit="g" reference="ASCE 7-16 Equation 11.4-2">
                                {sm1.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g"}
                    </div>
                </div>
            ),
        },
        {
            title: "Determine Design Spectral Acceleration Parameters",
            content: (
                <div className="space-y-3 text-center">
                    <div className="font-mono text-xs sm:text-sm">
                        <MathJax inline>{"\\(S_{DS} = \\frac{2}{3} S_{MS} = \\frac{2}{3} \\times \\)"}</MathJax>
                        <span>
                            <Tooltip value={sms} unit="g" reference="ASCE 7-16 Equation 11.4-1">
                                {sms.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g = "}
                        <span>
                            <Tooltip value={sds} unit="g" reference="ASCE 7-16 Equation 11.4-3">
                                {sds.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g"}
                    </div>
                    <div className="font-mono text-xs sm:text-sm">
                        <MathJax inline>{"\\(S_{D1} = \\frac{2}{3} S_{M1} = \\frac{2}{3} \\times \\)"}</MathJax>
                        <span>
                            <Tooltip value={sm1} unit="g" reference="ASCE 7-16 Equation 11.4-2">
                                {sm1.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g = "}
                        <span>
                            <Tooltip value={sd1} unit="g" reference="ASCE 7-16 Equation 11.4-4">
                                {sd1.toFixed(3)}
                            </Tooltip>
                        </span>
                        {" g"}
                    </div>
                </div>
            ),
        },
        {
            title: "Calculate Seismic Response Coefficient",
            content: (
                <div className="space-y-3 text-center">
                    <div className="font-mono text-xs sm:text-sm">
                        <div className="mb-2">
                            <MathJax inline>{`\\(C_{s,initial} = \\frac{S_{DS}}{R/I_e} = \\frac{${sds.toFixed(3)}}{${parseFloat(inputs.R).toFixed(1)}/${parseFloat(inputs.Ie).toFixed(2)}} = ${cs_initial.toFixed(4)}\\)`}</MathJax>
                            <div className="text-xs text-gray-600 mt-1">
                                where{" "}
                                <Tooltip value={sds} unit="g" reference="ASCE 7-16 Equation 11.4-3">
                                    S<sub>DS</sub> = {sds.toFixed(3)} g
                                </Tooltip>
                                {", "}
                                <Tooltip value={parseFloat(inputs.R)} reference="ASCE 7-16 Table 12.2-1">
                                    R = {parseFloat(inputs.R).toFixed(1)}
                                </Tooltip>
                                {", "}
                                <Tooltip value={parseFloat(inputs.Ie)} reference="ASCE 7-16 Table 1.5-2">
                                    I<sub>e</sub> = {parseFloat(inputs.Ie).toFixed(2)}
                                </Tooltip>
                            </div>
                        </div>
                        <div className="mb-2">
                            <MathJax inline>{`\\(C_{s,min} = 0.044 S_{DS} I_e = 0.044 \\times ${sds.toFixed(3)} \\times ${parseFloat(inputs.Ie).toFixed(2)} = ${cs_min.toFixed(4)}\\)`}</MathJax>
                        </div>
                        <div className="mb-2">
                            <MathJax inline>{`\\(C_{s,max} = \\frac{S_{D1}}{T(R/I_e)} = \\frac{${sd1.toFixed(3)}}{${parseFloat(inputs.T).toFixed(2)} \\times (${parseFloat(inputs.R).toFixed(1)}/${parseFloat(inputs.Ie).toFixed(2)})} = ${cs_max.toFixed(4)}\\)`}</MathJax>
                            <div className="text-xs text-gray-600 mt-1">
                                where{" "}
                                <Tooltip value={sd1} unit="g" reference="ASCE 7-16 Equation 11.4-4">
                                    S<sub>D1</sub> = {sd1.toFixed(3)} g
                                </Tooltip>
                                {", "}
                                <Tooltip value={parseFloat(inputs.T)} unit="sec" reference="ASCE 7-16 Section 12.8.2">
                                    T = {parseFloat(inputs.T).toFixed(2)} sec
                                </Tooltip>
                            </div>
                        </div>
                        <div className="font-semibold">
                            <MathJax inline>{`\\(C_{s,final} = C_{s,max} < C_{s} < C_{s,min} = ${cs_min.toFixed(4)} < ${cs_initial.toFixed(4)} < ${cs_max.toFixed(4)} = ${cs_final.toFixed(4)}\\)`}</MathJax>
                            <div className="text-xs text-gray-600 mt-1">
                                <Tooltip value={cs_final} reference="ASCE 7-16 Section 12.8.1">
                                    Final seismic response coefficient
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Calculate Total Base Shear",
            content: (
                <div className="text-center">
                    <div className="font-mono text-xs sm:text-sm">
                        <MathJax inline>{"\\(V = C_s \\times W = \\)"}</MathJax>
                        <span className="pl-2">
                            <Tooltip value={cs_final} reference="ASCE 7-16 Equation 12.8-1">
                                {cs_final.toFixed(4)}
                            </Tooltip>
                        </span>
                        {" × "}
                        <span>
                            <Tooltip value={totalWeight} unit="kips" reference="ASCE 7-16 Section 12.7.2">
                                {totalWeight.toLocaleString()}
                            </Tooltip>
                        </span>
                        {" kips = "}
                        <span>
                            <Tooltip value={totalBaseShear} unit="kips" reference="ASCE 7-16 Section 12.8.1">
                                {typeof totalBaseShear === 'number' && !isNaN(totalBaseShear) ? totalBaseShear.toFixed(2) : 'N/A'}
                            </Tooltip>
                        </span>
                        {typeof totalBaseShear === 'number' && !isNaN(totalBaseShear) ? ' kips' : ''}
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                        Where W is the effective seismic weight of the structure
                    </div>
                </div>
            ),
        },
    ];


    // Key calculation results to display
    const calculationResults = [
        { key: 'Fa', value: fa, label: 'F_a', unit: '', description: 'Site Coefficient (Short Period)', reference: 'ASCE 7-16 Table 11.4-1' },
        { key: 'Fv', value: fv, label: 'F_v', unit: '', description: 'Site Coefficient (1-Second Period)', reference: 'ASCE 7-16 Table 11.4-2' },
        { key: 'SMS', value: sms, label: 'S_{MS}', unit: 'g', description: 'Site-Modified Spectral Acceleration (Short Period)', reference: 'ASCE 7-16 Eq. 11.4-1' },
        { key: 'SM1', value: sm1, label: 'S_{M1}', unit: 'g', description: 'Site-Modified Spectral Acceleration (1-Second)', reference: 'ASCE 7-16 Eq. 11.4-2' },
        { key: 'SDS', value: sds, label: 'S_{DS}', unit: 'g', description: 'Design Spectral Response Acceleration (Short Period)', reference: 'ASCE 7-16 Eq. 11.4-3' },
        { key: 'SD1', value: sd1, label: 'S_{D1}', unit: 'g', description: 'Design Spectral Response Acceleration (1-Second)', reference: 'ASCE 7-16 Eq. 11.4-4' },
        { key: 'Ts', value: ts, label: 'T_s', unit: 'sec', description: 'Short Period Transition', reference: 'ASCE 7-16 Eq. 11.4-5' },
        { key: 'Cs_initial', value: cs_initial, label: 'C_{s,initial}', unit: '', description: 'Initial Seismic Response Coefficient', reference: 'ASCE 7-16 Eq. 12.8-2' },
        { key: 'Cs_final', value: cs_final, label: 'C_s', unit: '', description: 'Final Seismic Response Coefficient', reference: 'ASCE 7-16 Section 12.8.1' },
        { key: 'V', value: totalBaseShear, label: 'V', unit: 'kips', description: 'Total Base Shear', reference: 'ASCE 7-16 Eq. 12.8-1' },
    ];

    return (
        <>
            <ChevronCard title="Base Shear Calculation">
                <OutputTemplate
                    workflow={<Workflow steps={workflow} />}
                />
                <div className="mt-4 border rounded p-3">
                    <h3 className="text-base sm:text-lg text-left font-semibold mb-3">
                        Calculation Results
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {calculationResults.map((result, index) => (
                            <div key={index} className="bg-gray-50 p-2 sm:p-3 rounded border relative">
                                <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    {result.description}
                                </div>
                                <div className="text-sm sm:text-lg font-bold text-blue-600">
                                    <Tooltip
                                        value={result.value}
                                        unit={result.unit}
                                        reference={result.reference}
                                    >
                                        {typeof result.value === 'number' && !isNaN(result.value)
                                            ? `${result.value.toFixed(3)} ${result.unit}`
                                            : 'N/A'
                                        }
                                    </Tooltip>
                                </div>
                                <div
                                    className="text-sm sm:text-base font-semibold text-gray-900 mb-1 absolute bottom-0 right-1"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <MathJax inline>{`\\(${result.label}\\)`}</MathJax>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ChevronCard>
        </>
    );
}
