import { useParams } from "react-router-dom";
import { supportedGames } from "../Utils/Constants/Constants";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../Context/Socket";

const Game = () => {
  const params = useParams();
  const gameLobby = supportedGames.find(
    (game) => game.to.split("/").at(-1) === params.game
  );

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    return () => {
      socket.off("disconnect");
    };
  }, [socket]);

  const sendMessage = () => {
    socket.emit("join", { name, room: gameLobby.name });
  };

  return (
    <div className="game section">
      <div className="game__container container">
        <header className="game__header">
          <ul className="game__header-list grid">
            <li className="game__header-item">Chat</li>
            <li className="game__header-item">Messages</li>
            <li className="game__header-item">Friends</li>
          </ul>
        </header>

        <div className="game__chat">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="message"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button
            style={{ display: "block", width: "100%" }}
            onClick={sendMessage}
            onChange={(e) => setMessage(e.target.value)}
          >
            Join Room
          </button>

          <div>
            {
              message
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
