import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../pages/AlbumDetail.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Headphones,
  Pencil,
  Send,
  CirclePlus,
  CircleMinus,
  CircleX,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_URL } from "@/config";

import dateFormat, { masks } from "dateformat";
const now = new Date();

const AlbumDetail = ({ access, navUser }) => {
  // CONSTS
  //Getting album ID from the previous page
  const { albumId } = useParams();

  const [album, setAlbum] = useState();
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();
  // ||||-------------------------
  // VVVV STATE FOR EDITED COMMENT
  const [editComment, setEditComment] = useState("");
  const navigate = useNavigate();
  // ---------------------------

  //Checking if the album is in the collection
  const [isInCollection, setIsInCollection] = useState(false);

  //Datas for new comment
  const [newComment, setNewComment] = useState("");

  //To be changed when the useContext is set (getting only id, name and img)
  const currentUser = navUser;

  //API CALLS
  useEffect(() => {
    //Spotify API call to get album details
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

    // JSON Server to get comments
    async function getAlbumComments() {
      try {
        const { data } = await axios.get(
          `${API_URL}/comments?albumId=${albumId}`
        );
        setComments(data);
        // console.log("got comments ;)", data);
      } catch (error) {
        console.log(error);
      }
    }
    getAlbumComments();
    // JSON Server to get users infos
    async function getUsers() {
      try {
        const { data } = await axios.get(`${API_URL}/users`);
        setUsers(data);
        console.log("got user ;)");
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, [albumId, access]);

  //FUNCTIONS
  //converting duration from millisec to minutes
  function convertDuration(duration) {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  //getting the used from comment object
  function getUsersbyId(userId) {
    return users.find((user) => user.id === userId);
  }
  //   if (users) {
  //     console.log("user found", getUsersbyId(3));
  //   }

  // JSON Server to check if the album is in the collection
  async function checkIfInCOllection() {
    try {
      const { data } = await axios.get(`${API_URL}/users/${currentUser.id}`);
      const userCollection = data.collection || [];
      const albumExists = userCollection.some((album) => album.id === albumId);
      setIsInCollection(albumExists);
    } catch (error) {
      console.log("error in chekIfInCollection", error);
    }
  }
  if (album) {
    checkIfInCOllection();
  }

  // JSON Server to add album to collection
  async function addAlbumToCollection() {
    try {
      const { data } = await axios.get(`${API_URL}/users/${currentUser.id}`);
      const userCollection = data.collection || [];

      //Add album to the collection
      await axios.patch(`${API_URL}/users/${currentUser.id}`, {
        collection: [album, ...userCollection],
      });
      setIsInCollection(true);
    } catch (error) {
      console.log(error);
    }
  }

  //JSON Server Remove album from collection
  async function removeAlbumFromCollection() {
    try {
      const { data } = await axios.get(`${API_URL}/users/${currentUser.id}`);
      const userCollection = data.collection || [];

      // remove album from the collection
      const updatedCollection = userCollection.filter(
        (item) => item.id !== albumId
      );
      await axios.patch(`${API_URL}/users/${currentUser.id}`, {
        collection: updatedCollection,
      });

      setIsInCollection(false);
    } catch (error) {
      console.log(error);
    }
  }

  //handle submit comment
  async function handleNewComment(e) {
    e.preventDefault();
    if (newComment !== "") {
      const newCommentData = {
        id: uuidv4(),
        comment: newComment,
        userId: currentUser.id,
        userName: currentUser.name,
        userImg: currentUser.image,
        created: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
        albumId: albumId,
      };
      try {
        const { data } = await axios.post(
          `${API_URL}/comments`,
          newCommentData
        );
        setComments([data, ...comments]);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  //handle delete a comment
  async function handleDeleteComment(commentId) {
    try {
      const { data } = await axios.delete(`${API_URL}/comments/${commentId}`);
      console.log("comment deleted");
    } catch (error) {
      console.log("delete comment", error);
    }
    setComments(
      comments.filter((comment) => {
        if (comment.id != commentId) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
  // ||||------------------------------
  // VVVV   EDIT COMMENT -------------

  async function handleEditComment(commentId) {
    try {
      const { data } = await axios(`${API_URL}/comments/${commentId}`);
    } catch (error) {
      console.log("delete comment", error);
    }
  }

  function handleUpdate(comment) {
    let update = {
      id: comment.id,
      comment: editComment,
      created: comment.created,
      albumId: comment.albumId,
      userId: comment.userId,
    };

    let updateArray = comments.map((coms) => {
      if (coms.id == update.id) {
        return update;
      } else {
        return coms;
      }
    });
    setComments(updateArray);
    async function updateDBJson() {
      try {
        let response = await axios.patch(
          `${API_URL}/comments/${update.id}`,
          update
        );
      } catch (error) {
        console.log(error);
      }
    }
    updateDBJson();
  }
  //////////------DETAIL PAGE--------/////

  if (!album) {
    return <div>Loading album information...</div>;
  }
  return (
    <div id="album-detail-id" className="album-detail">
      {/* -----------------------Album presentation---------------------*/}
      <div className="header-container">
        <img src={album.images[1].url} alt={album.name} />
        <div className="header-title">
          <h1>{album.name}</h1>
          <h2>{album.artists[0].name} </h2>
          <h5>Label: {album.label}</h5>
          {/* ------------------------------------------------------ */}
          {/* -----------------------Link to Spotify---------------------*/}
          <div className="btn-container">
            <Link
              to={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="btn">
                <Headphones />
                Listen on Spotify
              </Button>
            </Link>
            {/* --------------------------------------------------------------------------- */}
            {/* -----------------------Add the albul to collection btn---------------------*/}
            <Button
              className="btn"
              variant={isInCollection ? "secondary" : ""}
              onClick={
                isInCollection
                  ? removeAlbumFromCollection
                  : addAlbumToCollection
              }
            >
              {isInCollection ? <CircleMinus /> : <CirclePlus />}
              {isInCollection
                ? "Remove from my collection"
                : "Add to my collection"}
            </Button>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* -----------------------Tab container---------------------*/}
      <div className="tabs">
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList>
            <TabsTrigger value="tracks">Tracklist</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          {/* --------------------------------------------------------------------------- */}
          {/* -----------------------Tracks Table TAB---------------------*/}
          <TabsContent value="tracks">
            {/* --------------------------------------------------------------------------- */}
            {/* -----------------------Tracks Table---------------------*/}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Track</TableHead>
                  <TableHead>Artists</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {album.tracks.items.map((track) => (
                  <TableRow key={track.track_number}>
                    <TableCell className="font-medium">
                      {track.track_number}
                    </TableCell>
                    <TableCell>{track.name}</TableCell>
                    <TableCell>
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      {convertDuration(track.duration_ms)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* --------------------------------------------------------------------------- */}
            {/* -----------------------Comments Tab---------------------*/}
          </TabsContent>
          <TabsContent value="comments">
            {/* --------------------------------------------------------------------------- */}
            {/* -----------------------Comment Input container---------------------*/}
            <h4>Add a comment...</h4>
            <div className="comment-box">
              <div className="text-area">
                <Textarea
                  placeholder="Type your comment here."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <Button className="btn" onClick={handleNewComment}>
                <Send />
                Send
              </Button>
            </div>
            {/* --------------------------------------------------------------------------- */}
            {/* -----------------------All comments container---------------------*/}
            <div className="all-comments">
              {/* -----------------------map over the array of comments---------------------*/}
              {comments &&
                users &&
                comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <Card className="comment-card">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between ">
                            {/* --------------------------------------------------------------------------- */}
                            {/* -----------------------avatar, name, date and delete btn inline---------------------*/}
                            <div className="flex items-center">
                              <Avatar>
                                <AvatarImage
                                  className="avatar"
                                  src={comment.userImg}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="user-name">
                                {comment.userName}
                                <span className="creation-date">
                                  @ {comment.created}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col h-6">
                              {/* <<<<<<<<<< @Bruno-Franco : You can add the Dialog here for edit(https://ui.shadcn.com/docs/components/dialog)----------- */}

                              <Button
                                className="mb-2"
                                variant="destructive"
                                onClick={() => {
                                  handleDeleteComment(comment.id);
                                }}
                              >
                                <CircleX />
                              </Button>
                              {/* ---- EDIT COMMENT START BELLOW ----- */}
                              <Dialog>
                                <DialogTrigger>
                                  <Button
                                    className="border shadow"
                                    variant="ghost"
                                    onClick={() => {
                                      setEditComment(comment);
                                      handleEditComment(comment.id);
                                    }}
                                  >
                                    <Pencil />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Edit Your Commment Bellow!
                                    </DialogTitle>
                                    <DialogDescription>
                                      <Textarea
                                        value={editComment.comment}
                                        onChange={(e) => {
                                          setEditComment(e.target.value);
                                        }}
                                      />
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button
                                      className="border shadow"
                                      variant="ghost"
                                      onClick={() => {
                                        // |||
                                        // VVV UPDATE VAL
                                        handleUpdate(comment);
                                        navigate(`/album/${albumId}`);
                                      }}
                                    >
                                      <Send />
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              {/* ------------   END OF EDIT COMMENT ------ */}
                            </div>
                          </CardTitle>
                        </CardHeader>
                        {/* --------------------------------------------------------------------------- */}
                        {/* -----------------------text comment--------------------*/}
                        <CardContent>
                          <p>{comment.comment}</p>
                        </CardContent>
                        {/* --------------------------------------------------------------------------- */}
                      </Card>
                    </div>
                  );
                })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlbumDetail;
