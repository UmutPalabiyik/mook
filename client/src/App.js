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
import Account from "./Screens/Account.Screen";
import Footer from "./Container/Footer";


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModalShow = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="app">
      <Router>
        <ScrollToTop>
          <Header toggleModalShow={toggleModalShow} showModal={showModal} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <main className="main">
                    <Home />
                    <Footer />
                  </main>
                </>
              }
            />
            <Route
              path="/games/:game"
              element={
                <>
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
                    <Games />
                  </>
                }
              />
            </Route>

            <Route
              path="/account"
              element={<PrivateRoute isLoggedIn={isLoggedIn} />}
            >
              <Route
                path="/account"
                element={
                  <>
                    <Account />
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
