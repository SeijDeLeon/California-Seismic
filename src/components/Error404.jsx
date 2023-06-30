import React from "react";
import page404 from "../assets/page404.png";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img src={page404} alt="page not found" />
      Image by{" "}
      <a href="https://www.freepik.com/free-vector/hand-drawn-404-error_1587605.htm#query=404%20page&position=45&from_view=keyword&track=ais">
        Freepik
      </a>
    </div>
  );
};

export default Error404;
