"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";
import { useSong } from "../contexts/SongContext";

export default function Slider({ width = 100, min = 0, max = 100, value = 0, onSlide, onStop, syncRef = { current: null }, disabled = false }) {
	const { isPlaying } = useSong();
	const [fillWidth, setFillWidth] = useState(value);
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setHovering] = useState(false);
	const ref = useRef(null);

	const mousePosition = {
		precise: function(e) {
			const { left, width: elementWidth } = ref.current.getBoundingClientRect();
			return Math.max(min, Math.min(e.clientX - left, elementWidth));
		},
		approximate: function(e) {
			const { width: elementWidth } = ref.current.getBoundingClientRect();
			return Math.max(min, Math.min(max, Math.ceil((this.precise(e) / elementWidth) * (max - min)) + min));
		}
	}

	function calculateWidth(time) {
	  const { width: elementWidth } = ref.current.getBoundingClientRect();
		return (elementWidth / max) * time;
	}

	useEffect(() => {
		function onMouseDown(e) {
			setFillWidth(mousePosition.precise(e));
			setIsDragging(true);
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
		}

		function onMouseMove(e) {
			setFillWidth(mousePosition.precise(e));
			if (onSlide) onSlide(mousePosition.approximate(e));
		}

		function onMouseUp(e) {
			setFillWidth(mousePosition.precise(e));
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener("mousemove", onMouseMove);
			setIsDragging(false);
			if (onStop) onStop(mousePosition.approximate(e));
		}

		const element = ref.current;
		if (!disabled) element.addEventListener("mousedown", onMouseDown);

		return () => {
			if (!disabled) element.removeEventListener("mousedown", onMouseDown);
		}
	}, [isDragging]);

	useEffect(() => {
		if (!syncRef.current || disabled) return;
		const syncElement = syncRef.current;

		function onTimeUpdate() {
			if (!isDragging) {
				setFillWidth(calculateWidth(syncElement.currentTime));
			}
		}

	  syncElement.addEventListener("timeupdate", onTimeUpdate);

		return () => {
			if (syncElement) syncElement.removeEventListener("timeupdate", onTimeUpdate);
		}
	}, [isDragging, syncRef.current]);

  return (
		// This wrapper element is to give the slider a bigger hit area for touch events
		<div ref={ref} className={styles.targetContainer} 
			style={{width: width}}
		>
			<div className={styles.timeBar} style={{
				width: width,
				background: isDragging && "color-mix(in srgb, grey 80%, black 10%)",
			}}
			>
				<div className={styles.timeBarFill} style={{
					width: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 50%)" || disabled && "color-mix(in srgb, var(--accent2) 50%, grey 100%)",
					scale: isDragging ? "1 1.1" : "1"
				}}>
				</div>
				<div className={styles.timeThumb} style={{
					left: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 80%)",
					boxShadow: isDragging && "0 0 10px 2px black",
					scale: isDragging ? "1.2" : "1",
				}}>
				</div>
			</div>
		</div>
	);
}