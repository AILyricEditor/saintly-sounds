"use client";

import styles from "./styles/Player.module.css"; 
import { useCurrentSong } from '../contexts/CurrentSongContext';

export default function Player({ size = 35, song, style }) {
	const { currentSong, status, controls } = useCurrentSong("currentSong");

  return (
		<button className={`${styles.playButton} player`}
			style={{...style, width: size, height: size}}
			onClick={(e) => {
				e.stopPropagation();
				controls.setSong(song);
				if (song !== currentSong && status.isPlaying) {
					return;
				}	else { 
					controls.togglePlay();
				}
				console.log("clicked!!!");
			}}
		>
			{song === currentSong && status.isPlaying ?
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
				: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"/></svg>
			}
		</button>
	);
}