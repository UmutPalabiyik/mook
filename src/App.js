import { useState } from 'react'
import './App.scss';
import Header from './Components/Header';
import Home from './Container/Home';
import "./Styles/main.scss";


const App = () => {

  
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
      setShowModal(!showModal)
      console.log("modal case", showModal)
  }

  return(
      <div className="app">
        <Header toggleModalShow={toggleModalShow}/>
        <Home toggleModalShow={toggleModalShow} showModal={showModal}/>
        

      </div>
  )
}

export default App;