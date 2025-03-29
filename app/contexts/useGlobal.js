import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export default function useGlobal(id) {
	const [ state, updateState ] = useContext(GlobalContext);

	return [
		state[id],
		(newState) => updateState(id, newState),
	];
}