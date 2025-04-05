"use client";

import { useState, useEffect } from "react";
import Song from "./Song";
import styles from "./page.module.css";
import useAllSongs from "../hooks/useSongs";

export default function MusicPage() {
	const [isExpanded, setIsExpanded] = useState(null);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook
	
	if (!allSongs) {
    return <p>Loading...</p>; // Show a loading message if songs are not yet available
  }

	function toggleExpand(index) {
		if (isExpanded === index) {
		  setIsExpanded(null);
		} else {
			setIsExpanded(index);
		}
	}

	const SongElements = allSongs.map((song, index) => (
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