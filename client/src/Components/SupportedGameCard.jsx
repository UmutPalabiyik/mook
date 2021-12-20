import { NavLink } from "react-router-dom";

const SupportedGameCard = ({ gameCard }) => {
  const { name, background, to, kinds } = gameCard;

  return (
    <NavLink className="supported-game-card" to={to}>
      <div className="supported-game-card__overlay supported-game-card__container">
        <div className="supported-game-card__container">
          <span className="supported-game-card__name">{name}</span>
          <div className="supported-game-card__separator"></div>
          <div className="supported-game-card__kinds">
            {kinds.map((kind) => {
              return (
                <span
                  className={`supported-game-card__kind supported-game-card__kind--${kind.toLowerCase()}`}
                >
                  {kind}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <img src={background} alt={name} className="supported-game-card__img" />
    </NavLink>
  );
};

export default SupportedGameCard;
