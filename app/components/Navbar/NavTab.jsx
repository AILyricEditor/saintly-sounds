import Link from 'next/link';

export default function NavTab({ link, children, className = '', onClick }) {
	return (
		<div className={`
				${className}
			`}
			onClick={onClick}
		>
			{link.active() && link.icon ? link.activeIcon : link.icon}
			<p>{link.label}</p>
			{!link.active() && <Link href={link.href}></Link>}
			{children}
		</div>
	)
}