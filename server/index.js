const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const codeBlockRoute = require("./Routes/codeBlockRoute");
require("dotenv").config();
const { Server } = require("socket.io");

const app = express();

app.use(express.json());
app.use(cors());
app.use(codeBlockRoute);

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI;

const http = require("http");
const server = http.createServer(app);
//https://codesharelive.netlify.app
const io = new Server(server, {
  cors: {
    origin: "https://codesharelive.netlify.app",
    methods: ["GET", "POST"],
  },
});

let mentorExists = false;
let mentors = {};
let role;

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  // console.log(io.sockets.sockets.size);

  socket.on("join_code", (data) => {
    const mentorExists = mentors[data];

    role = mentorExists ? "student" : "mentor";
    if (mentorExists === undefined) {
      mentors[data] = data;
    }
    console.log(mentors);
    socket.join(data);

    socket.emit("role", { role });
  });

  socket.on("update_code", async (obj) => {
    try {
      const studentCode = await obj.value;
      const roomId = obj.data._id;
      const solution = obj.data.solution;
    } catch {
      console.log(" student error ");
    }

    const singleLineText1 = studentCode.replace(/\s/g, "");
    const singleLineText2 = solution.replace(/\s/g, "");

    if (singleLineText1.trim() === singleLineText2.trim()) {
      socket.to(roomId).emit("show_smiley_face");
    }
    socket.to(obj.data._id).emit("receive_update", obj.value);
  });

  if (mentorExists === false) {
    mentorExists = true;
  }

  socket.on("beforeDisconnect", (obj) => {
    if (io.sockets.adapter.rooms.get(obj._id)?.size === 1) {
      delete mentors[obj._id];
    }

    console.log("mentors", mentors);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(port, () => {
  console.log("server listening on port " + port);
});

mongoose
  .connect(uri, {})
  .then(() => console.log("Mongodb connection established"))
  .catch((err) => console.log("Mongodb connection failed:", err.message));
