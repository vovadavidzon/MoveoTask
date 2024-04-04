const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5174" });

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

  socket.on("update_code", (obj) => {
    const studentCode = obj.value;
    const roomId = obj.data._id;

    const singleLineText1 = studentCode.replace(/\s/g, "");
    const singleLineText2 = obj.data.solution.replace(/\s/g, "");

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

io.listen(3000);
