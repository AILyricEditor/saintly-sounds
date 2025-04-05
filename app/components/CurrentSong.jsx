"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useSong } from '../contexts/SongContext';
import useAllSongs from '../hooks/useSongs';
import Slider from './Slider';
import { formatTime } from '../tools/tools';
import Image from 'next/image';

export default function CurrentSong() {
	const { currentSong, setCurrentSong, isPlaying } = useSong();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const allSongs = useAllSongs(); // Fetch all songs using the custom hook
	const nextSong = allSongs ? allSongs[(allSongs.indexOf(currentSong) + 1)] || allSongs[0] : null;
	const prevSong = allSongs ? allSongs[(allSongs.indexOf(currentSong) - 1)] || allSongs[allSongs.length - 1] : null;

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
						setCurrentSong(nextSong);
						if (loop) ref.current.currentTime = 0;
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
					<div className={styles.controlButtons}>
						<button className="iconButton hoverBG" onClick={() => {
							setCurrentSong(prevSong);
						}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"/></svg></button>
						<Player song={currentSong} />
						<button className="iconButton hoverBG" onClick={() => {
							setCurrentSong(nextSong);
						}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"/></svg></button>
					</div>
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