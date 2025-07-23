"use client";

import { useEffect, useState } from 'react';
import { useCurrentSong } from "../../contexts/CurrentSongContext";
import styles from './styles.module.css';
import AmbientBG from './AmbientBG';
import SongControls from '../../components/shared/SongControls/SongControls';
import SongCover from '../../components/SongCover';

export default function CurrentSongPopup() {
	const { currentSong, status, controls } = useCurrentSong();
	const [animating, setAnimating] = useState(false);
	const [animating2, setAnimating2] = useState(false);
	const [lastSong, setLastSong] = useState(currentSong);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		setAnimating(true);
		setTimeout(() => {
			setAnimating(false);
			setAnimating2(true);
			setLastSong(currentSong);
		}, 500);
		setTimeout(() => {
			setAnimating2(false);
		}, 500);
	}, [currentSong]);

	useEffect(() => {
		if (status.isOpened) {
			setShowPopup(true);
		} else if (status.isOpened === false) {
			setShowPopup(false);
		}
	}, [status.isOpened]);

	return (
		<>
			{showPopup && <main className={styles.container}>
				<AmbientBG 
					song={lastSong} 
					style={{
						opacity: animating ? 0 : 1,
					}}
					className={styles.transition}
				/>
				<AmbientBG 
					song={currentSong} 
					style={{
						opacity: animating2 ? 0 : 1,
					}}
					className={styles.transition}
				/>
				<button 
					className={`${styles.closeButton} iconButton`}
					onClick={() => {
						controls.closeCurrent();
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
				</button>
				<div className={`${styles.main} ${styles.transition}`}>
					<h1 className={styles.title}>{currentSong.title}</h1>
					<SongCover
						className={styles.songCover}
						size={250}
						song={currentSong}
					></SongCover>
					<SongControls 
						className={styles.songControls} 
						sliderHeight={7}
					/>
				</div>
			</main>}
		</>
	)
}