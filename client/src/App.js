import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={LandingPage()}>
            <Route />
          </Route>
          <Route path="/login" element={LoginPage()}>
            <Route />
          </Route>
          <Route path="/register" element={RegisterPage()}>
            <Route />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
