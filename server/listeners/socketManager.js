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
      lobbyList.addUser({ userId, userName, userRoom });
      console.log("Kullanici listesi : ", lobbyList.userList);
      socket.join(userRoom);
      socket.emit("message", {
        user: "Admin",
        text: `${userName} welcome to ${userRoom} room`,
      });
      io.to(userRoom).emit("lobby_list", { users: lobbyList.userList });
    });

    socket.on("send_message", ({ userName, userMessage, userRoom }) => {
      io.to(userRoom).emit("message", { user: userName, text: userMessage });
    });

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
