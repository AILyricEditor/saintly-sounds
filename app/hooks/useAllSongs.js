"use client";

import { useState, useEffect } from "react";

export default function useAllSongs() {
	const [songs, setSongs] = useState(null);

	useEffect(() => {
		fetch("https://ailyriceditor.github.io/saintly-sounds/songs.json")
			.then(res => res.json())
			.then(data => {
				setSongs(data.songs);
			})
			.catch(err => {
				console.error("Failed to fetch songs.json:", err);
			});
	}, []);

	return songs;
}