import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Home from "./Container/Home";
import SupportedGames from "./Container/SupportedGames";
import "./Styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Game from "./Screens/Game.Screen";
import ScrollToTop from "./Utils/Helpers/ScrollToTop";



const App = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
    setShowModal(!showModal);
  };

  return (

    <div className="app">
      <Router>
        <ScrollToTop>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    toggleModalShow={toggleModalShow}
                    showModal={showModal}
                  />
                  <main className="main">
                    <Home />
                    <SupportedGames />
                  </main>
                </>
              }
            />
            <Route
              path="/games/:game"
              element={
                <>
                  <Header
                    toggleModalShow={toggleModalShow}
                    showModal={showModal}
                  />
                  <Game />
                </>
              }
            />
          </Routes>
        </ScrollToTop>
      </Router>
    </div>

  );
};

export default App;
