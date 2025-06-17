"use client";

import { useRef } from "react";
import styles from "./AmbientBG.module.css";
import { useCurrentSong } from "../../contexts/CurrentSongContext";

export default function AmbientBG({ song }) {
  const { status } = useCurrentSong();
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={`${styles.background} ${status.isPlaying && styles.animation}`}
      style={{ backgroundImage: `url(${song.image})` }}
    />
  );
}
