import { useEffect, useRef } from "react";

const Tooltip = ({ children, content, spacing = 10 }) => {
  const containerRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const resize = () => {
      const containerRect = containerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()

      // determines position of tooltip based on screen width
      if (containerRect.right + tooltipRect.width < window.innerWidth) { // right of container
        tooltipRef.current.style.transform = `translateX(${containerRect.width + spacing}px)`;
        tooltipRef.current.style.maxWidth = "250px";
      }
      else if (containerRect.left - tooltipRect.width > 0) { // left of container
        tooltipRef.current.style.transform = `translateX(calc(-100% - ${spacing}px))`;
        tooltipRef.current.style.maxWidth = "250px";
      }
      else { // fit within the screen
        tooltipRef.current.style.transform = `translateX(${-containerRect.left + spacing}px)`;
        tooltipRef.current.style.maxWidth = `${window.innerWidth - 2 * spacing}px`;
      }
    }

    window.addEventListener("resize", resize);
    resize(); // need to position correctly on initial render too
    return () => window.removeEventListener("resize", resize);
  }, [])

  return (
    <div ref={containerRef} className="group relative w-fit">
      {children}
      <span ref={tooltipRef}
        className="absolute -top-[2px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-black text-white p-1 rounded z-10 w-max max-w-[250px]"
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;