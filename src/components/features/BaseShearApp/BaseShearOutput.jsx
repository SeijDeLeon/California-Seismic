import React from "react";
import BaseShearCard from "./BaseShearCard";

export default function BaseShearOutput({ results, inputs }) {
    return (
        <div className="rounded-lg border-2 border-blue-500 p-4 w-full">
            <h1 className="text-blue-600 text-xl font-semibold mb-4 text-left">
                Base Shear Analysis Results
            </h1>
            <div className="space-y-3">
                <BaseShearCard results={results} inputs={inputs} />
            </div>
        </div>
    );
}