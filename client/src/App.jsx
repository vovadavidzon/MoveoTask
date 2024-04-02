import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LobbyPage from "./pages/LobbyPage";
import CodePage from "./pages/CodePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/codepage/:id" element={<CodePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
