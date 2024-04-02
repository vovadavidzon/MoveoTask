import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

const CodePage = () => {
  const [socket, setSocket] = useState(null);
  const location = useLocation();
  const data = location.state.code;
  console.log(data);

  //intial socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000"); //connect to socket server
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      {/* <Highlight language="javascript" className="custom-code-block">
         
        <input type="text" value={data.code} />
      </Highlight> */}
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={data.code}
        onChange={() => {
          console.log("change");
        }}
      />
    </div>
  );
};

export default CodePage;
