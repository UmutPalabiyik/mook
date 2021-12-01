import { NavLink } from "react-router-dom";

const SupportedGameCard = ({ gameCard }) => {
  const { name, cardSvg, to } = gameCard;
  return (
    <NavLink className="supported-game-card" to={to}>
      <div className="supported-game-card__container">
        {cardSvg}
        <span className="supported-game-card__name">{name}</span>
      </div>
    </NavLink>
  );
};

export default SupportedGameCard;
