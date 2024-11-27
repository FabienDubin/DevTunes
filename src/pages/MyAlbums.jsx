import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/MyAlbums.css";

const MyAlbums = ({ user, artist }) => {
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
        <h1 className="usercollectiontitle">{userId}'s Collection</h1>
      </div>
      <div className="cardpage">
        <CardContent className="cardcontent">
          {userAlbums &&
            userAlbums.map((album) => {
              return (
                <Card key={album.id} className="albumcard">
                  <div className="albumcard-container">
                    <Avatar>
                      <AvatarImage
                        className="avatarimage"
                        src={album.images[0].url}
                      />
                    </Avatar>
                    <div className="ml-2 text-sm">
                      <h4 className="albumname">{album.name}</h4>
                      <p className="albumtrack">Tracks: {album.total_tracks}</p>
                    </div>
                  </div>
                  <Badge
                    className="badge-no-pointer rounded-sm bg-black m-2"
                    variant="default"
                  >
                    Launched: {album.release_date}
                  </Badge>
                  <Button asChild className="rounded-sm mx-2 mb-2">
                    <Link to={`/album/${album.id}`}>Go To Album</Link>
                  </Button>
                </Card>
              );
            })}
        </CardContent>
      </div>
    </div>
  );
};

export default MyAlbums;
