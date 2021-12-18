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


    socket.on("game_lobby", async ({ id, username, room }) => {

      const roomSockets = await io.in(room).fetchSockets()
      roomSockets.forEach(e => console.log(e.handshake.auth))

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


