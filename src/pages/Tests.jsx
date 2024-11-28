import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/config";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";

const Tests = () => {
  //Getting all users on JSON Server
  const [users, setUsers] = useState();
  useEffect(() => {
    async function getAllUsers() {
      try {
        const { data } = await axios.get(`${API_URL}/users/`);
        console.log("got data ;)");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);

  //Getting Fab's album collection
  // Faking UserId useParam
  const userId = 3;

  const [records, setRecords] = useState();
  useEffect(() => {
    async function getUserRecords() {
      try {
        const { data } = await axios.get(`${API_URL}/users/${userId}`);
        setRecords(data.collection);
        console.log("got user data ;)", data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserRecords();
  }, []);
  return (
    <div>
      <h1>Tests</h1>

      <Button>Button</Button>
      <Button variant="secondary">Bouton 2</Button>

      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h1>All users api resquest</h1>
      <div className="test-user-cards-container">
        {users &&
          users.map((user, id) => {
            return (
              <Card key={id}>
                <CardHeader>
                  <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
      </div>

      {/* <h1>Fab's Collection</h1>
      <div className="Album-containers">
        {records &&
          records.map((record, id) => {
            console.log("the record", record);
            return (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>{record.name}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={record.images[0].url} alt="" />
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            );
          })}
      </div> */}
    </div>
  );
};

export default Tests;
