import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Home from "./routes/home";
import Auth from "./Auth";
import UserContext from "./userContext";
import { STORAGE } from './constants'

function App() {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    console.log('RENDER App.js')
    let activeUser = sessionStorage.getItem(STORAGE.ACTIVE_USER)
    activeUser = activeUser ? JSON.parse(activeUser) : activeUser
    setUser(activeUser)
    setAuthChecked(true)
  }, [])

  if (!isAuthChecked) return null

  return (
    <UserContext.Provider value={{ user, onSetUser: setUser }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
