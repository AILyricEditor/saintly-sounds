"use client";

import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import SongCover from '../SongCover';
import { useCurrentSong } from '../../contexts/CurrentSongContext';
import LoadingSpinner from '../LoadingSpinner';
import SongTitle from '../SongTitle';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import SongTimeline from '../shared/SongControls/SongTimeline';
import SongControlButtons from '../shared/SongControls/SongControlButtons';

export default function CurrentSong() {
	const { currentSong, status, controls } = useCurrentSong();
	const [isExpanded, setIsExpanded] = useState(false);
	const router = useRouter();
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
		};
	}, [isExpanded, status.isControlling]);

	function openSongPage() {
		router.push(`/music/song-${currentSong.id}`);
	}

	return (
		<>
			<div className={`${styles.currentSong} ${!currentSong && styles.hidden} ${pathname.startsWith(`/music/song-${currentSong?.id}`) && styles.hidden} ${isExpanded ? styles.expanded : ""}`} onClick={e => {
				if (e.target.matches('button') || e.target.matches('svg') || e.target.matches(`.${styles.timeline} *`)) return;
				setIsExpanded(!isExpanded);
			}}
			>
				{status.isLoaded ? <>
					<SongCover 
						className={`${styles.songCover}`}
						song={currentSong} 
						onClick={openSongPage}
					/>
					<div className={styles.songInfo}>
						<SongTitle song={currentSong} />
						<p>Artist: {currentSong.artist}</p>
						<p>Album: {currentSong.album}</p>
					</div>
					<div className={styles.songControls}>
						<SongControlButtons />
						<SongTimeline className={styles.timeline} />
					</div>
				</> : <LoadingSpinner size={20}/>}
			</div>
		</>
	)
}