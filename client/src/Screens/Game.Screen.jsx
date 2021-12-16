import { useParams } from "react-router-dom";
import { supportedGames } from "../Utils/Constants/Constants";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaFeatherAlt } from "react-icons/fa";

let socket;

const Game = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endToMessages = useRef(null);
  const gameInfo = supportedGames.find(
    (game) => game.to.split("/").at(-1) === params.game
  );

  const scrollToBttom = () => {
    console.log("calıstı..")
    endToMessages.current?.scrollIntoView({ behavior: "smooth" });
  }

  const { _id, username } = JSON.parse(localStorage.getItem("user")).user;


  useEffect(() => {
    socket = io(process.env.REACT_APP_BASE_URL);
    socket.emit("game_lobby", { id: _id, username, room: gameInfo.name });

    return () => socket.disconnect();
  }, [_id, username, gameInfo.name]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((prev) => [...prev, { user, text }]);
      scrollToBttom();
    });


  }, []);




  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", {
        name: username,
        message,
        room: gameInfo.name,
      });

      setMessage("");
      
    }
  };

  return (
    <div className="game section">
      <div className="game__container container">
        <header className="game__header">
          <ul className="game__header-list grid">
            <li className="game__header-item">Chat</li>
            <li className="game__header-item">Messages</li>
          </ul>
        </header>

        <div className="game__body">
          {messages.map((message, key) => {
            return (
              <div className="game__chat" key={key}>
                <div className="game__chat-user">
                  {message.user.split("@")[0]} :{" "}
                </div>
                <div className="game__chat-message">{message.text}</div>
                <div ref={endToMessages}></div>
              </div>
            );
          })}
        </div>

        <div className="game__footer">
          <input
            className="game__footer-input"
            type="text"
            value={message}
            placeholder="Say something..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" ? sendMessage(e.target.value) : null
            }
          />
          <FaFeatherAlt
            className="game__footer-icon"
            onClick={() => sendMessage(message)}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
