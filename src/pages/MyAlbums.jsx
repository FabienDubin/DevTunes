import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";

const MyAlbums = ({ access, user }) => {
  const [userAlbums, setUserAlbums] = useState([]);

  const userID = 3;

  useEffect(() => {
    //   if (access && user) {
    //     fetchUserAlbums();
    //   }
    // }, [access, user]);

    async function getCollection() {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/users/${userID}`
        );
        setUserAlbums(data);
        console.log("got album ;)", data.collection);
      } catch (error) {
        console.log(error);
      }
    }
    getCollection();
  }, [access]);

  return (
    <div>
      {/* <h1>{user.name}'s Collection</h1> */}

      {userAlbums.length === 0 ? (
        <p>No albums found in your collection.</p>
      ) : (
        <div>
          {userAlbums.map((album) => (
            <h1 key={album}></h1>
            // <Card key={album.album.id}>
            //   <CardContent>
            //     <div>
            //       <Avatar>
            //         <AvatarImage src={album.album.images[0].url} />
            //       </Avatar>
            //       <CardTitle>{album.album.artists[0].name}</CardTitle>
            //       <div>
            //         <h4>{album.album.name}</h4>
            //         <p>Tracks: {album.album.total_tracks}</p>
            //       </div>
            //     </div>
            //   </CardContent>
            //   <Badge variant="default">
            //     Launched: {album.album.release_date}
            //   </Badge>
            //   <Button asChild>
            //     <Link to={`/album/${album.album.id}`}>Go To Album</Link>
            //   </Button>
            // </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAlbums;
