import React from "react";

export default function OutputTemplate({ description, formulas, workflow }) {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded p-3 flex flex-col">
          <h3 className="font-bold text-left mb-2">Description</h3>
          <div className="flex flex-1 items-center justify-center">
            {description}
          </div>
        </div>
        <div className="space-y-3 border rounded p-3">
          <h2 className="text-left font-bold mb-2">Formula</h2>
          {formulas}
        </div>
      </div>
      <div className="border rounded p-3">
        <h3 className="text-lg text-left font-semibold mb-2">
          Calculation Workflow
        </h3>
        {workflow}
      </div>
    </div>
  );
}
