import styles from './styles/SongTitle.module.css';
import Link from 'next/link';

export default function SongTitleLink({ href, song }) {
	return (
		<Link href={href || `/song/${song.id}`}
			className={`${styles.title} SongTitle`}
			onClick={e => e.stopPropagation()}
		>
			<h3>{song.title}</h3>
		</Link>
	);
}