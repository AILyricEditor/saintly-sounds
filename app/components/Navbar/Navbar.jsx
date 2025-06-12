"use client";

import links from './links'; // Import the links array
import styles from './styles.module.css';
import NavTab from './NavTab'; // Import the NavTab component

export default function Navbar() {

	return (
		<>
			<nav className={styles.nav}>
				<img src="/saintly-sounds4.png" alt="Saintly Sounds" className={styles.logo} />
				<div className={`${styles.tabs}`}>
					{links.map((link, index) => {
						return (
							<NavTab 
								link={link} 
								key={index}
								className={`
									${styles.tab}
									${link.active() && styles.active}
								`}
							>
								{link.sublinks && <div className={styles.subTabs}>
									{link.sublinks.map((link, index) => {
										return (
											<NavTab 
												link={link} 
												key={index}
												className={`
													${styles.subTab}
													${link.active() ? styles.active : ''} 
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