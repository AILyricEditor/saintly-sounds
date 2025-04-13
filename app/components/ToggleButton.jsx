import styles from "./ToggleButton.module.css";
import { useState } from "react";

export default function ToggleButton({ states, onClick }) {
	const [currentState, setCurrentState] = useState(0);

	return (
		<button className={styles.toggleButton} onClick={() => {
			setCurrentState((currentState + 1) % states.length);
			if (onClick && Array.isArray(onClick)) {
				if (onClick[currentState]) onClick[currentState]();
			} else if (onClick) {
			  onClick();
			}
		}}>
			{states[currentState]}
		</button>
	);
}