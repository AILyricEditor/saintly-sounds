import styles from './styles/page.module.css';

export default function MusicDashboard() {
	return (
		<main className={styles.musicDashboard}>
			<section className={`${styles.new}`}>1</section>
			<section className={styles.albums}>2</section>
			<section className={styles.singles}>3</section>
			<section className={styles.songs}>4</section>
		</main>
	);
}