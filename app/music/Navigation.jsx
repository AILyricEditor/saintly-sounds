"use client"

import styles from './Navigation.module.css';
import Link from 'next/link';
import { isOnPage } from "../tools/tools";

export default function Navigation() {
	const links = [
		{ href: '/music', label: 'Songs', active: isOnPage('/music', ["/music/albums", "/music/singles"]) },
		{ href: '/music/albums', label: 'Albums', active: isOnPage('/music/albums') },
		{ href: '/music/singles', label: 'Singles', active: isOnPage('/music/singles') },
	]

	return (
		<nav className={styles.nav}>
			{links.map((link, index) => {
				return (
					<Link href={link.href} key={index} className={`
						${styles.link}
						${link.active ? styles.active : ''}
					`}>
						{link.label}
					</Link>
				);
			})}
		</nav>
	)
}