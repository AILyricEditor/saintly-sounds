// /app/create/layout.jsx
export const metadata = {
	title: 'Create - Saintly Sounds',
	description: 'Create page layout',
};

export default function CreateLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<main style={{ padding: 20, fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial' }}>
					<h1>Hello world</h1>
					{children}
				</main>
			</body>
		</html>
	);
}