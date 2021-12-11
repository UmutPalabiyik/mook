import { useParams } from "react-router-dom";
import { supportedGames } from "../Utils/Constants/Constants";

const Game = () => {
  const params = useParams();
  const game = supportedGames.find(
    (game) => game.to.split("/").at(-1) === params.game
  );

  console.log(game.background);

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

        <div className="game__chat"></div>

      </div>
    </div>
  );
};

export default Game;
