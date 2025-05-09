import styles from "./styles/ToggleButton.module.css";

export default function ToggleButton({ states, value, onChange, className }) {

	return (
		<button className={`${styles.toggleButton} ${className}`} onClick={() => {
			const nextState = (value + 1) % states.length;
			onChange(nextState);
		}}>
			{states[value]}
		</button>
	);
}