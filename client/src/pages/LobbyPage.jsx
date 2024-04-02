import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const codeBlocks = [
  { id: 1, name: "Add Two Numbers" },
  { id: 2, name: "Error handling" },
  { id: 3, name: "Data fetching" },
  { id: 4, name: "Component lifecycle" },
];

const LobbyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((codeBlock) => (
          <li
            key={codeBlock.id}
            onClick={() => {
              navigate(`codepage/${codeBlock.id}`);
            }}
          >
            {" "}
            {codeBlock.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
