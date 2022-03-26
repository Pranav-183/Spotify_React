import Songs from '../data/Songs.json'

let songs = Songs.songs
let audioElement = new Audio()

const SONG_INFO = {
   songName: 'Night Changes',
   songAlbum: 'Four',
   songArtist: 'One Direction',
   songDuration: '04:00',
   songCurrentTime: '2:56',
   songPlaying: false,
   songVolume: 100
}

const plauseSong = (e) => {
   let plauseIcon, songName, plauseDiv, songNumber
   if (e.target.classList.contains('material-icons')) {
      plauseIcon = e.target
      songName = e.target.parentElement.parentElement.parentElement.children[1].innerText
      plauseDiv = e.target.parentElement
      songNumber = e.target.parentElement.parentElement.children[0]
   } else if (e.target.classList.contains('plauseIcon')) {
      plauseIcon = e.target.children[0]
      songName = e.target.parentElement.parentElement.children[1].innerText
      plauseDiv = e.target
      songNumber = e.target.parentElement.children[0]
   }
   
   if (e.target.classList.contains('playing')) {
      plauseIcon.innerText = 'play_arrow'
      plauseDiv.classList.remove('playing')
      songNumber.classList.remove('playing')
      audioElement.pause()
   } else {
      let songToBePlayed = songs.find(song => song.songName === songName)
      audioElement.src = `songs/${songToBePlayed.songName} - ${songToBePlayed.songArtist}.mp3`
      audioElement.play()
      plauseIcon.innerText = 'pause'
      plauseDiv.classList.add('playing')
      songNumber.classList.add('playing')
      console.log(audioElement)
   }
}

export default plauseSong
export { SONG_INFO }