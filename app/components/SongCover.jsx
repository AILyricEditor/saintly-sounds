import styles from './SongCover.module.css';

export default function SongCover({ size = 75, song, children, style, className = '' }) {

	return (
		<div className={`${styles.songCover} ${className}`} style={{ ...style, width: size, height: size }}>
			<img src={song.image} alt={song.title} />
			{children}
		</div>
	);
}