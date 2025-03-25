"use client";

import { useState, useEffect } from "react";
import Song from "./Song";
import styles from "./page.module.css";

export default function MusicPage() {
	const [songs, setSongs] = useState(null);

	useEffect(() => {
		fetch("/songs.json").then(res => res.json()).then(data => {
			setSongs(data.songs);
		});
	}, []);

	// console.log("Songs: ", songs[0]);

	if (!songs) {
    return <p>Loading...</p>; // Show a loading message if songs are not yet available
  }

	return (
		<main className={styles.songsWrapper}>
			<Song song={songs[0]}/>
			<Song song={songs[1]}/>
			<Song song={songs[2]}/>
		</main>
	);
}