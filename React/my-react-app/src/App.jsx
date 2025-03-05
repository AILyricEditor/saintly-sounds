import { useState } from 'react'
import Song from './Song.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const songs = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    album: 'Album 1',
    duration: '3:45',
    image: reactLogo,
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    inspiration: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    credits: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
  },
  {
    title: 'Song 2',
    artist: 'Artist 2',
    album: 'Album 2',
    duration: '4:20',
    image: viteLogo,
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    inspiration: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    credits: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
  },
  {
    title: 'Song 3',
    artist: 'Artist 3',
    album: 'Album 3',
    duration: '2:33',
    image: reactLogo,
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    inspiration: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
    credits: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore ipsa fugit magnam vero a eos enim doloremque! Tenetur in iusto magni, corporis nobis, tempora voluptatum modi aperiam mollitia, adipisci eum.",
  }
]

const songElements = songs.map(song => {
  return <Song song={song}></Song>
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {songElements}
    </>
  )
}

export default App
