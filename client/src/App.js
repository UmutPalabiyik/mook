import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Home from "./Container/Home";
import SupportedGames from "./Container/SupportedGames";
import "./Styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
    setShowModal(!showModal);
  };


  return (
    <div className="app">
      <Router>
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
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
