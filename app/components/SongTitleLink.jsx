import styles from './styles/SongTitle.module.css';
import Link from 'next/link';

export default function SongTitleLink({ href, song, maxWidth = 100, className = ''}) {
	return (
		<Link href={href || `/song/${song.id}`}
			className={`${styles.title} ${className} SongTitle`}
			onClick={e => e.stopPropagation()}
		>
			<h3 className={`${styles.text} truncate`} style={{maxWidth: maxWidth}}>{song.title}</h3>
		</Link>
	);
}