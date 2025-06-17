import styles from "./page.module.css";
import AmbientBG from "./AmbientBG";
import { songs as allSongs } from "../../data/songs.json"; // Import the songs data
import ClientSide from "./ClientSide";

export function generateStaticParams() {
  return allSongs.map(song => ({ id: "song-" + song.id.toString() }));
}

export default function Song({ params }) {
	const song = allSongs.find(s => "song-" + s.id.toString() === params.id);

	return (
		<>
			<AmbientBG song={song} />
			<main className={styles.main}>
				<h1 className={styles.title}>{song.title}</h1>
				<ClientSide song={song} />
			</main>
		</>
	);
}