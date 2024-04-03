const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5174" });

let mentorExists = false;

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  let role = mentorExists ? "student" : "mentor";
  console.log(io.sockets.sockets.size);

  socket.on("join_code", (data) => {
    socket.join(data);

    socket.to(data).emit("role", { role });
  });

  socket.on("update_code", (obj) => {
    console.log("its valuee", obj.data._id);
    socket.to(obj.data._id).emit("receive_update", obj.value);
  });

  if (mentorExists === false) {
    mentorExists = true;
  }

  socket.on("disconnect", () => {
    if (role === "mentor") {
      if (io.sockets.sockets.size === 0) {
        mentorExists = false;
      }
    }
    console.log("client disconnected");
  });
});

io.listen(3000);
