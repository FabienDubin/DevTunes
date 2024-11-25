import "./App.css";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Tests from "./pages/tests";
import Footer from "./components/Footer";
import SearchAlbum from "./pages/SearchAlbum";
import AlbumDetail from "./pages/AlbumDetail";
import MyAlbums from "./pages/MyAlbums";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/search-album" element={<SearchAlbum />} />
        <Route path="/my-albums" element={<MyAlbums />} />
        <Route path="/album/:albumId" element={<AlbumDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/tests" element={<Tests />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
