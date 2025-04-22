import styles from "./ToggleButton.module.css";

export default function ToggleButton({ states, value, onChange }) {

	return (
		<button className={styles.toggleButton} onClick={() => {
			const nextState = (value + 1) % states.length;
			onChange(nextState);
		}}>
			{states[value]}
		</button>
	);
}