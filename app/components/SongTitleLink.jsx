import styles from './styles/SongTitle.module.css';
import Link from 'next/link';
import clsx from 'clsx';

export default function SongTitleLink({ href, song, maxWidth = 100, className = ''}) {
	return (
		<Link href={href || `/song/${song.id}`}
			className={clsx('w-min block no-underline text-sm text-white hover:underline', className, 'SongTitle')}
			onClick={e => e.stopPropagation()}
		>
			<h3 className={'truncate'} style={{maxWidth: maxWidth}}>{song.title}</h3>
		</Link>
	);
}