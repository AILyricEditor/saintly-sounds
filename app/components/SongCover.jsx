import styles from './styles/SongCover.module.css';

export default function SongCover({ size = 75, song, children, style }) {

	return (
		<div className={`${styles.songCover} SongCover`} style={{ ...style, width: size, height: size }}>
			<img src={song.image} alt={song.title} />
			{children}
		</div>
	);
}