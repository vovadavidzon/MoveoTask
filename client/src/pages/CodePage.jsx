import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Highlight from "react-highlight";
import "highlight.js/styles/default.css";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

const CodePage = () => {
  const location = useLocation();
  const data = location.state.code;
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState(null);
  const [updatedCode, setupdatedCode] = useState(data?.code);

  //intial socket
  useEffect(() => {
    const newSocket = io("http://localhost:3000"); //connect to socket server
    setSocket(newSocket);
    if (data?._id !== "") {
      newSocket.emit("join_code", data?._id);
      newSocket.on("role", ({ role }) => {
        setRole(role);
        console.log(role);
      });
    }
    newSocket.on("receive_update", (data) => {
      setupdatedCode(data);
    });

    return () => {
      console.log("enterrrrrrr");

      newSocket.disconnect();
    };
  }, []);

  const onEditorChange = (value, event) => {
    socket.emit("update_code", { value, data });

    console.log(value);
  };

  return (
    <div>
      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        //defaultValue={updatedCode}
        onChange={onEditorChange} // activate on every change
        options={{ readOnly: role === "mentor" }}
        value={updatedCode}
      />
    </div>
  );
};

export default CodePage;
