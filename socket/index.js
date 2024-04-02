const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5174" });

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
});

io.listen(3000);
