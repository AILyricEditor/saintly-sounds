"use client";

import styles from "./styles.module.css";
import SongTimeline from "./SongTimeline";
import SongControlButtons from "./SongControlButtons";

export default function SongControls({ className = '', sliderHeight }) {
	return (
		<div className={`${className} ${styles.songControls}`}>
			<SongControlButtons className="SongControlButtons" style={{width: "100%"}} />
			<SongTimeline className="SongTimeline" sliderHeight={sliderHeight} style={{width: "100%"}} />
		</div>
	)
}