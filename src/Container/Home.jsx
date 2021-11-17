import { star_wars_jedi_fallen_order, gta_5 } from "../Utils/Helpers/Images.helpers";

const Home = () => {
  return (
    <section className="home section">

      <div className="home__container grid container">
        <div className="home__row grid">
          <img
            className="home__img section__img home__img--order home__img--flip"
            src={star_wars_jedi_fallen_order}
            alt=""
          />
          <div className="home__data">
            <h1 className="home__title">Don't play alone</h1>
            <p className="home__description">
              You can find friends to play with together here. Wolves don't
              travel alone. Join a team. Enjoy more. You can find friends to
              play with together here. You can find friends to play with
              together here. Wolves don't travel alone. Join a team. Enjoy more.
            </p>
            <button className="home__button" href="/">
              Join the team
            </button>
          </div>
        </div>

        <div className="home__row grid">
          <img
            className="home__img section__img"
            src={gta_5}
            alt=""
          />
          <div className="home__data">
            <h1 className="home__title">Need a team ?</h1>
            <p className="home__description">
              You can find friends to play with together here. Wolves don't
              travel alone. Join a team. Enjoy more. You can find friends to
              play with together here. You can find friends to play with
              together here. Wolves don't travel alone. Join a team. Enjoy more.
            </p>
            <p className="home__description">
              You can find friends to play with together here. Wolves don't
              travel alone. Join a team. Enjoy more. You can find friends to
              play with together here. You can find friends to play with
              together here. Wolves don't travel alone. Join a team. Enjoy more.
            </p>
          </div>
        </div>
        

      </div>
    </section>
  );
};

export default Home;
