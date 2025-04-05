"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useSong } from '../contexts/SongContext';
import useAllSongs from '../hooks/useSongs';
import Slider from './Slider';
import { formatTime } from '../tools/tools';

export default function CurrentSong() {
	const { currentSong, setCurrentSong, isPlaying } = useSong();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook
	const nextSong = allSongs ? allSongs[(allSongs.indexOf(currentSong) + 1) % allSongs.length] || allSongs[0] : null;
	const previousSong = allSongs ? allSongs[(allSongs.indexOf(currentSong) - 1 + allSongs.length) % allSongs.length] || allSongs[allSongs.length - 1] : null;
	
	// function nextSong() {
	// 	let nextSong = null;

	// 	allSongs.forEach((song, index) => {
	// 		if (song === currentSong) {
	// 			console.log("Next Song: ", index);
	// 		  nextSong = allSongs[index + 1] || allSongs[0];
	// 		}
	// 	});

	// 	return nextSong;
	// }

	// const nextSong = allSongs[allSongs.indexOf(currentSong) + 1] || allSongs[0];

	useEffect(() => {
		if (ref.current && isPlaying) {
			ref.current.play();
		} else if (ref.current) {
			ref.current.pause();
		}
	}, [isPlaying, currentSong]);

	if (!currentSong) return null;

	return (
		<>
			<audio 
				ref={ref}
				src={currentSong.audio}
				preload="auto"
				onTimeUpdate={() => {
					setCurrentTime(ref.current.currentTime);
					if (ref.current.currentTime >= ref.current.duration - 1) {
						// setCurrentSong(allSongs[(allSongs.indexOf(currentSong) + 1) % allSongs.length]);
						setCurrentSong(previousSong);

						// nextSong();
					}
				}}
			></audio>
			{ref.current ? <div className={styles.currentSong}>
				<SongCover song={currentSong}/>
				<div className={styles.songInfo}>
					<h3>{currentSong.title}</h3>
					<p>Artist: {currentSong.artist}</p>
					<p>Album: {currentSong.album}</p>
				</div>
				<div className={styles.songControls}>
					<Player song={currentSong} />
					<div className={styles.timeline}>
						<p className={styles.time}>{formatTime(currentTime)}</p>
						{ref.current.duration ? <Slider key="active" width="100%" 
							max={ref.current.duration}
							onSlide={(value) => {
								setCurrentTime(value);
							}}
							onStop={(value) => {
								ref.current.currentTime = value;
							}}
							syncRef={ref}
						/> : <Slider key="disabled" width="100%" disabled/>}
						<p className={styles.time}>{formatTime(ref.current.duration)}</p>
					</div>
				</div>
			</div> : null}
		</>
	)
}