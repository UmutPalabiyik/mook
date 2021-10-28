import LoginModal from "./LoginModal";
import { codBg } from "../Utils/Helpers/Backgrounds.helpers";
import Header from "./Header";


const Home = () => {
    return(
        <div className="home" style={{backgroundImage: `url(${codBg})`}}>
            <Header />
            <LoginModal />
        </div>
    )
}

export default Home;