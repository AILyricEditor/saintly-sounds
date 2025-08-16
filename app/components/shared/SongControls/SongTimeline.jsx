"use client";

import styles from './styles.module.css';
import Slider from '../../Slider';
import { formatTime } from '../../../tools/tools';
import { useCurrentSong } from '../../../contexts/CurrentSongContext';

export default function SongTimeline({ style, className = '', sliderHeight }) {
	const { controls, status } = useCurrentSong();

	return (
		<div 
			className={`${className} ${styles.timeline}`} 
			style={style}
		>
			<p className={styles.time}>{formatTime(status.currentTime)}</p>
			<Slider 
				width="100%"
				height={sliderHeight}
				value={status.currentTime}
				max={status.getDuration()}
				onSlide={(value) => {
					status.setTime(value);
					status.setSeeking(true);
				}}
				onStop={(value) => {
					controls.seekTo(value);
					status.setSeeking(false);
				}}
			/>
			<p className={styles.time}>{formatTime(status.getDuration())}</p>
		</div>
	)
}

