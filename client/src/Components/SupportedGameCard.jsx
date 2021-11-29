import { NavLink } from "react-router-dom";

const SupportedGameCard = ({ gameCard }) => {
  return (
    <NavLink className="supported-game-card" to="/">
      <div className="supported-game-card__container">
        {gameCard.cardSvg}
        <span className="supported-game-card__name">{gameCard.name}</span>
      </div>
    </NavLink>
  );
};

export default SupportedGameCard;
