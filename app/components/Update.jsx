"use client";

import styles from './styles/Update.module.css';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Lottie from "lottie-react";
import confetti from "../../public/confetti.json"; // from LottieFiles
import celebration from "../../public/celebrations-begin.json"; // from LottieFiles
import { usePathname } from 'next/navigation';

export default function Update() {
	const [showIntro, setShowIntro] = useState(false);
	const [startIntro, setStartIntro] = useState(false);
	// const [hideIntro, setHideIntro] = useState(false);
	const [animateOut, setAnimateOut] = useState(false);
	const [showV5, setShowV5] = useState(false);
	const [showAlpha, setShowAlpha] = useState(false);
	const [particleBurst, setParticleBurst] = useState(false);
	const [blurVersion, setBlurVersion] = useState(false);
	const [showLogo, setShowLogo] = useState(false);
	const [hideLogo, setHideLogo] = useState(false);
	const [hidAll, setHidAll] = useState(false);
	const [end, setEnd] = useState(false);

	const [calcLeft, setCalcLeft] = useState(0);
	const [calcWidth, setCalcWidth] = useState(0);

	const textRef = useRef(null);
	const alphaRef = useRef(null);
	const v5Ref = useRef(null);
	const vRef = useRef(null);

	const pathname = usePathname();

	useLayoutEffect(() => {
		if (showAlpha && textRef.current && alphaRef.current) {
      const textWidth = textRef.current.getBoundingClientRect().width;
      const alphaWidth = alphaRef.current.getBoundingClientRect().width;
      // const windowWidth = window.innerWidth;

			setCalcWidth(-(alphaWidth / 2 + textWidth / 2));
		} 
	}, [showAlpha]);

	useEffect(() => {
		const timeout0 = setTimeout(() => {
			setStartIntro(true);
			const timeout1 = setTimeout(() => {
				setHideIntro(true);
				const timeout2 = setTimeout(() => {
					setAnimateOut(true);
					const timeout3 = setTimeout(() => {
						setShowV5(true);
						const timeout4 = setTimeout(() => {
							setShowAlpha(true);
							const timeout4 = setTimeout(() => {
								setParticleBurst(true);
								const timeout5 = setTimeout(() => {
									setBlurVersion(true);
									const timeout6 = setTimeout(() => {
										setShowLogo(true);
										const timeout7 = setTimeout(() => {
											setHideLogo(true);
											const timeout8 = setTimeout(() => {
												setHidAll(true);
												const timeout9 = setTimeout(() => {
													setEnd(true);
													setShowIntro(false);
												}, 1000);
											}, 500);
										}, 1500);
									}, 1000);
								}, 1000)
							}, 500);
						}, 500);
					}, 500);    
				}, 1000);
			}, 500);
		}, 500);

		return () => {
			clearTimeout(timeout1);
		};
	}, []);

	useEffect(() => {
		if (!sessionStorage.getItem('introShown')) {
				setShowIntro(true);
				sessionStorage.setItem('introShown', 'true');
		}
	}, []);
	
	return (
		<>
			{!end && showIntro && <main className={styles.update} style={{
					opacity: hidAll ? 0 : 1,
					backgroundColor: !startIntro && 'black'
				}}
				onClick={() => {
					setHidAll(true);
					const timeout9 = setTimeout(() => {
						setEnd(true);
					}, 1000);
				}}>
				{/* <div className={styles.introOverlay} 
					style={{opacity: hideIntro && 0, display: animateOut && 'none'}} /> */}
				<div className={styles.text} 
					style={{
						transform: showAlpha ? `translate(${calcWidth}px, -50%)` : 'translate(-50%, -50%)',
						opacity: (blurVersion || !startIntro) && 0
					}}
					ref={textRef}>
					<h1 className={styles.v} ref={vRef} style={{color: showV5 && 'rgb(0, 209, 0)'}}>v</h1>
					{!showV5 && <h1 className={`${styles.v4} ${animateOut ? styles.animateOut : ''}`}>4</h1>}
					{showV5 && <h1 className={`${styles.v5} ${styles.animateIn}`} ref={v5Ref}>5</h1>}
					{showAlpha && <h1 className={styles.alpha} ref={alphaRef}>alpha</h1>}
				</div> 
				{/* <div className={styles.blurVersion}
					style={{background: blurVersion && 'black'}} /> */}
				{particleBurst &&
					<Lottie animationData={celebration} loop={false} 
						style={{position: 'absolute'}}
						className={styles.particles}
					/>
				}
				{showLogo && <img
					src="saintly-sounds7.png"
					alt="Saintly Sounds Logo"
					className={`${styles.logo} ${hideLogo ? styles.hideLogo : ''}`}
				/>}
				<h5 className={styles.skip}>Tap any were to skip intro</h5>
			</main>}
		</>
	);
}

function Confetti({ pos: {x, y} }) {
	return (
		<Lottie animationData={confetti} loop={false} 
			style={{ position: 'absolute', top: y, left: x, width: '500px', height: '500px' }}
		/>
	)
}