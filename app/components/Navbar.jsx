import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
	return (
		<nav className={styles.nav}>
			<Link className={styles.link} href="/">Home</Link>
			<Link className={styles.link} href="/">Shop</Link>
			<Link className={styles.link} href="/music">Music</Link>
			<Link className={styles.link} href="/">News</Link>
			<Link className={styles.link} href="/">About</Link>
			<button className="menu-button">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
			</button>
			<Sidebar />
		</nav>
	);
}

function Sidebar() {
	return (
		<aside className="sidebar">
			<button class="menu-button">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
			</button>
			<Link href="/">Home</Link>
			<Link href="/">Shop</Link>
			<Link href="/music">Music</Link>
			<Link href="/">News</Link>
			<Link href="/">About</Link>
		</aside>
	);
}