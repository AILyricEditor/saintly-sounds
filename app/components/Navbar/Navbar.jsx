"use client";

import links from './links'; // Import the links array
import styles from './styles.module.css';
import NavTab from './NavTab'; // Import the NavTab component
import { useState, useEffect } from 'react';
import { useCurrentSong } from '../../contexts/CurrentSongContext'; // Import the CurrentSong context
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();
	const [activeLinks, setActiveLinks] = useState([]);
	const [activeSublinks, setActiveSublinks] = useState([]);

	// function isOnPage(regex) {
	// 	return regex.test(pathname);
	// }

	useEffect(() => {
		setActiveLinks(links.map((link) => {
			return link.activePattern.test(pathname);
		}));

		setActiveSublinks(links.map(link => {
			if (!link.sublinks) return [];
		  return link.sublinks.map((sub) => {
				return sub.activePattern.test(pathname);
			});
		}));
	}, [pathname]);

	console.log(activeSublinks);

	return (
		<>
			<nav className={styles.nav}>
				<img src="/saintly-sounds7.png" alt="Saintly Sounds" className={styles.logo} />
				<div className={`${styles.tabs}`}>
					{links.map((link, index) => {
						const parentIndex = index;
						const anyActiveSublinks = activeSublinks[index]?.some((active) => active);

						return (
							<NavTab 
								link={link} 
								key={index}
								className={`
									${styles.tab}
									${activeLinks[index] && styles.active}
									${activeLinks[index] && anyActiveSublinks && styles.expanded}
								`}
							>
								{link.sublinks &&
								<div className={`
									${styles.subTabs} 
								`}>
									{link.sublinks.map((link, index) => {
										const isActive = activeSublinks[parentIndex]?.[index];

										return (
											<NavTab 
												link={link} 
												key={index}
												className={`
													${styles.subTab}
													${isActive && styles.active} 
												`}
											></NavTab>
										);
									})}
								</div>}
							</NavTab>
						);
					})}
				</div>
			</nav>
		</>
	);
}