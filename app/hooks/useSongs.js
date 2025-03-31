"use client";

import { useState, useEffect } from "react";

export default function useSongs() {
	const [songs, setSongs] = useState(null);
	
	useEffect(() => {
		fetch("/songs.json").then(res => res.json()).then(data => {
			setSongs(data.songs);
		});
	}, []);

	return songs;
}