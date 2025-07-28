"use client";

import { useState, createContext, useContext, useEffect, useRef, useMemo } from 'react';
import { useAllSongs } from './AllSongsContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { startTransition } from 'react';

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
	const [isControlling, setIsControlling] = useState(false);
	const [loadedSong, setLoadedSong] = useState(null);
	const [isOpened, setIsOpened] = useState(false);
	const songRef = useRef(null);
	const allSongs = useAllSongs();
	const pathname = usePathname();

	const songIndex = currentSong ? songQueue.findIndex(song => song.id === currentSong.id) : -1;
	const nextSong = songQueue ? songQueue[songIndex + 1] || songQueue[0] : null;
	const prevSong = songQueue ? songQueue[songIndex - 1] || songQueue[songQueue.length - 1] : null;

	let timeout;

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

	const ifSongLoaded = (doThis) => { if (isLoaded) { doThis() } }

	useEffect(() => {
		// If the path changes close Current Song Popup
		controls.closeCurrent();
	}, [pathname]);

	useEffect(() => {
		if (currentSong !== loadedSong && isLoaded) {
			setLoadedSong(currentSong);
		}
	}, [currentSong, isLoaded]);

	const tools = {
		isCurrentSong: (song) => {
			if (isLoaded) {
				return song.id === currentSong.id;
			}
		}
	};

	const controls = useMemo(() => ({
		play: () => setIsPlaying(true),
		pause: () => setIsPlaying(false),
		togglePlay: () => setIsPlaying(!isPlaying),
		setSong: (song) => setCurrentSong(song),
		next: () => {
			setCurrentSong(nextSong);
		},
		previous: () => {
			setCurrentSong(prevSong);
		},
		shuffle: () => setSongQueue(shuffle(allSongs)),
		unShuffle: () => setSongQueue(allSongs),
		replay: () => {
			setCurrentTime(0);
			ifSongLoaded(() => songRef.current.currentTime = time);
		},
		setLoop: (value) => setLoopState(value),
		setShuffle: (value) => setShuffleState(value),
		seekTo: (time) => {
			setCurrentTime(time);
			ifSongLoaded(() => songRef.current.currentTime = time);
		},
		openCurrent: () => setIsOpened(true),
		closeCurrent: () => setIsOpened(false),
	}), [isPlaying, nextSong, prevSong, allSongs, isLoaded]);

	const status = useMemo(() => ({
		isLoaded: isLoaded,
		loop: loopState,
		shuffle: shuffleState,
		currentTime: currentTime,
		isPlaying: isPlaying,
		isSeeking: seeking,
		isControlling: isControlling,
		isOpened: isOpened,
		setSeeking: (value) => {
			setSeeking(value);
			status.setControlling();
		},
		getDuration: () => isLoaded ? songRef.current.duration : null,
		setTime: (time) => !seeking && setCurrentTime(time),
		setControlling: () => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => {
				setIsControlling(false);
			}, 500);
			setIsControlling(true)
		},
	}), [isLoaded, loopState, shuffleState, currentTime, isPlaying, seeking, isControlling, isOpened]);

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
			controls,
			tools
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
			{/* This preloads the next and prev songs audio */}
			{nextSong && nextSong !== currentSong && (
				<>
					<audio
						src={nextSong.audio}
						preload="auto"
						style={{ display: "none" }}
					/>
					<img src={nextSong.image} alt="" style={{ display: "none" }} />
				</>	
			)}
			{prevSong && prevSong !== currentSong && (
				<>
					<audio
						src={prevSong.audio}
						preload="auto"
						style={{ display: "none" }}
					/>
					<img src={nextSong.image} alt="" style={{ display: "none" }} />
				</>
			)}
			{children}
		</CurrentSongContext.Provider>
	);
}