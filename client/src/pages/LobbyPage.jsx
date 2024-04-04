import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, getRequest } from "../../utils/services";

const LobbyPage = () => {
  const [codes, setCodes] = useState();
  const navigate = useNavigate();
  const title = "Choose code block";

  useEffect(() => {
    const getCode = async () => {
      const response = await getRequest(`${baseUrl}`);
      console.log(response);
      setCodes(response);
    };

    getCode();
  }, []);

  return (
    <div className="container">
      <h1>{title}</h1>
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
