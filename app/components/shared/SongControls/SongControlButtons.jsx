"use client";

import styles from './styles.module.css';
import ToggleButton from '../../ToggleButton';
import Player from '../../Player';
import { useCurrentSong } from '../../../contexts/CurrentSongContext';

export default function SongControlButton({ }) {
	const { controls, status, currentSong } = useCurrentSong();

	return (
		<div className={styles.controlButtons}>
			<ToggleButton className={`iconButton`} states={[
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>,
					<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"/></svg>
				]}
				currentState={status.shuffle === true ? 1 : 0}
				onChange={() => {
					status.shuffle ? controls.unShuffle() : controls.shuffle();
					controls.setShuffle(!status.shuffle);
					status.setControlling();
				}}
			/>
			<button className={`iconButton hoverBG`} onClick={() => {
				controls.previous();
				status.setControlling();
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M220-240v-480h80v480h-80Zm520 0L380-480l360-240v480Z"/></svg>
			</button>
			<Player song={currentSong} />
			<button className={`iconButton hoverBG`} onClick={() => {
				controls.next();
				controls.play();
				status.setControlling();
			}}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M660-240v-480h80v480h-80Zm-440 0v-480l360 240-360 240Z"/></svg>
			</button>
			<ToggleButton states={[
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
					<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>,
					<svg style={{fill: "var(--accent2)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M460-360v-180h-60v-60h120v240h-60ZM280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z"/></svg>
				]}
				currentState={status.loop}
				onChange={(next) => {
					controls.setLoop(next);
					status.setControlling();
				}}
			/>
		</div>
	)
}