"use client";

import { useState } from 'react';
import { GlobalContext } from './GlobalContext';

export default function GlobalProvider({ children }) {
	const [state, setState] = useState({});

  function updateState(id, newState) {
    setState({
      ...state,
      [id]: newState,
    });
  };

	return (
		<GlobalContext.Provider value={[state, updateState]}>
			{children}
		</GlobalContext.Provider>
	);
}