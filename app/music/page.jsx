"use client";

import { useState, useEffect } from "react";
import Song from "./Song";
import styles from "./page.module.css";
import { useSong } from "../contexts/SongContext";

export default function MusicPage() {
	const [songs, setSongs] = useState(null);
	const [isExpanded, setIsExpanded] = useState(0);

	useEffect(() => {
		fetch("/songs.json").then(res => res.json()).then(data => {
			setSongs(data.songs);
		});
	}, []);

	// console.log("Songs: ", songs[0]);

	if (!songs) {
    return <p>Loading...</p>; // Show a loading message if songs are not yet available
  }

	function toggleExpand(index) {
		if (isExpanded === index) {
		  setIsExpanded(null);
		} else {
			setIsExpanded(index);
		}
	}

	const SongElements = songs.map((song, index) => (
		<Song key={index}
			isExpanded={isExpanded === index}
			onExpand={() => toggleExpand(index)} 
			song={song}
		/>
	));

	return (
		<main className={styles.songsWrapper}>
			{SongElements}
		</main>
	);
}