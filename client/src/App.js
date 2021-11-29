import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Home from "./Container/Home";
import SupportedGames from "./Container/SupportedGames";
import "./Styles/main.scss";


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="app">
      <Header toggleModalShow={toggleModalShow} showModal={showModal}  />
      <main className="main">
        <Home toggleModalShow={toggleModalShow} />
        <SupportedGames />
      </main>
    </div>
  );
};

export default App;