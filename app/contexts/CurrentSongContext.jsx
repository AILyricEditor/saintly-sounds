"use client";

import { useState, createContext, useContext, useEffect } from 'react';
import useAllSongs from '../hooks/useAllSongs';

const CurrentSongContext = createContext();

export const useCurrentSong = () => {
	return useContext(CurrentSongContext);
}

export default function SongProvider({ children }) {
	const [currentSong, setCurrentSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook

	useEffect(() => {
		if (currentSong) setCurrentSongIndex(allSongs.findIndex(song => song.id === currentSong.id));
	}, [currentSong]);

	const nextSong = allSongs ? allSongs[currentSongIndex + 1] || allSongs[0] : null;
	const prevSong = allSongs ? allSongs[currentSongIndex - 1] || allSongs[allSongs.length - 1] : null;

	const controls = {
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		togglePlay: () => setIsPlaying(!isPlaying),
		next: () => setCurrentSong(nextSong),
		previous: () => setCurrentSong(prevSong),
	}

	return (
		<CurrentSongContext.Provider value={{ currentSong, setCurrentSong, isPlaying, controls }}>
			{children}
		</CurrentSongContext.Provider>
	);
}