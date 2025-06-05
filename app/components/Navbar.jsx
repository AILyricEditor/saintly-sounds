"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './styles/Navbar.module.css';

export default function Navbar() {
	const [tempPath, setTempPath] = useState(null);
	const [activeMusicSubpage, setActiveMusicSubpage] = useState(null);
	const pathname = usePathname();
	const section = tempPath ? tempPath.split('/')[1] : pathname.split('/')[1]; // e.g. "music"
	const pageRegExp = new RegExp(`^/${section}(/|$)`, 'i'); // To prevent user from re-navigating to the same page

	function useIsOnPage(targetHref) {
		const pathname = usePathname();
		return pathname === targetHref || pathname.startsWith(`${targetHref}/`);
	}

	useEffect(() => {
		setTempPath(pathname);
		// UNFORTUNATELY, this is a workaround to get the current sublink for music pages
		const currentSublink = links[2].sublinks.find(sub => sub.href === pathname);
		if (pathname.startsWith('/music') && currentSublink) {
			setActiveMusicSubpage(currentSublink);
		}
	}, [pathname]);

	const links = [
		{ 
			href: '/',
			active: useIsOnPage('/'),
			label: 'Home',
			icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>,
			activeIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
		},
		{ 
			href: '/music-dashboard',		
			active: useIsOnPage('/music-dashboard'),	 
			label: 'Shop',
			icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>,
			activeIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z"/></svg>,
		},
		{ 
			href: '/music',
			active: useIsOnPage('/music'),
			label: 'Music',
			icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z"/></svg>,
			activeIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Z"/></svg>,
			sublinks: [
				{ href: '/music', label: 'Songs' },
				{ href: '/music/albums', label: 'Albums' },
				{ href: '/music/singles', label: 'Singles' },
			]
		},
		{ href: ' ',
			active: useIsOnPage(' '),
			label: 'News',
			icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>,
			activeIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80Z"/></svg>
		},
		{ href: '  ',
			active: useIsOnPage('  '),
			label: 'About',
			icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>,
			activeIcon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg> 
		}
	]

	return (
		<>
			<nav className={styles.nav}>
				<img src="/saintly-sounds4.png" alt="Saintly Sounds" className={styles.logo} />
				<div className={`${styles.tabs}`}>
					{links.map((link, index) => {
						return (
							<div className={`
									${styles.tab}
									${link.active ? styles.active : ''}
									${link.active ? styles.expanded : ''}
								`}
								key={index}
							>
								{link.active ? link.activeIcon : link.icon}
								<p>{link.label}</p>
								{!pageRegExp.test(link.href) && <Link
									onClick={() => setTempPath(link.href)}
									href={link.href} 
								></Link>}

								{link.sublinks && <div className={styles.subTabs}>
									{link.sublinks.map((link, index) => {
										return (
											<div key={index} 
												className={`
													${styles.subTab}
													${link.href === activeMusicSubpage?.href ? styles.active : ''} 
												`}
											>
												<p>{link.label}</p>
												<Link
													onClick={(e) => {
														e.stopPropagation();
														setTempPath(link.href);
													}}
													href={link.href} 
												></Link>
											</div>
										);
									})}
								</div>}
							</div>
						);
					})}
				</div>
			</nav>
		</>
	);
}

// DONE: this component is cleaned up and fixed