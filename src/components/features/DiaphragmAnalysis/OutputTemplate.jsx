import React from "react";
import Tooltip from "../../common/Tooltip";

export default function OutputTemplate({ description, formulas, workflow }) {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {description && (
          <div className="border rounded p-3 flex flex-col">
            <Tooltip reference="Detailed explanation of the calculation method and assumptions">
              <h3 className="font-bold text-left mb-2">
                Description
              </h3>
            </Tooltip>
            <div className="flex flex-1 items-center justify-center">
              {description}
            </div>
          </div>
        )}
        {formulas && (
          <div className="space-y-3 border rounded p-3">
            <Tooltip reference="Mathematical equations used in the calculation process">
              <h2 className="text-left font-bold mb-2">
                Formula
              </h2>
            </Tooltip>
            {formulas}
          </div>
        )}
      </div>
      <div className="border rounded p-3">
        <Tooltip reference="Step-by-step breakdown of the calculation process with intermediate values">
          <h3 className="text-lg text-left font-semibold mb-2">
            Calculation Workflow
          </h3>
        </Tooltip>
        {workflow}
      </div>
    </div>
  );
}
