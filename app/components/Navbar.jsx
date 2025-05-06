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
		<>
			<div className={styles.overlay} onClick={toggleMenu}
				style={{
					opacity: menuOpen ? 0.5 : 0,
					visibility: menuOpen ? "visible" : "hidden",
					pointerEvents: menuOpen ? "all" : "none",
				}}>
			</div>
			<nav className={styles.nav}>
				<MenuButton menuOpen={menuOpen} onOpen={toggleMenu}/>
				<div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
					<MenuButton menuOpen={menuOpen} onOpen={toggleMenu}/>
					<Link className={styles.link} href="/" onClick={toggleMenu}>Home</Link>
					<Link className={styles.link} href="/" onClick={toggleMenu}>Shop</Link>
					<Link className={styles.link} href="/music" onClick={toggleMenu}>Music</Link>
					<Link className={styles.link} href="/" onClick={toggleMenu}>News</Link>
					<Link className={styles.link} href="/" onClick={toggleMenu}>About</Link>
				</div>
			</nav>
		</>
	);
}

function MenuButton({ menuOpen, onOpen }) {
	return (
		<button className={styles.menuButton} 
			onClick={onOpen}
			style={menuOpen ? {transform: "rotate(-180deg)"} : {transform: "rotate(0deg)"}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
		</button>
	);
}