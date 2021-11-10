/* import { codBg } from "../Utils/Helpers/Images.helpers"; */
import { star_wars_jedi_fallen_order } from "../Utils/Helpers/Images.helpers";

const Home = () => {
  return (
    <section
      className="home section " /* style={{ backgroundImage: `url(${codBg})` }} */
    >
      <div className="home__container container grid">
        <img className="home__img" src={star_wars_jedi_fallen_order} alt="" />
        <div className="home__data">
          <h1 className="home__title">Don't play alone</h1>
          <p className="home__description">You can find friends to play with together here.</p>
          
        </div>
      </div>
    </section>
  );
};

export default Home;
