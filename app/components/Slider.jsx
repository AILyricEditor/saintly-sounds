"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";

export default function Slider({ 
	className,
	width = 100,
	height = 7,
	min = 0, 
	max = 100, 
	value = 0, 
	onSlide, 
	onStop, 
	disabled = false}
) {
	const [fillWidth, setFillWidth] = useState(value);
	const [isDragging, setIsDragging] = useState(false);
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

	useEffect(() => {
		if (!isDragging) setFillWidth(calculateWidth(value));
	}, [value]);

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
	}, [isDragging, disabled, onSlide, onStop]);

  return (
		// This wrapper element is to give the slider a bigger hit area for touch events
		<div ref={ref} className={`${styles.targetContainer} ${disabled && styles.disabled} ${className}`}
			style={{
				width: width,
				height: height + 15,
			}}
		>
			<div className={styles.timeBar} style={{
				height: height,
				background: isDragging && "color-mix(in srgb, grey 80%, black 10%)",
			}}
			>
				<div className={styles.timeBarFill} style={{
					width: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 50%)",
					// scale: isDragging ? "1 1.1" : "1"
					scale: isDragging ? "1 1.3" : "1",
				}}>
				</div>
				{!disabled && <div className={styles.timeThumb} style={{
					left: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 80%)",
					boxShadow: isDragging && "0 0 10px 2px black",
					scale: isDragging ? "1.5" : "1",
					opacity: isDragging ? 0 : 1,
					height: height + 8,
					width: height + 8,
				}}>
				</div>}
			</div>
		</div>
	);
}