import '../../styles/Playbum.css'
import '../../styles/CustomScrollbar.css';
import { useParams } from "react-router-dom";
import topBarFunction from '../../functions/ScrollFunctions';
import Songs from '../../data/Songs.json'
import { useEffect } from 'react';

const Playlist = ({ songInfo, currentUser, plauseSongGroup, playlists, showPauseForPlayingSong, showPlayForNotPlayingSong }) => {
   const playlistParam = useParams().playlist
   let editMode = false
   let totalDuration = 0
   const playlist = playlists.find(playlist => playlist.playlist_name === playlistParam)
   if (!playlist) {
      setTimeout(() => window.location.replace('#/'), 100)
   }

   let location = window.location.href
   useEffect(() => {
      showPauseForPlayingSong(songInfo.song_name)
      showPlayForNotPlayingSong(songInfo.song_name)
   }, [location])

   const playlistSongs = []

   if (currentUser.playlists[0]) {
      editMode = true
   }

   const changeToMinsAndSecs = (val) => {
      let valInSecs = String(val)
      let [secs] = valInSecs.split('.')
      secs = String(secs % 60)
      let mins = String(Math.floor(Number(valInSecs) / 60))
      if (secs.length === 1) secs = '0' + secs
      if (mins.length === 1) mins = '0' + mins
      return `${mins}:${secs}`
   }

   playlist?.playlist_songs.forEach(playlistSong => {
      Songs.songs.forEach(song => {
         if (playlistSong.song_name === song.songName) {
            playlistSongs.push(song)
         }
      })
   })

   playlistSongs.forEach(song => {
      totalDuration += (Number(song.duration.slice(0, 2)) * 60 + Number(song.duration.slice(3, 5)))
   })
   totalDuration = changeToMinsAndSecs(totalDuration)
   return (
      <div className="Playlist customScrollbar" onScroll={topBarFunction}>
         <div className="topRight">
            <img className="playlistImg" src={`/images/${playlistParam}.jpg`} alt="playlistImg" />
            <div className="playlistInfo">
               <span className="firstLine">PLAYLIST</span>
               <span className="secondLine">{playlistParam}</span>
               <span className="thirdLine">
                  <h3 className='artist'>
                     <a href={'#/users/' + playlist?.playlist_owner} target="_blank" rel='noreferrer'>{playlist?.playlist_owner}</a>
                  </h3>
                  <h5>
                     &nbsp;· {playlist?.playlist_songs.length} songs · {totalDuration.slice(0, 2)} min {totalDuration.slice(3, 5)} sec
                  </h5>
               </span>
            </div>
         </div>
         <div className="middleRight">
            <span className="material-icons playAllSongs" onClick={plauseSongGroup}>play_circle</span>
            <span className="material-icons likePlaylist">favorite_border</span>
         </div>
         <div className="bottomRight">
            <div className="songHeadings">
               <div className="songHeadingsHash"><span>#</span></div>
               <div className="songHeadingsTitle"><span>TITLE</span></div>
               <div className="songHeadingsDuration"><span className='material-icons'>schedule</span></div>
            </div>
            <hr />
            <div className="songItems">
               {playlist?.playlist_songs.map((song, i) => (
                  <div className="songItem" key={i + 1} id={i + 1}>
                     <div className="songNumOrIcon">
                        <div className="songNumber">{i + 1}</div>
                        <div className="plauseIcon" id={i + 1}><i className='material-icons' id={i + 1}>play_arrow</i></div>
                     </div>
                     <div className="songName">{song.song_name}</div>
                     <div className="favoriteIcon"><i className="material-icons">favorite_border</i></div>
                     <div className="songDuration">{playlistSongs[i].duration}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Playlist;