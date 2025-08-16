"use client"

import { songs as allSongs} from '../data/songs.json'; // Import the songs data
import { useContext, createContext } from 'react';

const AllSongsContext = createContext();

export const useAllSongs = () => {
	return useContext(AllSongsContext);
}

export default function AllSongsProvider({ children }) {
	return (
		<AllSongsContext.Provider value={allSongs}>
			{children}
		</AllSongsContext.Provider>
	);
}