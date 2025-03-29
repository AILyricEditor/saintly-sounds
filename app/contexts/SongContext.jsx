"use client";

import { useState, createContext, useContext } from 'react';

const SongContext = createContext();

export const useSong = () => {
	return useContext(SongContext);
}

export default function SongProvider({ children }) {
	const [currentSong, setCurrentSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	function togglePlay() {
		setIsPlaying(!isPlaying);
	}

	return (
		<SongContext.Provider value={{ currentSong, setCurrentSong, isPlaying, togglePlay }}>
			{children}
		</SongContext.Provider>
	);
}