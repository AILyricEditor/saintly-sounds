"use client"

import { useState } from "react";
import styles from "./Timeline.module.css"
import Slider from "./Slider";

export default function Timeline() {
	const [time, setTime] = useState(0);

  return (
		<div className={styles.timeline}>
			<p className={styles.time}>{time}</p>
			<Slider width="100%" min={300} max={880} onChange={(value) => {
				setTime(value)
			}}/>
			<p className={styles.time}>3:12</p>
		</div>
	);
}