"use client";

import styles from './styles/Update.module.css'
import { useEffect, useState } from 'react';

export default function Update() {
	const [v4, setV4] = useState(true);
	const [v5, setV5] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setV4(false);
			// setTimeout(() => {
			setV5(true);
			// }, 500);
		}, 1000);
	}, []);

	return (
		<main className={styles.update}>
			<div className={styles.text}>
				<h1 className={styles.v}>v</h1>
				<div className={styles.versions}> 
					<h1 key={4} className={`${styles.v4} ${!v4 && styles.animateOut}`}
						style={{
							display: v5 && 'none'
						}}
					>4</h1>
					{v5 && <h1 key={5} className={styles.v5}>5</h1>}
				</div>
			</div>
		</main>
	)
}