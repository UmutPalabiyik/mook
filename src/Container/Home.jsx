import LoginModal from './LoginModal';
import { codBg } from '../Utils/Helpers/Backgrounds.helpers';


const Home = ({toggleModalShow, showModal }) => {


    return(
        <div className="home" style={{backgroundImage: `url(${codBg})`}}>

            <LoginModal toggleModalShow={toggleModalShow} showModal={showModal}/>
        </div>
    )
}

export default Home;