import Link from 'next/link';

export default function NavTab({link, active, children, className = '', onClick }) {
	return (
		<div className={`
				${className}
			`}
			onClick={onClick}
		>
			{link.icon && active ? link.activeIcon : link.icon}		
			<p>{link.label}</p>
			{!active && <Link href={link.href}></Link>}
			{children}
		</div>
	)
}