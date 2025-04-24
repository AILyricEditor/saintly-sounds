"use client";

import styles from './CurrentSong.module.css';
import Player from './Player';
import SongCover from './SongCover';
import { useRef, useEffect, useState } from 'react';
import { useCurrentSong } from '../contexts/CurrentSongContext';
import Slider from './Slider';
import { formatTime } from '../tools/tools';
import LoadingSpinner from './LoadingSpinner';
import ToggleButton from './ToggleButton';

export default function CurrentSong() {
	const { currentSong, isPlaying, controls, songRef, setSongRef } = useCurrentSong();
	const ref = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	// const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
	const [loop, setLoop] = useState(0);
	// 0 = no loop, 1 = loop current song once, 2 = loop current song

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

	useEffect(() => {
		setSongRef(ref);
	}, [ref])

	if (!currentSong) return null;

	return (
		<>
			<audio
				ref={ref}
				src={currentSong.audio}
				preload="auto"
				onEnded={() => {
					if (loop === 1) {
						controls.replay();
					} else if (loop === 2) {
					  controls.loopOnce();
					} else {
						controls.next();
					}
				}}
				onTimeUpdate={() => {
					setCurrentTime(ref.current.currentTime);
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
							<ToggleButton states={[
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
								]}
								value={shuffle === true ? 1 : 0}
								onChange={() => {
									shuffle ? controls.unShuffle() : controls.shuffle();
									setShuffle(!shuffle);
								}}
							/>
							<button className="iconButton hoverBG" onClick={() => {
								controls.previous();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"/></svg></button>
							<Player song={currentSong} />
							<button className="iconButton hoverBG" onClick={() => {
								controls.next();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"/></svg></button>
							<ToggleButton states={[
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M460-360v-180h-60v-60h120v240h-60ZM280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
								]}
								value={loop}
								onChange={(next) => setLoop(next)}
							/>
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