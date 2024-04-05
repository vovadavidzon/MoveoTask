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
    const newSocket = io("https://moveotask-e3ib.onrender.com/");
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
      newSocket.emit("beforeDisconnect", data);
      newSocket.disconnect();
    };
  }, [role]);

  const onEditorChange = (value, event) => {
    socket.emit("update_code", { value, data });

    console.log(value);
  };

  return (
    <>
      {smileyDisplayed && (
        <div className="popup">
          <img
            src="https://m.media-amazon.com/images/I/616qtZVqJ1L._AC_SL1500_.jpg"
            alt="Smiley"
          />
        </div>
      )}
      <div>
        <Editor
          height="100vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          onChange={onEditorChange} // activate on every change
          options={{ readOnly: role === "mentor", fontSize: "25px" }}
          value={updatedCode}
        />
      </div>
    </>
  );
};

export default CodePage;
