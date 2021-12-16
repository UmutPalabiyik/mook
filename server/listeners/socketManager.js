import { Server } from "socket.io";

const socketApi = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://mook-f2b4e.web.app", "http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    
    socket.on("disconnect", () => {
      console.log(`user ${socket.id} had left`);
    });

    socket.on("game_lobby", ({ id, username, room }) => {
      console.log("We have a new connetion.");

      socket.join(room);
      socket.emit("message", {
        user: "Admin",
        text: `${username} welcome to ${room} room`,
      });

    });

    socket.on("send_message", ({ name, message, room }) => {
      io.to(room).emit("message", { user: name, text: message });
    });

    
  });

  return io;
};

export default socketApi;
