import { Server } from "socket.io";

const socketApi = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://mook-f2b4e.web.app", "http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("We have a new connetion.");

    socket.on("disconnect", () => {
      console.log(`user ${socket.id} had left`);
    });

    socket.on("join", ({ name, room }) => {
      console.log(`name: ${name} -- room: ${room} -- ${socket.id}`);
      socket.join(room)
      io.to(room).emit("messages")
    });
  });

  return io;
};

export default socketApi;
