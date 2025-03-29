"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useContext, useRef, useEffect } from 'react';
// import { SongContext } from '../contexts/SongContext';
import useGlobal from '../hooks/useGlobal';

export default function CurrentSong() {
	const [currentSong, setCurrentSong] = useGlobal("currentSong");
	const [currentSongRef, setCurrentSongRef] = useGlobal("currentSongRef");
	const ref = useRef(null);

	useEffect(() => {
		setCurrentSongRef(ref.current);
	}, [ref.current]);

	console.log("From CurrentSong.jsx: ", currentSongRef);

	if (!currentSong) return null;

	// if (ref) setCurrentSong({...currentSong, ref: ref.current});
	// if ()

	return (
			<div className={styles.currentSong}>
				<SongCover src="./break-free.png"/>
				<Player song={currentSong} controls/>
				<audio 
					ref={ref}
				  // onLoad={() => {
					// 	; 
					// 	console.log("Current song at this point: ", currentSong);
					// }}
				  className="song-audio"
					src={currentSong.audio}
					preload="auto"
				>

				</audio>
			</div>
	)
}