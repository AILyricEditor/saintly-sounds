"use client";

import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import SongCover from '../SongCover';
import { useCurrentSong } from '../../contexts/CurrentSongContext';
// import SongTitle from '../SongTitleLink';
// import { useRouter } from 'next/navigation';
// import { useDrag } from '@use-gesture/react';
import { usePathname } from 'next/navigation';
import SongTimeline from '../shared/SongControls/SongTimeline';
import SongControlButtons from '../shared/SongControls/SongControlButtons';

export default function CurrentSong() {
	const { currentSong, status, controls } = useCurrentSong();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isExpanding, setIsExpanding] = useState(false);
	const pathname = usePathname();

	let timeout;

	const startY = useRef(null);

	function handleTouchStart(e) {
		startY.current = e.touches[0].clientY;
		setIsExpanding(true);
	}

	function handleTouchEnd(e) {
		const endY = e.changedTouches[0].clientY;
		const deltaY = endY - startY.current;

		if (deltaY < -10) {
			// SWIPE UP
			setIsExpanded(true);
		} else if (deltaY > 10) {
			// SWIPE DOWN
			setIsExpanded(false);
		}
		setIsExpanding(false);
	}

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
		}
	}, [isExpanded, status.isControlling]);

	function openSongPage() {
		controls.openCurrent();
	}

	return (
		<>
			<div 
				className={`
					${styles.currentSong} 
					${!currentSong && styles.hidden} 
					${pathname === `song/${currentSong?.id}` && styles.hidden} 
					${isExpanded ? styles.expanded : ""}
					${status.isOpened && styles.hidden}
					${status.pendCurrentPage && styles.hidden}
				`} 
				style={{
					touchAction: 'pan-y',
					WebkitTapHighlightColor: 'transparent',
				}}
				onClick={e => {
					if (!isExpanded) controls.openCurrent();
				}}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<div 
					className={styles.handle}
					style={{
						width: isExpanding ? '50px' : '35px',
					}} 
				/>
				{currentSong && <>
					<SongCover 
						className={`${styles.songCover} pointer`}
						song={currentSong} 
						onClick={openSongPage}
					/>
					<div className={styles.songInfo}>
						<h3 className="hoverUnderline" 
							onClick={() => controls.openCurrent()}>{currentSong.title}
						</h3>
						<p>Artist: {currentSong.artist}</p>
						<p>Album: {currentSong.album}</p>
					</div>
					<div className={styles.songControls}>
						<SongControlButtons />
						<SongTimeline className={styles.timeline} />
					</div>
				</>}
			</div>
		</>
	)
}