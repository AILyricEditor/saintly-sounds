"use client";

import styles from './styles/CurrentSong.module.css';
import { useState, useEffect } from 'react';
import Player from './Player';
import SongCover from './SongCover';
import { useCurrentSong } from '../contexts/CurrentSongContext';
import Slider from './Slider';
import { formatTime } from '../tools/tools';
import LoadingSpinner from './LoadingSpinner';
import ToggleButton from './ToggleButton';

export default function CurrentSong() {
	const { currentSong, status, controls } = useCurrentSong();
	const [isExpanded, setIsExpanded] = useState(false);

	let timeout;

	useEffect(() => {
		if (isExpanded && status.isControlling === false) {
			timeout = setTimeout(() => {
				setIsExpanded(false);
			}, 3000);
		} else if (status.isControlling === true) {
			if (timeout) clearTimeout(timeout);
		}

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [isExpanded, status.isControlling]);

	// useEffect(() => {
	// 	if (!status.isControlling && isExpanded) setIsExpanded(!isExpanded);
	// }, [status.isControlling, isExpanded]);

	if (!currentSong) return null;

	return (
		<>
			<div className={`${styles.currentSong} ${isExpanded && styles.expanded}`} onClick={e => {
				if (e.target.matches('button') || e.target.matches('svg') || e.target.matches(`.${styles.timeline} *`)) return;
				setIsExpanded(!isExpanded);
			}}>
				{status.isLoaded ? <>
					<SongCover song={currentSong} />
					<div className={styles.songInfo}>
						<h3>{currentSong.title}</h3>
						<p>Artist: {currentSong.artist}</p>
						<p>Album: {currentSong.album}</p>
					</div>
					<div className={styles.songControls}>
						<div className={styles.controlButtons}>
							<ToggleButton className={`iconButton`} states={[
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
								]}
								value={status.shuffle === true ? 1 : 0}
								onChange={() => {
									status.shuffle ? controls.unShuffle() : controls.shuffle();
									controls.setShuffle(!status.shuffle);
									status.setControlling();
								}}
							/>
							<button className={`iconButton hoverBG`} onClick={() => {
								controls.previous();
								status.setControlling();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"/></svg></button>
							<Player song={currentSong} />
							<button className={`iconButton hoverBG`} onClick={() => {
								controls.next();
								controls.play();
								status.setControlling();
							}}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"/></svg></button>
							<ToggleButton states={[
									<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
									<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M460-360v-180h-60v-60h120v240h-60ZM280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
								]}
								value={status.loop}
								onChange={(next) => {
									controls.setLoop(next);
									status.setControlling();
								}}
							/>
						</div>
						<div className={styles.timeline}>
							<p className={styles.time}>{formatTime(status.currentTime)}</p>
							<Slider 
								width="100%" 
								value={status.currentTime}
								max={status.getDuration()}
								onSlide={(value) => {
									status.setTime(value);
									status.setSeeking(true);
								}}
								onStop={(value) => {
									controls.seekTo(value);
									status.setSeeking(false);
								}}
							/>
							<p className={styles.time}>{formatTime(status.getDuration())}</p>
						</div>
					</div>
				</> : <LoadingSpinner size={20}/>}
			</div>
		</>
	)
}