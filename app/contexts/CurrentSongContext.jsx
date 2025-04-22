"use client";

import { useState, createContext, useContext, useEffect } from 'react';
import useAllSongs from '../hooks/useAllSongs';

const CurrentSongContext = createContext();

export const useCurrentSong = () => {
	return useContext(CurrentSongContext);
}

export default function CurrentSongProvider({ children }) {
	const [currentSong, setCurrentSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [songHistory, setSongHistory] = useState(new Set());
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook

	console.log(songHistory);

	const nextSong = allSongs ? allSongs[currentSongIndex + 1] || allSongs[0] : null;
	const prevSong = allSongs ? allSongs[currentSongIndex - 1] || allSongs[allSongs.length - 1] : null;

	function changeSong(song) {
		const newSongHistory = new Set(songHistory);
		newSongHistory.add(song.id);
		// if (!songHistory.has(song)) {
		// 	newSongHistory.add(song); // Add the new song to history
		// } else {
		// 	newSongHistory.delete(song); // Remove the song if it's already in history
		// }
		setSongHistory(new Set([...songHistory, song.id])); // Update the state with the new history

		if (songHistory.size >= allSongs.length) { 
			setSongHistory(new Set([song.id])); // Reset history if all songs have been played
		}

		setCurrentSong(song);
		setCurrentSongIndex(allSongs.findIndex(thisSong => thisSong.id === song.id));
	}

	const controls = {
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		togglePlay: () => setIsPlaying(!isPlaying),
		next: () => changeSong(nextSong),
		previous: () => changeSong(prevSong),
		previousHistory: () => {
			if (songHistory.size < 2) return;
			changeSong(allSongs.find(song => [...songHistory][songHistory.size - 2].id === song.id)); // Get the second last song from history
			// setSongHistory(new Set([...songHistory].slice(0, -1))); // Remove the last song from history
		},
		random: () => {
			// const playedIds = new Set([...songHistory].map(song => song.id));

			const playableSongs = allSongs.filter(song => songHistory.has(song.id) === false);

			let nextSong = playableSongs[Math.floor(Math.random() * playableSongs.length)] ||
				allSongs[Math.floor(Math.random() * allSongs.length)];

			changeSong(nextSong);
		}
	}

	return (
		<CurrentSongContext.Provider value={{ currentSong, changeSong, isPlaying, controls }}>
			{children}
			<div style={{
				position: 'absolute',
				top: 0,
				right: 0,
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				padding: '10px',
				width: "200px",
				height: "600px",
				zIndex: 1000,
			}}>
				<h2>Song History</h2>
				{[...songHistory].map((song, index) => {
					return ( 
						<div key={index}
						style={{
							padding: '5px',
							cursor: 'pointer',
						}}>{index + 1}. {allSongs[index].title}</div> 
					)
				})}
			</div>
		</CurrentSongContext.Provider>
	);
}