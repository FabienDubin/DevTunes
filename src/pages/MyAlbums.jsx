import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/MyAlbums.css";

const MyAlbums = ({ user }) => {
  const [userAlbums, setUserAlbums] = useState([]);

  const userId = 3;

  let albums = [];
  useEffect(() => {
    async function getCollection() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/users/${userId}`
        );
        setUserAlbums(data.collection);
        console.log(data.collection);
      } catch (error) {
        console.log(error);
      }
    }
    getCollection();
  }, []);

  return (
    <div>
      <div className="myalbumspage">
        <p>No albums found in your collection.</p>
      </div>
      <div>
        {/* <h1>{userId.name}'s Collection</h1> */}

        {userAlbums &&
          userAlbums.map((album) => {
            return (
              <div>
                <h1 key={album.id}>{album.name}</h1>
              </div>
            );
          })}
        {/* {userAlbums.length === 0 ? (
				<p>No albums found in your collection.</p>
			) : (
				<div>
					{userAlbums.map((album) => (
            <h1></h1>
            <Card key={album.id}>
              <CardContent>
                <div>
                  <Avatar>
                    <AvatarImage src={album.images[0].url} />
                  </Avatar>
                  <CardTitle>{album.artists[0].name}</CardTitle>
                  <div>
                    <h4>{album.name}</h4>
                    <p>Tracks: {album.total_tracks}</p>
                  </div>
                </div>
              </CardContent>
              <Badge variant="default">
                Launched: {album.release_date}
              </Badge>
              <Button asChild>
                <Link to={`/album/${album.id}`}>Go To Album</Link>
              </Button>
            </Card>
          ))}
				</div>
			)} */}
      </div>
    </div>
  );
};

export default MyAlbums;
