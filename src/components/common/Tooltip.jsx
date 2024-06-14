import React, { useState } from "react";

const Tooltip = ({ children, content }) => {
  //   const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      //   onMouseEnter={() => setIsVisible(true)}
      //   onMouseLeave={() => setIsVisible(false)}
      className="group relative flex"
    >
      {children}
      <span
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition
      bg-gray-500 text-white p-1 rounded absolute left-3/4 top-[-35px] whitespace-nowrap
      "
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
