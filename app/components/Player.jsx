"use client";

import { useState, useRef, useEffect, useContext } from "react";
import styles from "./Player.module.css"; 
// import { SongContext } from "../contexts/SongContext";
// import { useGlobal } from "./contexts/useGlobal";
import useGlobal from "../hooks/useGlobal";

export default function Player({ song, width = 35, height = 35, controls = false, plays, mute = false }) {
	const [isPlaying, setIsPlaying] = useState(false);
	// const [currentTime, setCurrentTime] = useState(0);
	// const audioRef = useRef(null);
	// const timelineRef = useRef(null);
	// const audioRef = useRef(null);
	const [currentSong, setCurrentSong] = useGlobal("currentSong");
	const [currentSongRef, setCurrentSongRef] = useGlobal("currentSongRef");
	console.log("From Player.jsx: ", currentSongRef);

	// useEffect(() => {
	// 	const audio = audioRef.current;
	// 	const timeline = timelineRef.current;

	// 	const timePercentage = Math.floor((100 / audio.duration) * audio.currentTime) || 0;

	// 	function updateTime() {
	// 		setCurrentTime(audio.currentTime);
	// 		timeline.value = currentTime;	

	// 		console.log("Current time: ", timePercentage);
	// 	}

	// 	audio.addEventListener("timeupdate", updateTime);

	// 	return () => {
	// 		audio.removeEventListener("timeupdate", updateTime);
	// 	}
	// }, [currentTime]);

	function playAudio(e) {
		e.stopPropagation();
		if (isPlaying) {
			// currentSong.ref.pause();
		} else {
			setCurrentSong(song);

			// if (currentSong.ref) {
			// 	currentSong.ref.play();
			// }

			
			// currentSong.ref.play();
		}
		setIsPlaying(!isPlaying);
	}

  return (
		<>
			<button className={styles.playButton}
				style={{width: width, height: height}}
				onClick={playAudio}
			>
				{isPlaying ?
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
					: <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"/></svg>
				}
			</button>
			{/* {!mute && <audio ref={audioRef} className="song-audio" src={song.audio} preload="auto"></audio>} */}
			{/* {controls && 
			<div className={styles.controls}>
				<input ref={timelineRef} type="range" min="0" max="100" step="1"/>
			</div> */}
		</>
	);
}