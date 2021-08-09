import React from "react";
import logo from "../../assets/loadGtr.gif";

const Loading = () => {
  return (
    <div className="w-50 mx-auto">
      <img className="w-100 h-auto" src={logo} alt="loading..." />
    </div>
  );
};

export default Loading;
