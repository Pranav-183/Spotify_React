import './styles/App.css';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Songs from './data/Songs.json'
import TopBar from './components/common/TopBar';
import Navbar from './components/common/Navbar';
import BottomBar from './components/common/BottomBar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Album from './components/pages/Album';
import Search from './components/pages/Search';

const App = () => {
  let songs = Songs.songs

  const [currentUser, setCurrentUser] = useState(null)
  const [songInfo, setSongInfo] = useState({
    songName: 'Wonder',
    songAlbum: 'Four',
    songArtist: 'Shawn Mendes',
    songDuration: '04:00',
    songCurrentTime: '2:56',
    songPlaying: false,
    songVolume: 100
  })
  const audio = new Audio(`songs/${songInfo.songName} - ${songInfo.songArtist}.mp3`)

  useEffect(() => {
    console.log(audio)
  }, [])

  const plauseSongItem = (e) => {
    let plauseIcon = e.target
    let songName = e.target.parentElement.parentElement.parentElement.children[1].innerText
    let plauseDiv = e.target.parentElement
    let songNumber = e.target.parentElement.parentElement.children[0]
    let plauseMain = document.querySelector('.plause')

    if (plauseIcon.parentElement.classList.contains('playing')) {
      plauseIcon.innerText = 'play_arrow'
      plauseDiv.classList.remove('playing')
      songNumber.classList.remove('playing')
      audio.pause()
      plauseMain.innerText = 'play_circle_filled'
    } else {
      let songToBePlayed = songs.find(song => song.songName === songName)
      audio.src = `songs/${songToBePlayed.songName} - ${songToBePlayed.songArtist}.mp3`
      audio.play()
      plauseIcon.innerText = 'pause'
      plauseDiv.classList.add('playing')
      songNumber.classList.add('playing')
      plauseMain.innerText = 'pause_circle'
    }
  }

  const plauseSongGroup = () => {
    let group = document.querySelector('.Album') || document.querySelector('.Playlist')
    console.log(group)
  }

  const plauseSongMain = () => {
    let plauseMain = document.querySelector('.plause')
    let spanInfoSongName = document.querySelector('.spanInfoSongName')
    let spanInfoSongArtist = document.querySelector('.spanInfoSongArtist')

    if (plauseMain.innerText === 'pause_circle') {
      plauseMain.innerText = 'play_circle_filled'
      audio.pause()
    } else if (plauseMain.innerText === 'play_circle_filled') {
      plauseMain.innerText = 'pause_circle'
      audio.play()
    }
  }

  return (
    <HashRouter>
      <div className="all">
        <audio src={`songs/${songInfo.songName} - ${songInfo.songArtist}.mp3`}></audio>
        <div className="sides">
          <Navbar />
          <div className="rightSide">
            <TopBar currentUser={currentUser} />
            <Routes>
              <Route path='/' index element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/albums/:album' element={<Album songInfo={songInfo} setSongInfo={setSongInfo} plauseSongItem={plauseSongItem} plauseSongGroup={plauseSongGroup} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/signin' element={<SignIn currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            </Routes>
          </div>
        </div>
        <BottomBar plauseSongMain={plauseSongMain} />
      </div>
    </HashRouter>
  )
}

export default App;
