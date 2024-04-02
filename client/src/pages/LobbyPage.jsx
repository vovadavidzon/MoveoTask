import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { baseUrl, getRequest } from "../../utils/services";

const LobbyPage = () => {
  const [codes, setCodes] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getCode = async () => {
      const response = await getRequest(`${baseUrl}`);
      setCodes(response);
    };

    getCode();
  }, []);

  return (
    <div className="container">
      <h1>Choose code block</h1>
      <ul>
        {codes?.map((code) => (
          <li
            key={code._id}
            onClick={() => {
              navigate(`codepage/${code?._id}`, { state: { code } });
            }}
          >
            {code?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
