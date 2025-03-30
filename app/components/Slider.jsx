"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";

export default function Slider({ width = 100, min = 0, max = 100, onChange }) {
	const [fillWidth, setFillWidth] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		setFillWidth(ref.current.offsetWidth / 2);
		const half = (max - min) / 2 + min;
		if (onChange) onChange(half);

    const onMouseDown = (e) => {
			setIsDragging(true);
      document.addEventListener('mousemove', onDrag);
			document.addEventListener("mousedown", onDrag);

      const onMouseUp = () => {
				setIsDragging(false);
        document.removeEventListener('mousemove', onDrag);
				document.removeEventListener("mousedown", onDrag);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mouseup', onMouseUp);
    };

		const element = ref.current;
    element.addEventListener('mousedown', onMouseDown);

    return () => {
      element.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

	function onDrag(e) {
		const { left, width: elementWidth } = ref.current.getBoundingClientRect();
		const newPosition = Math.max(0, Math.min(e.clientX - left, elementWidth));

		setFillWidth(newPosition);
		let mappedValue = Math.ceil((newPosition / elementWidth) * (max - min)) + min;

		if (newPosition >= elementWidth) {
			mappedValue = max;
		} else if (newPosition <= 0) {
			mappedValue = min;
		}

		if (onChange) onChange(mappedValue);
	};

  return (
		<div ref={ref} className={styles.timeBar} style={{
			width: width,
			background: isDragging && "color-mix(in srgb, grey 80%, black 10%)",
		}}>
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
				scale: isDragging ? "1.2" : "1"
			}}>
			</div>
		</div>
	);
}