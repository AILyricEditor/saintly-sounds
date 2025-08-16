"use client";

import styles from './styles/SongCover.module.css';

export default function SongCover({ size = 75, song, children, style, className, onClick = () => {} }) {

	return (
		<div onClick={(e) => { 
				e.stopPropagation();
				onClick();
			}}
			className={`${styles.songCover} SongCover ${className || ''}`} 
			style={{ ...style, width: size, height: size }}
		>
			<img src={song.image} alt={song.title} />
			{children}
		</div>
	);
}