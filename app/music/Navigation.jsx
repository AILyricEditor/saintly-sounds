import styles from './Navigation.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname();
	const links = [
		{ href: '/music', label: 'Songs' },
		{ href: '/music/albums', label: 'Albums' },
		{ href: '/music/singles', label: 'Singles' },
	]

	return (
		<nav className={styles.nav}>
			{links.map((link, index) => {
				return (
					<Link href={link.href} key={index} className={`
						${styles.link}
						${pathname === link.href ? styles.active : ''}
					`}>
						{link.label}
					</Link>
				);
			})}
		</nav>
	)
}