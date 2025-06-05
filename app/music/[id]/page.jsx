import styles from "./page.module.css";
import { songs as allSongs } from "../../data/songs.json";
import SongCover from "../../components/SongCover";
// import { useCurrentSong } from "../../contexts/CurrentSongContext";
import ClientSide from "./ClientSide";

export function generateStaticParams() {
  return allSongs.map(song => ({ id: "song-" + song.id.toString() }));
}

export default function Song({ params }) {
	// const { status } = useCurrentSong();
	const song = allSongs.find(s => "song-" + s.id.toString() === params.id);

	return (
		<div className={styles.container}>
			{/* <div className={styles.background}
				style={{
					animation: status && "ambience 10s ease-in-out infinite",
					backgroundImage: `url(${song.image})`,
				}}>
			</div> */}
			<ClientSide song={song} />
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