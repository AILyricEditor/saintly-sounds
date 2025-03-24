import Link from 'next/link';

export default function Navbar() {
	return (
		<nav>
			<Link href="/">Home</Link>
			<Link href="/">Shop</Link>
			<Link href="/music">Music</Link>
			<Link href="/">News</Link>
			<Link href="/">About</Link>
			<button className="menu-button">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
			</button>
		</nav>
	);
}