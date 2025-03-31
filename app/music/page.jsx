"use client";

import { useState, useEffect } from "react";
import Song from "./Song";
import styles from "./page.module.css";
import useSongs from "../hooks/useSongs";

export default function MusicPage() {
	const songs = useSongs();
	const [isExpanded, setIsExpanded] = useState(null);
	
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