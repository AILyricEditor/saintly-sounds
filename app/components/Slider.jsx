"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";

export default function Slider({ width = 100, min = 0, max = 100, value = 0, onSlide, onStop }) {
	const [fillWidth, setFillWidth] = useState(value);
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setHovering] = useState(false);
	const ref = useRef(null);

	const mousePosition = {
		precise: function(e) {
			const { left, width: elementWidth } = ref.current?.getBoundingClientRect();
			return Math.max(0, Math.min(e.clientX - left, elementWidth));
		},
		approximate: function(e) {
			const { width: elementWidth } = ref.current?.getBoundingClientRect();
			if (this.precise(e) >= elementWidth) return max;
			else if (this.precise(e) <= 0) return min;
			else return Math.ceil((this.precise(e) / elementWidth) * (max - min)) + min
		}
	}

	function calculateWidth(width) {
	  const { width: elementWidth } = ref.current?.getBoundingClientRect();
		return (elementWidth / max) * width;
	}

	useEffect(() => {
		function onMouseDown(e) {
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
			setIsDragging(true);
			setFillWidth(mousePosition.precise(e));
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
		element.addEventListener("mousedown", onMouseDown);

		return () => {
			element.removeEventListener("mousedown", onMouseDown)
		}
	}, [isDragging]);

	useEffect(() => {
	  if (!isDragging) setFillWidth(calculateWidth(value));
	}, [value])

  return (
		// This wrapper element is to give the slider a bigger hit area for touch events
		<div ref={ref} className={styles.targetContainer} 
			style={{width: width}}
			onMouseOver={() => setHovering(true)}
			onMouseOut={() => setHovering(false)}
		>
			<div className={styles.timeBar} style={{
				width: width,
				background: isDragging && "color-mix(in srgb, grey 80%, black 10%)",
			}}
			>
				<div className={styles.timeBarFill} style={{
					width: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 50%)",
					scale: isDragging ? "1 1.1" : "1"
				}}>
				</div>
				<div className={styles.timeThumb} style={{
					left: fillWidth,
					background: isDragging && "color-mix(in srgb, var(--accent2) 80%, red 80%)",
					boxShadow: isDragging && "0 0 10px 2px black",
					scale: isDragging ? "1.2" : "1",
					opacity: isDragging || isHovering  ? "1" : "0"
				}}>
				</div>
			</div>
		</div>
	);
}