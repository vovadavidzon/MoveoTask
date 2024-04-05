import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, getRequest } from "../../utils/services";

const LobbyPage = () => {
  const [codes, setCodes] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const title = "Choose code block";

  useEffect(() => {
    const getCode = async () => {
      setLoading(true);
      const response = await getRequest(`${baseUrl}`);
      console.log(response);
      setCodes(response);

      setLoading(false);
    };

    getCode();
  }, []);

  return (
    <div className="background-image">
      {
        <div className="container">
          <h1>{title}</h1>

          {loading ? (
            "Loading..."
          ) : (
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
          )}
        </div>
      }
    </div>
  );
};

export default LobbyPage;
