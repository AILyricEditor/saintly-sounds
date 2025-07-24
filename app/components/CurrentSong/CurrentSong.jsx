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
	const [arrowUp, setArrowUp] = useState(false);
	const [active, setActive] = useState(false);
	const pathname = usePathname();

	let timeout;

	const startY = useRef(null);

	function handleTouchStart(e) {
		e.preventDefault();
		startY.current = e.touches[0].clientY;
		setIsExpanding(true);
	}

	function handleTouchEnd(e) {
		const endY = e.changedTouches[0].clientY;
		const deltaY = endY - startY.current;

		if (deltaY < -10) {
			// SWIPE UP
			setIsExpanded(true);
			setArrowUp(true);
		} else if (deltaY > 10) {
			// SWIPE DOWN
			setIsExpanded(false)
		}
		setIsExpanding(false);
	}

	useEffect(() => {
		// if (isExpanded && status.isControlling === false) {
		// 	// timeout = setTimeout(() => {
		// 	// 	setIsExpanded(false);
		// 	// }, 3000);
		// } else if (status.isControlling === true) {
		// 	if (timeout) clearTimeout(timeout);
		// }

		if (arrowUp) {
			timeout = setTimeout(() => {
				setArrowUp(false);
			}, 1300);
		}

		if (active) {
			timeout = setTimeout(() => {
				setActive(false);
			}, 500);
		}

		return () => {
			if (timeout) clearTimeout(timeout);
		}
	}, [isExpanded, status.isControlling, arrowUp, active]);

	function openSongPage() {
		controls.openCurrent();
	}

	return (
		<>
			{currentSong ? <div className={styles.topTarget} onClick={() => {
					setArrowUp(true);
					if (arrowUp) {
						setActive(true);
						setIsExpanded(!isExpanded);
					}
				}}
				style={{ 
					height: isExpanded ? '140px' : '110px',
				}}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				<div 
				className={styles.arrow} 
				style={{
					top: arrowUp ? '0px' : '75%', 
					opacity: arrowUp ? '1' : '0', 
					visibility: arrowUp ? 'visible' : 'hidden',
					rotate: isExpanded ? '180deg' : '0deg',
					borderColor: active ? 'var(--accent2)' : 'var(--border-color)',
					scale: active ? '1.1' : '1',
				}}>
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
				</div> 
			</div> : null}
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
					// boxShadow: arrowUp || isExpanded ? '0 -20px 25px 15px rgba(0, 0, 0, 0.73)' : '0 0 25px 15px rgba(0, 0, 0, 0.411)',
					touchAction: 'pan-y',
					WebkitTapHighlightColor: 'transparent',
				}}
				onClick={e => {
					if (!isExpanded) controls.openCurrent();
				}}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{/* <div 
					className={styles.handle}
					style={{
						width: isExpanding ? '50px' : '35px',
					}} 
				/> */}
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