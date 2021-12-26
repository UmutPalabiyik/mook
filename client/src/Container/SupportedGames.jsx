import SupportedGameCard from "../Components/SupportedGameCard";
import { supportedGames } from "../Utils/Constants/Constants";

const SupportedGames = () => {
  return (
    <section className="supported-games">
      <div className="supported-games__container container">
        <h2 className="supported-games__title">All Games ({supportedGames.length})</h2>
        <div className="supported-games__games">
          {supportedGames.map((gameCard) => {
            return <SupportedGameCard gameCard={gameCard} key={gameCard.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportedGames;
