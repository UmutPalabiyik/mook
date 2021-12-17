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
  const [activeTab, setActiveTab] = useState(1);
  const endToMessages = useRef(null);
  const gameInfo = supportedGames.find(
    (game) => game.to.split("/").at(-1) === params.game
  );

  const scrollToBottom = () => {
    endToMessages.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { _id, username } = JSON.parse(localStorage.getItem("user")).user;

  useEffect(() => {
    socket = io(process.env.REACT_APP_BASE_URL);
    socket.emit("game_lobby", { id: _id, username, room: gameInfo.name });

    return () => socket.disconnect();
  }, [_id, username, gameInfo.name]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((prev) => [...prev, { user, text }]);
      scrollToBottom();
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

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const lobbyChat = (
    <div className="game__lobby">
      {messages.map(({ user, text }, key) => {
        const selfMessage = user === username ? "game__chat--self" : null;
        return (
          <div className={`game__chat ${selfMessage}`} key={key}>
            {/*  <div className="game__chat-user">{user}</div> */}
            <div className="game__chat-message">{text}</div>
            <div ref={endToMessages}></div>
          </div>
        );
      })}
    </div>
  );

  const directMessageChat = (
    <div className="game__direct-message">blablabla</div>
  );

  const activeBody = activeTab === 1 ? lobbyChat : directMessageChat;

  return (
    <div className="game section">
      <div className="game__container container">
        <header className="game__header">
          <ul className="game__header-list grid">
            <li className="game__header-item" onClick={() => toggleTab(1)}>
              Lobby
            </li>
            <li className="game__header-item" onClick={() => toggleTab(2)}>
              Messages
            </li>
          </ul>
        </header>
        <div className="game__body">{activeBody}</div>
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
