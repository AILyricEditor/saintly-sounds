// "use client";

// import { useState, useEffect, useRef } from "react";
// import styles from './ClientSide.module.css';
// import { useCurrentSong } from '../../contexts/CurrentSongContext';

// export default function AmbientSongBackground({ song }) {
// 	const { status } = useCurrentSong();
// 	const backgroundRef = useRef(null);

// 	// const [animationSpeed, setAnimationSpeed] = useState(15);

// 	// useEffect(() => {
// 	// 	if (!status.isPlaying) {
// 	// 		// Wait for the animation cycle to end (e.g., 15s)
// 	// 		const timeout = setTimeout(() => {
// 	// 			setAnimationRunning(false); // Remove animation after it ends
// 	// 		}, 15000); // Match your animation duration

// 	// 		return () => clearTimeout(timeout);
// 	// 	} else {
// 	// 		setAnimationRunning(true);
// 	// 	}
// 	// }, [status.isPlaying]);

// 	// function smoothAnimation(speed) {
// 	// 	if (speed < 9999) {
// 	// 		smoothAnimation(speed + 1);
// 	//  		return `ambience ${speed}s ease-in-out infinite`;
// 	// 	}
// 	// }

// 	// useEffect(() => {
// 	// 	if (status.IsPlaying) {
// 	// 		setAnimationSpeed(15);
// 	// 	} else if (!status.isPlaying) {
// 	// 		setAnimationSpeed(9999);
// 	// 	}
// 	// }, [status.isPlaying]);

// 	// useEffect(() => {
// 	// 	let interval;

// 	// 	if (status.isPlaying) {
// 	// 		setAnimationSpeed(15);
// 	// 	} else {
// 	// 		let speed = 15;
// 	// 		interval = setInterval(() => {
// 	// 			speed += 1; // or use += 0.5 for finer slowdown
// 	// 			setAnimationSpeed(speed);

// 	// 			if (speed >= 9999) {
// 	// 				clearInterval(interval); // stop slowing down
// 	// 			}
// 	// 		}, 10); // update every 100ms (smooth enough)
// 	// 	}

// 	// 	return () => clearInterval(interval); // cleanup on re-run
// 	// }, [status.isPlaying]);

// 	useEffect(() => {
// 		const speed = status.isPlaying ? "15s" : "9999s";
// 		backgroundRef.current?.style.setProperty("--animation-speed", speed);
// 	}, [status.isPlaying]);

//   return (
// 		<div className={`${styles.background}`}
// 			ref={backgroundRef}
// 			style={{
// 				backgroundImage: `url(${song.image})`,
// 				// animationDuration: `${animationSpeed}s`,
// 				// animation: `ambience ${animationSpeed}s ease-in-out infinite`,
// 			}}
// 		>
// 		</div>
// 	);
// }

"use client";

import { useEffect, useRef } from "react";
import styles from "./ClientSide.module.css";
import { useCurrentSong } from "../../contexts/CurrentSongContext";

export default function AmbientSongBackground({ song }) {
  const { status } = useCurrentSong();
  const ref = useRef(null);

  useEffect(() => {
    let interval;

		const updatePosition = () => {
		  const el = ref.current;
			if (!el) return;

			const random = (min, max) => (Math.random()  * (max - min)) + min;

			const x = random(30, 70); // wider bounds = more movement
			const y = random(30, 70);

			const blur = random(70, 80);
			const brightness = random(1, 1.7);
			const saturate = random(1.3, 1.9);
			const scale = random(0.97, 1.20); // small bounce

			el.style.setProperty("--bg-x", `${x}%`);
			el.style.setProperty("--bg-y", `${y}%`);
			el.style.setProperty("filter", `blur(${blur}px) brightness(${brightness}) saturate(${saturate})`);
			el.style.setProperty("transform", `scale(${scale})`);
		};

    if (status.isPlaying) {
      updatePosition(); // initial
      interval = setInterval(updatePosition, 5000); // update every 5s
    }

    return () => clearInterval(interval);
  }, [status.isPlaying]);

  return (
    <div
      ref={ref}
      className={styles.background}
      style={{ backgroundImage: `url(${song.image})` }}
    />
  );
}
