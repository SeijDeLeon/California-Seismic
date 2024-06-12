import React from "react";
import page404 from "../assets/images/page404.png";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center">
      <img src={page404} alt="page not found" className="w-3/5 h-1/3" />
      <a href="https://www.freepik.com/free-vector/hand-drawn-404-error_1587605.htm#query=404%20page&position=45&from_view=keyword&track=ais">
        Image by Freepik
      </a>
    </div>
  );
};

export default Error404;
