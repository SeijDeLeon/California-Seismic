import React from "react";

function Step({ number, title, children }) {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-sm font-semibold">
        {number}
      </div>
      <div>
        <h3 className="text-base font-medium">{title}</h3>
        <div className="mt-1 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export default function Workflow({ steps }) {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <Step key={idx} number={idx + 1} title={step.title}>
          {step.content}
        </Step>
      ))}
    </div>
  );
}
