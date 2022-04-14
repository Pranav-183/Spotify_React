import '../../styles/SongItems.css'
import Songs from '../../data/Songs.json'

const SongItems = ({ songs, audio, setSongInfo, songInfo }) => {

   let songsArr = Songs.songs

   const playFunc = (songName, plause, songNumber, plauseMain, allPlause, id) => {
      let songToBePlayed = songsArr.find(song => song.songName === songName)
      let linkAsUrl = `http://localhost:3000/songs/${songToBePlayed.songName}%20-%20${songToBePlayed.songArtist}.mp3`.replace(/ /g, "%20")
      let currentTime = null
      if (audio.currentTime !== 0 && audio.src === linkAsUrl) {
         currentTime = audio.currentTime
      }
      audio.src = `songs/${songToBePlayed.songName} - ${songToBePlayed.songArtist}.mp3`
      audio.currentTime = currentTime || 0
      audio.load()
      audio.play()
      plause.classList.add('playing')
      plause.children[0].innerText = 'pause'
      songNumber.classList.add('playing')
      plauseMain.innerText = 'pause_circle'
      allPlause.forEach((plause, i) => {
         if (plause.id !== id) {
            plause.children[0].innerText = 'play_arrow'
            plause.classList.remove('playing')
            document.querySelectorAll('.songNumber')[i].classList.remove('playing')
         }
      })
      setSongInfo({
         ...songInfo,
         song_name: songToBePlayed.songName,
         song_artist: songToBePlayed.songArtist,
         song_duration: songToBePlayed.duration
      })
   }

   const pauseFunc = (plause, songNumber, plauseMain) => {
      audio.pause()
      plause.classList.remove('playing')
      plause.children[0].innerText = 'play_arrow'
      songNumber.classList.remove('playing')
      plauseMain.innerText = 'play_circle_filled'
   }

   const plauseFunc = e => {
      const id = e.target.id
      let plause = document.querySelectorAll('.plauseIcon')[id]
      let plauseMain = document.querySelector('.plause')
      let songNumber = document.querySelectorAll('.songNumber')[id]
      let songName = document.querySelectorAll('.songName')[id].innerText
      let allPlause = document.querySelectorAll('.plauseIcon')
      if (!plause.classList.contains('playing')) playFunc(songName, plause, songNumber, plauseMain, allPlause, id)
      else pauseFunc(plause, songNumber, plauseMain)
   }

   return (
      <div className='songItems'>
         {songs.map(song => (
            <div className="songItem" key={song.id} id={song.id}>
               <div className="songNumOrIcon">
                  <div className="songNumber">{song.id}</div>
                  <div className="plauseIcon" onClick={plauseFunc} id={song.id - 1}><i className="material-icons" id={song.id - 1}>play_arrow</i></div>
               </div>
               <div className="songName">{song.songName}</div>
               <div className="favoriteIcon"><i className="material-icons">favorite_border</i></div>
               <div className="songDuration">{song.duration}</div>
            </div>
         ))}
      </div>
   )
}
 
export default SongItems