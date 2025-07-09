"use client";

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import SongCover from '../SongCover';
import { useCurrentSong } from '../../contexts/CurrentSongContext';
import SongTitle from '../SongTitleLink';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import SongTimeline from '../shared/SongControls/SongTimeline';
import SongControlButtons from '../shared/SongControls/SongControlButtons';

export default function CurrentSong() {
	const { currentSong, status, controls } = useCurrentSong();
	const [isExpanded, setIsExpanded] = useState(false);
	const pathname = usePathname();

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
		}
	}, [isExpanded, status.isControlling]);

	function openSongPage() {
		controls.openCurrent();
	}

	return (
		<>
			<div className={`
				${styles.currentSong} 
				${!currentSong && styles.hidden} 
				${pathname === `song/${currentSong?.id}` && styles.hidden} 
				${isExpanded ? styles.expanded : ""}
				${status.isOpened && styles.hidden}
				${status.pendCurrentPage && styles.hidden}
			`} 
			onClick={e => {
				if (e.target.matches('button') || e.target.matches('svg') || e.target.matches(`.${styles.timeline} *`)) return;
				setIsExpanded(!isExpanded);
			}}
			>
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