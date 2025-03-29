import styles from './SongCover.module.css';

export default function SongCover({ width = 100, height = 100, src, alt, children }) {

	return (
		<div className={styles.songCover} style={{ width: width, height: height }}>
			<img src={src} alt={alt} />
			{children}
		</div>
	);
}