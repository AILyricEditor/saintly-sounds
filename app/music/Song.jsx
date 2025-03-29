import styles from './Song.module.css';
import SongCover from '../components/SongCover';
import Player from "../components/Player";

export default function Song({ song, isExpanded, onExpand }) {

	return (
		<section className={`${styles.musicCard} ${isExpanded && styles.expanded}`} 
			onClick={onExpand}
			style={isExpanded ? {
				height: "600px",
				gridTemplateRows: "100px 1fr 1fr 1fr"
			} : {
				height: "50px",
				gridTemplateRows: "50px 1fr 1fr 1fr"
			}}
		>
			<div className={styles.songTopbar}>
				<SongCover className={styles.songCover} width={isExpanded ? 100 : 60} height={isExpanded ? 100 : 60} src={song.image} alt={song.title}>
					<Player song={song} width="50%" height="50%" />
				</SongCover>
				<div className={styles.songInfo}>
					<h3>{song.title}</h3>
					<p>Artist: {song.artist}</p>
					<p>Album: {song.album}</p>
				</div>
				<p className={styles.songDuration}>{song.duration}</p>
			</div>
				<SongSection isExpanded={isExpanded} type="lyrics">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-24 11-44 27t-36 36v-80H160v527l47-47h393v-160q16 20 36 36t44 27v97q0 33-23.5 56.5T600-240H240L80-80Zm160-320h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 2t19 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm-80 320v-480 480Z"/></svg>
					<p>{song.lyrics}</p>
				</SongSection>
				<SongSection isExpanded={isExpanded} type="inspiration">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
					<p>{song.inspiration}</p>
				</SongSection>
				<SongSection isExpanded={isExpanded} type="credits">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>
					<p>{song.credits}</p>
				</SongSection>
		</section>
	);
}

function SongSection({ type, isExpanded, children }) {
	return (
		<div className={`${styles[type]} ${styles.songSection}`}
			style={isExpanded ? {
				visibility: "visible",
				opacity: "1"
			} : {
				visibility: "hidden",
				opacity: "0"
			}}
		>
			<h2>{type}</h2>
			{children}
		</div>
	)
}