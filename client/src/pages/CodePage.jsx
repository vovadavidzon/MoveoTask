import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "highlight.js/styles/default.css";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

const CodePage = () => {
  const location = useLocation();
  const data = location.state.code;
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState(null);
  const [updatedCode, setupdatedCode] = useState(data?.code);
  const [smileyDisplayed, setSmileyDisplayed] = useState(false);

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

    newSocket.on("show_smiley_face", () => {
      setSmileyDisplayed(true);
    });

    return () => {
      console.log("DISCONNECT");
      newSocket.emit("beforeDisconnect", data);
      newSocket.disconnect();
    };
  }, [role]);

  const onEditorChange = (value, event) => {
    socket.emit("update_code", { value, data });

    console.log(value);
  };

  return (
    <div>
      {smileyDisplayed && (
        <div className="popup">
          {smileyDisplayed && <span className="big-smiley"> 😊</span>}
        </div>
      )}

      <Editor
        height="100vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        //defaultValue={updatedCode}
        onChange={onEditorChange} // activate on every change
        options={{ readOnly: role === "mentor", fontSize: "25px" }}
        value={updatedCode}
      />
    </div>
  );
};

export default CodePage;
