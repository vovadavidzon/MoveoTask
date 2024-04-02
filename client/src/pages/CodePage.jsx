import React from "react";
import { useLocation } from "react-router-dom";

const CodePage = () => {
  const location = useLocation();
  const data = location.state.code;
  console.log(data);

  return <div>{data.code}</div>;
};

export default CodePage;
