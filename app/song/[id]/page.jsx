import styles from "./page.module.css";
import { songs as allSongs } from "../../data/songs.json"; // Import the songs data
import SongCover from "../../components/SongCover";
import Player from "../../components/Player";

export function generateStaticParams() {
  return allSongs.map(song => ({ id: song.id.toString() }));
}

export default function SongPage({ params }) {
	const song = allSongs.find(s => s.id.toString() === params.id);

	return (
		<main className={`${styles.main}`}>
			<div className={styles.content}>
				<h1 className={styles.title}>{song.title}</h1>
				<br />
				<h3>Lyrics</h3>
				<h5 className={styles.lyrics}>{song.lyrics}</h5>
				<br />
				<br />
				<h6>More coming soon...</h6>
			</div>
			<SongCover
				className={`
					${styles.songCover} 
					songCover
				`}
				size={250}
				song={song}
			>
				<Player song={song} size={"35%"} />
			</SongCover>
		</main>
	)
}