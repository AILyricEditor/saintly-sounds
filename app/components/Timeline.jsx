"use client"

import { useState, useEffect, useRef } from "react";
import styles from "./Timeline.module.css"

export default function Timeline() {
	const [width, setWidth] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
    const onMouseDown = (e) => {
      document.addEventListener('mousemove', onDrag);
			document.addEventListener("mousedown", onDrag);


      const onMouseUp = () => {
        document.removeEventListener('mousemove', onDrag);
				document.removeEventListener("mousedown", onDrag);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mouseup', onMouseUp);
    };

    ref.current.addEventListener('mousedown', onMouseDown);

    return () => {
      ref.current.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  function onDrag(e) {
    const { left, width: elementWidth } = ref.current.getBoundingClientRect();
    const newPosition = Math.max(0, Math.min(e.clientX - left, elementWidth));

    setWidth(newPosition);
  };

  return (
		<div className={styles.timeline}>
			<p className={styles.time}>1:22</p>
			<div ref={ref} className={styles.timeBar} type="range">
				<div className={styles.timeBarFill} style={{width: width}}></div>
				<div className={styles.timeThumb} style={{left: width}}></div>
			</div>
			<p className={styles.time}>3:12</p>
		</div>
	);
}