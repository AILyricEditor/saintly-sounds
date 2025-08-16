"use client";

import styles from "./AmbientBG.module.css";
import { useCurrentSong } from "../../contexts/CurrentSongContext";

export default function AmbientBG({ song, className, style, animation = true }) {
  const { status, tools } = useCurrentSong();

  return (
    <div
      className={`${className} ${styles.background} ${animation && status.isPlaying && styles.animation}`}
      style={{ ...style, backgroundImage: `url(${song.image})` }}
    />
  );
}
