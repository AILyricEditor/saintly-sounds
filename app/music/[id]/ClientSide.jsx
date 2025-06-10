"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ClientSide.module.css";
import { useCurrentSong } from "../../contexts/CurrentSongContext";

export default function AmbientSongBackground({ song }) {
  const { status } = useCurrentSong();
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={`${styles.background} ${status.isPlaying ? styles.animation : ""}`}
      // src={song.image}
      style={{ backgroundImage: `url(${song.image})` }}
    />
  );
}
