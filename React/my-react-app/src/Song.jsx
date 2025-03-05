function Song({song}) {
	return (
		<section className="music-card">
			<div className="song-topbar">
				<div className="song-thumbnail">
					<img src={song.image} alt={song.title} />
					<button className="play-button">
						<svg className="play" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="currentColor" d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"/></svg>
					</button>
				</div>
				<div className="song-info">
					<h3>{song.title}</h3>
					<p>Artist: {song.artist}</p>
					<p>Album: {song.album}</p>
				</div>
				<p className="song-duration">{song.duration}</p>
				<audio className="song-audio" src={song.audio} preload="auto"></audio>
			</div>
			<div className="lyrics song-section">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M80-80v-720q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v17q-24 11-44 27t-36 36v-80H160v527l47-47h393v-160q16 20 36 36t44 27v97q0 33-23.5 56.5T600-240H240L80-80Zm160-320h160v-80H240v80Zm520-80q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 2t19 5v-207h160v80h-80v240q0 50-35 85t-85 35Zm-520-40h280v-80H240v80Zm0-120h280v-80H240v80Zm-80 320v-480 480Z"/></svg>
				<h2>Lyrics</h2>
				<p>{song.lyrics}</p>
			</div>
			<div className="inspiration song-section">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
				<h2>Inspiration</h2>
				<p>{song.inspiration}</p>
			</div>
			<div className="credits song-section">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>
				<h2>Credits</h2>
				<p>{song.credits}</p>
			</div>
		</section>
	)
}

export default Song