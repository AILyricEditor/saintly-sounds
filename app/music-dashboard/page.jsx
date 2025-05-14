import styles from './styles/page.module.css';
import Image from 'next/image';

export default function MusicDashboard() {
	return (
		<main className={styles.musicDashboard}>
			<section className={`${styles.new}`}>1</section>
			<section className={styles.albums}>
				<img src="/abstract-red.jpg" />
				<h1>Albums</h1>
				</section>
			<section className={styles.singles}>3</section>
			<section className={styles.songs}>4</section>
		</main>
	);
}