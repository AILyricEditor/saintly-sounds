"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useSong } from '../contexts/SongContext';
import useSongs from '../hooks/useSongs';
import Slider from './Slider';
import formatTime from '../tools/formatTime';

export default function CurrentSong() {
	const { currentSong, setCurrentSong, isPlaying } = useSong();
	const allSongs = useSongs();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	function seekTo(time) {
		const element = ref.current;
		element.currentTime = time;
	}

	useEffect(() => {
		if (ref.current && isPlaying) {
			ref.current.play();
		} else if (ref.current) {
			ref.current.pause();
		}
	}, [isPlaying, currentSong]);

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
						max={duration} 
						value={currentTime} 
						onSlide={(value) => {
							// seekTo(value);
						}}
						onStop={(value) => {
							seekTo(value);
						}}
					/>
					<p className={styles.time}>{formatTime(duration)}</p>
				</div>
			</div>
			<audio 
				ref={ref}
				src={currentSong.audio}
				preload="auto"
				onLoadedMetadata={(e) => {
					setDuration(e.currentTarget.duration);
				}}
				onTimeUpdate={() => {
					setCurrentTime(ref.current.currentTime);
					if (ref.current.currentTime >= ref.current.duration) {
						setCurrentSong(allSongs[allSongs.indexOf(currentSong) + 1]);
					}
				}}
			>
			</audio>
		</div>
	)
}