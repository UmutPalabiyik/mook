import app from "../app.js";
import http from "http";
import socketApi from "../listeners/socketManager.js";


const server = http.createServer(app);

const io = socketApi(server);

io.attach(server);


server.listen(process.env.PORT, () => {
    console.log("Server is listening");
  });
