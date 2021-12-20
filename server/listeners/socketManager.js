import { Server } from "socket.io";
import lobbyUserList from "../helpers/lobbyUserList.js";

const socketApi = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://mook-f2b4e.web.app", "http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

  const lobbyList = new lobbyUserList();

  io.on("connection", (socket) => {
    socket.on("game_lobby", ({ userId, userName, userRoom }) => {

      // Add a user to user list when user joined game_loby
      lobbyList.addUser({ userId, userName, userRoom });

      // User joined to specific user room name come from front-end 
      socket.join(userRoom);

      // First time when user join room, socket emit welcome room message
      socket.emit("message", {
        user: "Admin",
        text: `${userName} welcome to ${userRoom} room`,
      });

      // Sends list of users in the lobby
      io.to(userRoom).emit("lobby_list", { users: lobbyList.userList });
    });

      // Every time someone emit message, io emits message to all sockets
    socket.on("send_message", ({ userName, userMessage, userRoom }) => {
      io.to(userRoom).emit("message", { user: userName, text: userMessage });
    });

      // When user disconnect it emits discnnected user id to all socket to update user list 
    socket.on("remove_user", ({ userId, userName, userRoom }) => {
      lobbyList.removeUser(userId);
      io.to(userRoom).emit("disconnected_user", { userId });
    });

    socket.on("disconnect", () => {
      console.log(`user ${socket.id} had left`);
    });
  });

  return io;
};

export default socketApi;
