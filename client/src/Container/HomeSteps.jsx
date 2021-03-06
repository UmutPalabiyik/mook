import StepCard from "../Components/StepCard";
import { stepCardInfos } from "../Utils/Constants/Constants";

const HomeSteps = () => {
  return (
    <section className="home-steps">
      <div className="home-steps__container grid">
        {stepCardInfos.map((card) => {
          const { cardId, cardTitle, cardName } = card;
          return (
            <StepCard
              cardId={cardId}
              cardTitle={cardTitle}
              cardName={cardName}
              key={cardId}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HomeSteps;
