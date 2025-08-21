import React from "react";
import BaseShearCard from "./BaseShearCard";
import { Loader } from "../../common/Loader";

const BaseShearOutput = React.memo(function BaseShearOutput({ results, inputs, isLoading }) {
    const currentlyValid = inputs.shortPeriodSpectralAcceleration &&
        inputs.longPeriodSpectralAcceleration &&
        inputs.longPeriodTransitionPeriod;

    return (
        <div className="w-full">
            <div className="space-y-3">
                {!currentlyValid ? (
                    <div className="text-center py-8">
                        <p className="text-red-600 font-semibold mb-2">
                            ⚠️ Invalid Input Values
                        </p>
                        <p className="text-gray-600 text-sm">
                            Please provide valid Short Period Acceleration (Ss), Long Period Acceleration (S1), and Long Period Transition Period (TL) to see updated results.
                        </p>
                    </div>
                ) : isLoading ? (
                    <Loader title={"Calculating seismic analysis..."} />
                ) : (
                    <BaseShearCard results={results} inputs={inputs} />
                )}
            </div>
        </div>
    );
});

export default BaseShearOutput;