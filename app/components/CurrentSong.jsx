"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useSong } from '../contexts/SongContext';
import Slider from './Slider';

export default function CurrentSong() {
	const { currentSong, setCurrentSong, isPlaying, togglePlay } = useSong();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);

	const secondsDuration = Math.round(ref.current?.duration)
	const duration = formatTime(secondsDuration);

	if (ref.current?.currentTime >= ref.current?.duration) {
		setCurrentSong()
		togglePlay();
	}

	function seekTo(time) {
		const element = ref.current;
		if (isFinite(time)) element.currentTime = Math.round(time);
	}

	useEffect(() => {
		if (ref.current && isPlaying) {
			ref.current.play();
		} else if (ref.current) {
			ref.current.pause();
		}
	}, [ref.current, isPlaying, currentSong]);

	if (!currentSong) return null;

	return (
		<div className={styles.currentSong}>
			<SongCover song={currentSong}/>
			<div className={styles.songInfo}>
				<h3>{currentSong.title}</h3>
				<p>Artist: {currentSong.artist}</p>
				<p>Album: {currentSong.album}</p>
			</div>
			<div className={styles.songControls}>
				<Player song={currentSong}/>
				<div className={styles.timeline}>
					<p className={styles.time}>{formatTime(currentTime)}</p>
					<Slider width="100%" 
						max={secondsDuration} 
						value={currentTime} 
						onSlide={(value) => {
							setCurrentTime(value);
						}}
						onStop={(value) => {
							seekTo(value);
						}}
					/>
					<p className={styles.time}>{duration}</p>
				</div>
			</div>
			<audio 
				ref={ref}
				className="song-audio"
				src={currentSong.audio}
				preload="auto"
				onTimeUpdate={() => {
					setCurrentTime(ref.current.currentTime);
				}}
			>
			</audio>
		</div>
	)
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${Math.round(remainingSeconds).toString().padStart(2, '0')}`;
}