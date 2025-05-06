import styles from './Footer.module.css';

export default function Footer() {
	const update = true;

  return (
		<footer className={`${styles.footer} ${update && styles.update}`}>
			<p>v0.5.0-alpha</p>
			{update && <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>}
		</footer>
	);
}
