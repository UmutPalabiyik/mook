import { useState } from "react";
import "./App.scss";
import Header from "./Components/Header";
import Home from "./Container/Home";
import "./Styles/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GameLobby from "./Screens/GameLobby.Screen";
import ScrollToTop from "./Utils/Helpers/ScrollToTop";
import Games from "./Screens/Games.Screen";
import PrivateRoute from "./Utils/Helpers/PrivateRoute";
import isLoggedIn from "./Utils/Helpers/isLoggedIn.helpers";

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
                  <GameLobby />
                </>
              }
            />

            <Route
              path="/games"
              element={<PrivateRoute isLoggedIn={isLoggedIn} />}
            >
              <Route
                path="/games"
                element={
                  <>
                    <Header
                      toggleModalShow={toggleModalShow}
                      showModal={showModal}
                    />
                    <Games />
                  </>
                }
              />
            </Route>
          </Routes>
        </ScrollToTop>
      </Router>
    </div>
  );
};

export default App;
