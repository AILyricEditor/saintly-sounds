import styles from "./styles/ToggleButton.module.css";

export default function ToggleButton({ states, currentState, onChange, className }) {

	return (
		<button className={`${styles.toggleButton} ${className}`} onClick={(e) => {
			e.stopPropagation();
			const nextState = (currentState + 1) % states.length;
			onChange(nextState);
		}}>
			{states[currentState]}
		</button>
	);
}