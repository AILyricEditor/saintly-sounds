"use client";

import { useEffect, useState, useRef } from 'react';
import { useCurrentSong } from "../../contexts/CurrentSongContext";
import styles from './styles.module.css';
import AmbientBG from './AmbientBG';
import SongControls from '../../components/shared/SongControls/SongControls';
import SongCover from '../../components/SongCover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CurrentSongPopup() {
	const { currentSong, status, controls } = useCurrentSong();
	const [showPopup, setShowPopup] = useState(false);
	const pathname = usePathname();

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
					song={currentSong} 
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
					<Link onClick={() => {
							if (pathname === `/song/${currentSong.id}`) {
								controls.closeCurrent();
							}
						}} 
						className={styles.title} 
						href={`/song/${currentSong.id}`}>
							{currentSong.title}
					</Link>
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