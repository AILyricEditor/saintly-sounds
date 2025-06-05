"use client";

import { useState } from "react";
import Song from "./Song";
import styles from "./layout.module.css";
import { songs as allSongs } from "../data/songs.json"; // Import the songs data
import LoadingSpinner from "../components/LoadingSpinner"; // Import the LoadingSpinner component

export default function MusicPage() {
	const [isExpanded, setIsExpanded] = useState(null);
	
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
		<main className={styles.main}>
			{SongElements}
		</main>
	);
}