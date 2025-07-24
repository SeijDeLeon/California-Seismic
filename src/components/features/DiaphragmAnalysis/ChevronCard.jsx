import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ChevronCard({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-lg flex items-center space-x-2">
          <span>{title}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </h2>
      </div>
      {isOpen && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}