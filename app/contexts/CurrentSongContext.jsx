"use client";

import { useState, createContext, useContext, useEffect } from 'react';
import useAllSongs from '../hooks/useAllSongs';
import LoadingSpinner from '../components/LoadingSpinner';

const CurrentSongContext = createContext();

export const useCurrentSong = () => {
	return useContext(CurrentSongContext);
}

export default function CurrentSongProvider({ children }) {
	const [currentSong, setCurrentSong] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songQueue, setSongQueue] = useState(null);
	const [songRef, setSongRef] = useState(0);
	const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook

	const songIndex = currentSong ? songQueue.findIndex(song => song.id === currentSong.id) : -1;
	const nextSong = songQueue ? songQueue[songIndex + 1] || songQueue[0] : null;
	const prevSong = songQueue ? songQueue[songIndex - 1] || songQueue[songQueue.length - 1] : null;

	function changeSong(song) {
		setCurrentSong(song);
	}

	useEffect(() => {
		setSongQueue(allSongs);
	}, [allSongs])

	const controls = {
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		togglePlay: () => setIsPlaying(!isPlaying),
		next: () => changeSong(nextSong),
		previous: () => changeSong(prevSong),
		shuffle: () => setSongQueue(shuffle(allSongs)),
		unShuffle: () => setSongQueue(allSongs),
		replay: () => {
			console.log(songRef)
			songRef.current.currentTime = 0;
			// controls.play();
		},
		loopOnce: () => {
			if (!hasPlayedOnce) controls.replay();
			setHasPlayedOnce(!hasPlayedOnce);
		},
	}

	function shuffle(array) {
		let copiedArray = array.slice();
		let shuffledArray = [];
		while (copiedArray.length > 0) {
			const random = Math.floor(Math.random() * (copiedArray.length));
			shuffledArray.push(copiedArray.splice(random, 1)[0]);
		}
		return shuffledArray;
	}

	return (
		<CurrentSongContext.Provider value={{ 
			currentSong,
			changeSong,
			isPlaying,
			controls,
			songRef,
			setSongRef
		}}>
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
				{songQueue && currentSong ? songQueue.map((song, index) => {
					return ( 
						<div key={index}
						style={{
							padding: '5px',
							cursor: 'pointer',
							color: song.id === currentSong.id ? "var(--accent2)" : "white"
						}}>{index + 1}. {song.title}
						</div> 
					)
				}) : <h5>No song played yet</h5>}
			</div>
		</CurrentSongContext.Provider>
	);
}