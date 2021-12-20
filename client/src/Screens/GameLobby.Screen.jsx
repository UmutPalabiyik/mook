import { useParams } from "react-router-dom";
import { supportedGames } from "../Utils/Constants/Constants";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaFeatherAlt } from "react-icons/fa";
import GameLobbyChat from "../Components/GameLobbyChat";
import GamePrivateChat from "../Components/GamePrivateChat";
import GameLobbyUsers from "../Components/GameLobbyusers";

let socket;

const GameLobby = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lobbyList, setLobbyList] = useState([]);
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
    socket.emit("game_lobby", {
      userId: _id,
      userName: username,
      userRoom: gameInfo.name,
    });

    return () => {
      socket.emit("remove_user", {
        userId: _id,
        userName: username,
        userRoom: gameInfo.name,
      });
      socket.disconnect();
    };
  }, [_id, username, gameInfo.name]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      setMessages((prev) => [...prev, { user, text }]);
      scrollToBottom();
    });

    socket.on("lobby_list", ({ users }) => {
      users.forEach((user) => {
        user.self = user.userId === _id;
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
      });

      setLobbyList(users);
    });
  }, [_id]);

  useEffect(() => {
    socket.on("disconnected_user", ({ userId }) => {
      const newLobbyList = lobbyList.filter((user) => user.userId !== userId);
      setLobbyList(newLobbyList);
    });
  }, [lobbyList]);

  const sendMessage = () => {
    if (message) {
      socket.emit("send_message", {
        userName: username,
        userMessage: message,
        userRoom: gameInfo.name,
      });

      setMessage("");
    }
  };

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const activeContent =
    activeTab === 1 ? (
      <GameLobbyChat
        messages={messages}
        endToMessages={endToMessages}
        username={username}
      />
    ) : activeTab === 2 ? (
      <GamePrivateChat />
    ) : activeTab === 3 ? (
      <GameLobbyUsers lobbyList={lobbyList} />
    ) : null;

  return (
    <div className="game-lobby section">
      <div className="game-lobby__container container">
        <header className="game-lobby__header">
          <ul className="game-lobby__header-list grid">
            <li
              className={`game-lobby__header-item ${
                activeTab === 1 ? "game-lobby__active-tab" : ""
              }`}
              onClick={() => toggleTab(1)}
            >
              Lobby
            </li>
            <li
              className={`game-lobby__header-item ${
                activeTab === 2 ? "game-lobby__active-tab" : ""
              }`}
              onClick={() => toggleTab(2)}
            >
              Messages
            </li>
            <li
              className={`game-lobby__header-item ${
                activeTab === 3 ? "game-lobby__active-tab" : ""
              }`}
              onClick={() => toggleTab(3)}
            >
              Users
            </li>
          </ul>
        </header>
        <div className="game-lobby__body">{activeContent}</div>
        <div className="game-lobby__footer">
          <input
            className="game-lobby__footer-input"
            type="text"
            value={message}
            placeholder="Say something..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" ? sendMessage(e.target.value) : null
            }
          />
          <FaFeatherAlt
            className="game-lobby__footer-icon"
            onClick={() => sendMessage(message)}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
