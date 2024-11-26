import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Tests from "./pages/tests";
import Footer from "./components/Footer";
import SearchAlbum from "./pages/SearchAlbum";
import AlbumDetail from "./pages/AlbumDetail";
import MyAlbums from "./pages/MyAlbums";
import NotFound from "./pages/NotFound";

// ||||---------------------------
// VVVV   IMPORT THE KEYS FROM SPOTIFY STORED IN .ENV
let clientId = import.meta.env.VITE_CLIENT_ID;
let yourClientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [artist, setArtist] = useState({
    id: "",
    name: "",
    image: "",
    genres: [],
  });
  const [querySearch, setQuerySearch] = useState("");
  const [artistAlbuns, setArtistAlbuns] = useState([]);
  const [access, setAccess] = useState({});

  // ||||||-------------------------------||||||
  // VVVVVV  GET SPOTIFY API TOKEN_ACCESS VVVVVV
  useEffect(() => {
    async function apiAccess() {
      try {
        let getParams = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${yourClientSecret}`,
        };
        const url = "https://accounts.spotify.com/api/token";
        const response = await fetch(url, getParams);
        const data = await response.json();
        setAccess(data);
      } catch (error) {
        console.log(error);
      }
    }
    apiAccess();
  }, []);
  // ---------------------------------
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tests" element={<Tests />} />
        <Route
          path="/search-album"
          element={
            <SearchAlbum
              artist={artist}
              setArtist={setArtist}
              querySearch={querySearch}
              setQuerySearch={setQuerySearch}
              artistAlbuns={artistAlbuns}
              setArtistAlbuns={setArtistAlbuns}
              access={access}
              setAccess={setAccess}
            />
          }
        />
        <Route path="/my-albums" element={<MyAlbums />} />
        <Route
          path="/album/:albumId"
          element={<AlbumDetail access={access} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/tests" element={<Tests />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
