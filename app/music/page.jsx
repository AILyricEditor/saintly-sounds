"use client";

import { useState } from "react";
import Song from "./Song";
import styles from "./page.module.css";
import useAllSongs from "../hooks/useAllSongs";
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component

export default function MusicPage() {
	const [isExpanded, setIsExpanded] = useState(null);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook
	
	if (!allSongs) {
    return <LoadingSpinner size={50} />; // Show a loading message if songs are not yet available
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
			onExpand={() => {
				toggleExpand(index);
			}} 
			song={song}
		/>
	));

	return (
		<main className={styles.songsWrapper}>
			{SongElements}
		</main>
	);
}