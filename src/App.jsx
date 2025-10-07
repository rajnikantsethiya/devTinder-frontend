import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import "./index.css";
import Feed from "./components/Feed";
import Body from "./components/Body";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Requests from "./components/Requests";
import Connections from "./components/Connections";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route exact path="/" element={<Body />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/feed" element={<Feed />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/requests" element={<Requests />} />
            <Route exact path="/connections" element={<Connections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
