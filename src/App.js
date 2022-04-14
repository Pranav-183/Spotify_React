import './styles/App.css';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Songs from './data/Songs.json';
import TopBar from './components/common/TopBar';
import Navbar from './components/common/Navbar';
import BottomBar from './components/common/BottomBar';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import Album from './components/pages/Album';
import Search from './components/pages/Search';
import Playlist from './components/pages/Playlist';

const App = () => {
  let songs = Songs.songs
  const [audio, setAudio] = useState()

  const [index, setIndex] = useState(0)

  const [playlists, setPlaylists] = useState([])

  const [currentUser, setCurrentUser] = useState({
    username: '',
    playlists: []
  })

  const [songInfo, setSongInfo] = useState({
    song_name: '',
    song_album: '',
    song_playlist: '',
    song_artist: '',
    song_current_time: '',
    song_duration: '',
    song_playing: false
  })

  const [volume, setVolume] = useState(100)

  useEffect(() => {
    setAudio(document.querySelector('audio'))

    fetch('http://localhost:8000/getLastPlayed')
      .then(res => res.json())
      .then(data => {
        setSongInfo(data)
        showPauseForPlayingSong(data.song_name)
      })

    fetch('http://localhost:8000/getPlaylists')
      .then(res => res.json())
      .then(data => setPlaylists(data))

    if (songInfo.song_album) {
      setIndex(Songs.songs.filter(song => song.songAlbum === songInfo.song_album).findIndex(song => song.songName === songInfo.song_name))
    } else if (songInfo.song_playlist) {
      setIndex(Songs.songs.filter(song => song.songPlaylist === songInfo.song_playlist).findIndex(song => song.songName === songInfo.song_name))
    }

  }, [])

  const showPauseForPlayingSong = (songNamePassed) => {
    const songNames = document.querySelectorAll('.songName')
    if (songNames.length === 0) return
    songNames.forEach(songName => {
      let plause = songName.parentElement.children[0].children[1]
      let songNumber = songName.parentElement.children[0].children[0]
      if (songName.innerText === songNamePassed) {
        plause.classList.add('playing')
        songNumber.classList.add('playing')
        plause.children[0].innerText = 'pause'
      }
    })
  }

  const showPlayForNotPlayingSong = (songNamePassed) => {
    const songNames = document.querySelectorAll('.songName')
    if (songNames.length === 0) return
    songNames.forEach(songName => {
      let plause = songName.parentElement.children[0].children[1]
      let songNumber = songName.parentElement.children[0].children[0]
      if (songName.innerText !== songNamePassed) {
        plause.classList.remove('playing')
        songNumber.classList.remove('playing')
        plause.children[0].innerText = 'play_arrow'
      }
    })
  }

  const timeUpdate = () => {
    document.querySelector('.seekbar').value = parseInt((audio.currentTime / audio.duration) * 100)
    document.querySelector('.currentTime').innerText = makeTimeStamp()
    setSongInfo({ ...songInfo, song_current_time: makeTimeStamp() })
  }

  const nextOrPrevFunc = (option, autoplay) => {
    option === '+' ? setIndex(option) : setIndex(option)
    let songToBePlayed = songs[option]
    audio.src = `songs/${songToBePlayed.songName} - ${songToBePlayed.songArtist}.mp3`
    setSongInfo({
      ...songInfo,
      song_name: songToBePlayed.songName,
      song_album: songToBePlayed.songAlbum,
      song_artist: songToBePlayed.songArtist,
      song_duration: songToBePlayed.duration,
      song_playing: true
    })
    audio.play()
    if (autoplay) {
      return songToBePlayed
    }
  }

  const autoPlay = () => {
    const songToBePlayed = nextOrPrevFunc(index + 1, true)
    console.log(songToBePlayed)
  }

  const makeTimeStamp = () => {
    let currentTime = audio.currentTime
    let valInSecs = String(currentTime)
    let [secs] = valInSecs.split('.')
    secs = String(secs % 60)
    let mins = String(Math.floor(Number(valInSecs) / 60))
    if (secs.length === 1) secs = '0' + secs
    if (mins.length === 1) mins = '0' + mins
    return `${mins}:${secs}`
  }

  const setLastPlayedFunc = () => {
    fetch('http://localhost:8000/setLastPlayed', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(songInfo)
    })
      .then(res => res.json())
      .then(data => {
        let saveSessionA = document.querySelector('.saveSession').children[0]
        saveSessionA.classList.add(data)
        saveSessionA.innerText = data.toUpperCase()
        setTimeout(() => {
          saveSessionA.classList.remove(data)
          saveSessionA.innerText = 'Save Session'
        }, 2000)
      })
  }

  const plauseSongGroup = () => {
    let group = document.querySelector('.Album') || document.querySelector('.Playlist')
    console.log(group)
  }

  const plauseSongMain = () => {
    let plauseMain = document.querySelector('.plause')

    if (plauseMain.innerText === 'pause_circle') {
      plauseMain.innerText = 'play_circle_filled'
      audio.pause()
    } else if (plauseMain.innerText === 'play_circle_filled') {
      audio.pause()
      if (!audio.src) {
        let time = Number((songInfo.song_current_time.slice(0, 2) * 60)) + Number(songInfo.song_current_time.slice(3))
        audio.currentTime = time
        audio.src = `songs/${songInfo.song_name} - ${songInfo.song_artist}.mp3`
      }
      plauseMain.innerText = 'pause_circle'
      audio.play()
    }
  }

  const changeVolume = (e) => {
    setVolume(e.target.value / 100)
    audio.volume = e.target.value / 100
  }

  return (
    <HashRouter>
      <div className="all">
        <audio onTimeUpdate={timeUpdate} onEnded={autoPlay}></audio>
        <div className="sides">
          <Navbar currentUser={currentUser} />
          <div className="rightSide">
            <TopBar currentUser={currentUser} setLastPlayedFunc={setLastPlayedFunc} />
            <Routes>
              <Route path='/' index element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/albums/:album' element={<Album songInfo={songInfo} setSongInfo={setSongInfo} plauseSongGroup={plauseSongGroup} audio={audio} showPauseForPlayingSong={showPauseForPlayingSong} showPlayForNotPlayingSong={showPlayForNotPlayingSong} />} />
              <Route path='/playlists/:playlist' element={<Playlist songInfo={songInfo} currentUser={currentUser} setCurrentUser={setCurrentUser} plauseSongGroup={plauseSongGroup} playlists={playlists} showPauseForPlayingSong={showPauseForPlayingSong} showPlayForNotPlayingSong={showPlayForNotPlayingSong} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/signin' element={<SignIn currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            </Routes>
          </div>
        </div>
        <BottomBar plauseSongMain={plauseSongMain} songInfo={songInfo} volume={volume} changeVolume={changeVolume} audio={audio} setSongInfo={setSongInfo} nextOrPrevFunc={nextOrPrevFunc} index={index} />
      </div>
    </HashRouter>
  )
}

export default App