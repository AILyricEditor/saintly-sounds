import styles from "./page.module.css";
import { songs } from "../../data/songs.json";
import SongCover from "../../components/SongCover";

export function generateStaticParams() {
  return songs.map(song => ({ id: "song-" + song.id.toString() }));
}

export default function Song({ params }) {
	const song = songs.find(s => "song-" + s.id.toString() === params.id);

	return (
		<div className={styles.container}>
			<div className={styles.background}
				style={{
					backgroundImage: `url(${song.image})`,
				}}>
			</div>
			<main className={styles.main}>
				<SongCover
					size={250}
					song={song}
				/>
				<h1 className={styles.title}>{song.title}</h1>
			</main>
		</div>
	);
}