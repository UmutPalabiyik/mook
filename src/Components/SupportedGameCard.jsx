const SupportedGameCard = ({ gameCard }) => {
  return (
    <div className="supported-game-card">
      <div className="supported-game-card__container">
        {gameCard.cardSvg}
        <span className="supported-game-card__name">{gameCard.name}</span>
      </div>
    </div>
  );
};

export default SupportedGameCard;
