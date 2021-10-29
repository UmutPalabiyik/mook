import { useState } from 'react'

import LoginModal from './LoginModal';
import { codBg } from '../Utils/Helpers/Backgrounds.helpers';
import Header from './Header';


const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const toggleModalShow = () => {
        setShowModal(!showModal)
        console.log("modal case", showModal)
    }

    return(
        <div className="home" style={{backgroundImage: `url(${codBg})`}}>
            <Header toggleModalShow={toggleModalShow}/>
            <LoginModal toggleModalShow={toggleModalShow} showModal={showModal}/>
        </div>
    )
}

export default Home;