import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Home from "./Container/Home";
import "./Styles/main.scss";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="app">
      <Header toggleModalShow={toggleModalShow} showModal={showModal}/>
      <main className="main">
        <Home />
      </main>
    </div>
  );
};

export default App;
