"use client";

import { useState, createContext, useContext, useEffect, useRef } from 'react';
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
	const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [loopState, setLoopState] = useState(0);
	const [shuffleState, setShuffleState] = useState(false);
	const [seeking, setSeeking] = useState(false);
	const songRef = useRef(null);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook

	const songIndex = currentSong ? songQueue.findIndex(song => song.id === currentSong.id) : -1;
	const nextSong = songQueue ? songQueue[songIndex + 1] || songQueue[0] : null;
	const prevSong = songQueue ? songQueue[songIndex - 1] || songQueue[songQueue.length - 1] : null;

	useEffect(() => {
		setSongQueue(allSongs);
	}, [allSongs]);

	useEffect(() => {
		if (isLoaded) {
			if (isPlaying) {
				songRef.current.play();
			} else {
				songRef.current.pause();
			}
		}
	}, [isPlaying, currentSong, currentTime, isLoaded]);

	const controls = {
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		togglePlay: () => setIsPlaying(!isPlaying),
		setSong: (song) => setCurrentSong(song),
		next: () => setCurrentSong(nextSong),
		previous: () => setCurrentSong(prevSong),
		shuffle: () => setSongQueue(shuffle(allSongs)),
		unShuffle: () => setSongQueue(allSongs),
		seekTo: (time) => {
			setCurrentTime(time);
			if (isLoaded) songRef.current.currentTime = time;
		},
		replay: () => controls.seekTo(0),
		setLoop: (value) => setLoopState(value),
		setShuffle: (value) => setShuffleState(value)
	}

	const status = {
		isLoaded: isLoaded,
		loop: loopState,
		shuffle: shuffleState,
		currentTime: currentTime,
		isPlaying: isPlaying,
		setSeeking: (value) => setSeeking(value),
		getDuration: () => isLoaded ? songRef.current.duration : null,
		setTime: (time) => !seeking && setCurrentTime(time),
	}

	useEffect(() => {
		setIsLoaded(false); // Reset load state when song changes
	}, [currentSong?.audio]);

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
			status,
			controls
		}}>
			{/* <div style={{
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
			</div> */}
			{currentSong && <audio
				ref={songRef}
				src={currentSong.audio}
				preload="auto"
				onEnded={() => {
					if (loopState === 1) {
						controls.replay();
					} else if (loopState === 2) {
					  if (hasPlayedOnce) {
							controls.next();
							setHasPlayedOnce(false);
						} else {
							controls.replay();
							setHasPlayedOnce(true);
						}
					} else {
						controls.next();
					}
				}}
				onTimeUpdate={() => {
					status.setTime(songRef.current.currentTime);
				}}
				onLoadedMetadata={(e) => setIsLoaded(true)}
			></audio>}
			{children}
		</CurrentSongContext.Provider>
	);
}