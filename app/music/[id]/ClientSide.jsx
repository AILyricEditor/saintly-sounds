"use client";

import styles from './page.module.css';
import SongControls from '../../components/shared/SongControls/SongControls';
import { useCurrentSong } from '../../contexts/CurrentSongContext';
import SongCover from '../../components/SongCover';
import Player from '../../components/Player';

export default function ClientSide({ song }) {
	const { currentSong, status } = useCurrentSong();

	const isCurrentSong = status.isLoaded && currentSong.id === song.id;

	return (
		<>
			{isCurrentSong && 
			<SongControls 
				className={styles.songControls} 
				sliderHeight={7}
			/>}
			<SongCover
				className={`
					${styles.songCover} 
					songCover
				`}
				size={250}
				song={song}
			>
				<Player 
					song={song} 
					size={"40%"} 
					style={{
						transition: "all 0.3s ease-in-out",
						opacity: isCurrentSong ? 0 : 1,
						visibility: isCurrentSong ? 'hidden' : 'visible',
					}}
				/>
			</SongCover>
		</>
	)
}