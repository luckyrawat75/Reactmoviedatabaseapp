import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Singlemovie from "./Components/Singlemovie";
import Errorpage from "./Components/Error";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Singlemovie />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}

export default App;
