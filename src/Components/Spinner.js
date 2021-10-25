import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div className="container text-center d-flex align-items-center justify-content-center">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default Spinner;
