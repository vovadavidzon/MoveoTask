import { getRequest } from "../utils/services";
import { baseUrl } from "../utils/services";
import { useEffect, useState } from "react";

const [code, setCode] = useState();

useEffect(() => {
  const getCode = async () => {
    const response = await getRequest(`${baseUrl}/:codeBlockId`);
    setCode(response);
  };

  getCode();
}, []);
