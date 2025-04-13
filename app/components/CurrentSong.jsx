"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useCurrentSong } from '../contexts/CurrentSongContext';
import Slider from './Slider';
import { formatTime } from '../tools/tools';
import LoadingSpinner from './LoadingSpinner';

export default function CurrentSong() {
	const { currentSong, isPlaying, controls } = useCurrentSong();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (ref.current) {
			if (isPlaying) {
				ref.current.play();
			} else {
				ref.current.pause();
			}
		}
	}, [isPlaying, currentSong]);

	useEffect(() => {
		setIsLoaded(false); // Reset load state when song changes
	}, [currentSong?.audio]);

	if (!currentSong) return null;

	return (
		<>
			<audio
				ref={ref}
				src={currentSong.audio}
				preload="auto"
				onTimeUpdate={() => {
					setCurrentTime(ref.current.currentTime);
					if (ref.current.ended) {
						controls.next();
					}
				}}
				onLoadedMetadata={(e) => setIsLoaded(true)}
			></audio>
			<div className={styles.currentSong}>
				{isLoaded ? <>
					<SongCover song={currentSong}/>
					<div className={styles.songInfo}>
						<h3>{currentSong.title}</h3>
						<p>Artist: {currentSong.artist}</p>
						<p>Album: {currentSong.album}</p>
					</div>
					<div className={styles.songControls}>
						<div className={styles.controlButtons}>
							<button className="iconButton hoverBG" onClick={() => {
								controls.previous();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"/></svg></button>
							<Player song={currentSong} />
							<button className="iconButton hoverBG" onClick={() => {
								controls.next();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"/></svg></button>
						</div>
						<div className={styles.timeline}>
							<p className={styles.time}>{formatTime(currentTime)}</p>
							<Slider width="100%" 
								value={currentTime}
								max={ref.current.duration}
								onSlide={(value) => {
									setCurrentTime(value);
								}}
								onStop={(value) => {
									ref.current.currentTime = value;
								}}
							/>
							<p className={styles.time}>{formatTime(ref.current.duration)}</p>
						</div>
					</div>
				</> : <LoadingSpinner size={20}/>}
			</div>
		</>
	)
}