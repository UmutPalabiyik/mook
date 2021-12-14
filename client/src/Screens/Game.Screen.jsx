import { useParams } from "react-router-dom";
import { supportedGames } from "../Utils/Constants/Constants";
import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../Context/Socket";
import { FaFeatherAlt } from 'react-icons/fa';

const Game = () => {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const gameInfo = supportedGames.find(
    (game) => game.to.split("/").at(-1) === params.game
  );

  const {_id, email} = JSON.parse(localStorage.getItem("user")).user;

  const socket = useContext(SocketContext);



  useEffect(() => {

    socket.emit("game_lobby", {id: _id, email, room: gameInfo.name})

    return () => {
      socket.close();
    };
  }, [socket, _id, email, gameInfo.name]);


  useEffect(() => {
    socket.on("message", ({text}) => {
      setMessages(message => [...message, text])
      console.log(text);
    });
  })


  return (
    <div className="game section">
      <div className="game__container container">
        <header className="game__header">
          <ul className="game__header-list grid">
            <li className="game__header-item">Chat</li>
            <li className="game__header-item">Messages</li>
            <li className="game__header-item">Users</li>
          </ul>
        </header>

        <div className="game__body">
          <div className="game__chat">
          </div>
        </div>

        <div className="game__footer">
          <input className="game__footer-input" type="text" placeholder="Say something..."/>
          <FaFeatherAlt className="game__footer-icon" />
        </div>
      </div>
    </div>
  );
};

export default Game;

