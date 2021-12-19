import { useState } from "react";
import { RiUserSearchFill } from "react-icons/ri";

const GameLobbyUsers = ({ lobbyList }) => {
  const [input, setInput] = useState("");

  const onChangeInput = (e) => {
    setInput(e.target.value);
  };

  const filteredUsers = lobbyList.filter((user) =>
    user.userName.includes(input.toLocaleLowerCase())
  );

  return (
    <div className="game-lobby-users">
      <div className="game-lobby-users__searching">
        <input
          className="game-lobby-users__input"
          placeholder="Search user"
          type="text"
          onChange={(e) => onChangeInput(e)}
        />
        <RiUserSearchFill className="game-lobby-users__icon" />
      </div>
      <ul className="game-lobby-users__list">
        {filteredUsers.map((user) => {
          const { userName, userId } = user;
          return (
            <li className="game-lobby-users__user">
              <div className="game-lobby-users__name">{userName}</div>
              <div className="game-lobby-users__tooltip"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameLobbyUsers;
