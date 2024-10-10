"use client";
import React, { useRef, useState } from "react";
import Avatar from "@/components/models/Avatar";
import { useScene } from "@/context/sceneContext";
export default function Model(props) {
  const message = "Home Page";
  const caracter = "Astronaut_FernandoTheFlamingo";

  const { scene, setScene } = useScene();

  const handleOnClick = (data) => {
    setScene(data);
  };
  return (
    <>
      <Avatar message={message} caracter={caracter} onData={handleOnClick} />
    </>
  );
}
