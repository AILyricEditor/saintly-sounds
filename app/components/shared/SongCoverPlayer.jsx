import SongCover from "../SongCover";
import Player from "../Player";

export default function SongCoverPlayer({ playerSize = "50%", song, style, size, className }) {
	return (
		<SongCover song={song} style={style} size={size} className={className}>
			<Player song={song} size={playerSize} />
		</SongCover>
	)
}