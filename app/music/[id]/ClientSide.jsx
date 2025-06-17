"use client";

import styles from './page.module.css';
import SongControls from '../../components/shared/SongControls/SongControls';
import { useCurrentSong } from '../../contexts/CurrentSongContext';

export default function ClientSide({ song }) {
	const { currentSong } = useCurrentSong();

	return (
		<>
			{currentSong?.id === song.id && <SongControls 
				className={styles.songControls} 
				sliderHeight={7}
			/>}
		</>
	)
}