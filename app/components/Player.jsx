"use client";

import styles from "./styles/Player.module.css"; 
import { useCurrentSong } from '../contexts/CurrentSongContext';
import { useState } from 'react';

export default function Player({ size = 35, song, style, onClick, fade = false }) {
	const { currentSong, status, controls } = useCurrentSong("currentSong");
	const [showPlayer, setShowPlayer] = useState(true);

  return (
		<button className={`${styles.button} player`}
			style={{
				...style, 
				width: size, 
				height: size,
				opacity: showPlayer ? 1 : 0,
				visibility: showPlayer ? 'visible' : 'hidden',
			}}
			onClick={(e) => {
				if (fade) setTimeout(() => setShowPlayer(false), 100);
				if (onClick) {
					onClick(e);
					return;
				}
				e.stopPropagation();
				controls.setSong(song);
				if (song?.id !== currentSong?.id && status.isPlaying) {
					// In case of clicking a different song while playing
					controls.play();
				} else {
					controls.togglePlay();
				}
				// if ((song !== currentSong && status.isPlaying)) {
				// 	controls.togglePlay();
				// 	status.setControlling();
				// }
			}}
		>
			{song?.id === currentSong?.id && status.isPlaying ?
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
				: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"/></svg>
			}
		</button>
	);
}