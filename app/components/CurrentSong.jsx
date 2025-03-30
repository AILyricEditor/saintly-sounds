"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect } from 'react';
import { useSong } from '../contexts/SongContext';
import Timeline from './Timeline';

export default function CurrentSong() {
	const { currentSong, isPlaying } = useSong();
	const ref = useRef(null);

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
					<Timeline />
				</div>
				<audio 
					ref={ref}
				  className="song-audio"
					src={currentSong.audio}
					preload="auto"
				>
				</audio>
			</div>
	)
}