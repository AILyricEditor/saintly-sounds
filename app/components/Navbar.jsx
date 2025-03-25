"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	function toggleMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<nav className={styles.nav}>
			<MenuButton menuOpen={menuOpen} onOpen={toggleMenu}/>
			<div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
				<MenuButton menuOpen={menuOpen} onOpen={toggleMenu}/>
				<Link className={styles.link} href="/">Home</Link>
				<Link className={styles.link} href="/">Shop</Link>
				<Link className={styles.link} href="/music">Music</Link>
				<Link className={styles.link} href="/">News</Link>
				<Link className={styles.link} href="/">About</Link>
			</div>
		</nav>
	);
}

function MenuButton({ menuOpen, onOpen}) {
	return (
		<button className={styles.menuButton} 
			onClick={onOpen}
			style={menuOpen ? {transform: "rotate(-180deg)"} : {transform: "rotate(0deg)"}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
		</button>
	);
}