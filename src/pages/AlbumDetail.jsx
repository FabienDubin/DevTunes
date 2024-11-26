import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumDetail = ({ access }) => {
  //Getting album ID from the previous page
  const { albumId } = useParams();

  // console.log(access.access_token);

  //ALBUM INFO VIA SPOTIFY API
  const [album, setAlbum] = useState();
  const [comments, setComments] = useState();
  useEffect(() => {
    async function getAlbumInfos() {
      try {
        console.log(access.access_token);
        const { data } = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}`,
          {
            headers: {
              Authorization: `Bearer ${access.access_token}`,
            },
          }
        );
        setAlbum(data);
        console.log("got album datas", data);
      } catch (error) {
        console.log(error);
      }
    }
    // wait to getting the token
    if (access.access_token) {
      getAlbumInfos();
    }

    // COMMENTS VIA JSON SERVER
    async function getAlbumComments() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/comments?albumId=${albumId}`
        );
        setComments(data);
        console.log("got comments ;)", data);
      } catch (error) {
        console.log(error);
      }
    }
    getAlbumComments();
  }, [albumId, access]);

  if (!album) {
    return <div>Loading album information...</div>;
  }
  return (
    <div>
      <div className="header-container">
        <img src={album.images[1].url} alt={album.name} />
        <div className="header-title">
          <h1>{album.name}</h1>
          <h2>{album.artists[0].name} </h2>
          <h3>Label: {album.label}</h3>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
