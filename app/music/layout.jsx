import Navigation from "./Navigation";

export default function MusicLayout({ children }) {
	return (
		<>
			<Navigation />
			{children}
		</>
	)
}