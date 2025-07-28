"use client";

import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import SongCover from '../SongCover';
import { useCurrentSong } from '../../contexts/CurrentSongContext';
import { usePathname } from 'next/navigation';
import SongTimeline from '../shared/SongControls/SongTimeline';
import SongControlButtons from '../shared/SongControls/SongControlButtons';
import SongTitleLink from '../SongTitleLink';

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
		startY.current = e.touches[0].clientY;
		setIsExpanding(true);
	}

	function handleTouchEnd(e) {
		if (status.isControlling) {
			return;
		}

		const endY = e.changedTouches[0].clientY;
		const deltaY = endY - startY.current;

		if (deltaY < -10 && !isExpanded) {
			// SWIPE UP
			setIsExpanded(true);
			setArrowUp(true);
		}

		setIsExpanding(false);
	}

	useEffect(() => {
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
				onTouchStart={(e) => {
					e.stopPropagation();
					handleTouchStart(e);
				}}
				onTouchEnd={(e) => {
					e.stopPropagation();
					handleTouchEnd(e);
				}}
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
					touchAction: 'pan-y',
					WebkitTapHighlightColor: 'transparent',
				}}
				onClick={e => {
					if (!isExpanded && e.target.matches('[data-stop-prop]')) controls.openCurrent();
				}}
				onTouchStart={(e) => {
					e.stopPropagation();
					handleTouchStart(e);
				}}
				onTouchEnd={(e) => {
					e.stopPropagation();
					handleTouchEnd(e);
				}}
			>
				{currentSong && <>
					<SongCover 
						className={`${styles.songCover} pointer`}
						song={currentSong} 
						onClick={() => controls.openCurrent()}
					/>
					<div className={styles.songInfo}>
						{/* <h3 className="hoverUnderline" 
							onClick={() => controls.openCurrent()}>{currentSong.title}
						</h3> */}
						<SongTitleLink maxWidth={'30vw'} song={currentSong}>{currentSong.title}</SongTitleLink>
						<p onClick={() => controls.openCurrent()}>Artist: {currentSong.artist}</p>
						<p onClick={() => controls.openCurrent()}>Album: {currentSong.album}</p>
					</div>
					<div className={styles.songControls} data-stop-prop >
						<SongControlButtons />
						<SongTimeline className={styles.timeline} />
					</div>
				</>}
			</div>
		</>
	)
}