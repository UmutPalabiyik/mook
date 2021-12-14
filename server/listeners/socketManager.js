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

    socket.on("game_lobby", ({id, email, room}) => {
      socket.join(room);
    });


    socket.on("send_message", ({name, message, room}) => {
      io.to(room).emit("message", {user: name, text: message})
    })
  });

  return io;
};

export default socketApi;

