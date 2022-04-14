import '../../styles/Playbum.css';
import '../../styles/CustomScrollbar.css';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Albums from '../../data/Albums.json';
import Songs from '../../data/Songs.json'
import topBarFunction from '../../functions/ScrollFunctions';
import SongItems from '../parts/SongItems';

const Album = ({ songInfo, setSongInfo, plauseSongGroup, audio, showPauseForPlayingSong, showPlayForNotPlayingSong }) => {
   const param = useParams().album
   const album = Albums.albums.find(album => album.albumName === param)
   const songs = Songs.songs.filter(song => song.songAlbum === param)
   songs.forEach((song, i) => {
      song.id = i+1
   })
   useEffect(() => {
      document.querySelector('.topRight').style.setProperty('--bg1', album.bg1)
   }, [])
   let location = window.location.href
   
   useEffect(() => {
      document.querySelector('.topRight').style.setProperty('--bg1', album.bg1)
      showPauseForPlayingSong(songInfo.song_name)
      showPlayForNotPlayingSong(songInfo.song_name)
   }, [location])

   return (
      <div className="Album customScrollbar" onScroll={topBarFunction}>
         <div className="topRight">
            <img className="albumImg" src={`/images/${param}.jpg`} alt="albumImage" />
            <div className="albumInfo">
               <span className="firstLine">ALBUM</span>
               <span className="secondLine">{param}</span>
               <span className="thirdLine">
                  <h3 className='artist'>
                     <a href={album.artistLink} target="_blank" rel='noreferrer'>{ album.artistName }</a>
                  </h3>
                  <h5>
                     &nbsp;· { album.numberOfSongs } songs · { album.totalDuration.slice(0, 2) } min { album.totalDuration.slice(3, 5) } sec
                  </h5>
               </span>
            </div>
         </div>
         <div className="middleRight">
            <span className="material-icons playAllSongs" onClick={plauseSongGroup}>play_circle</span>
            <span className="material-icons likeAlbum">favorite_border</span>
         </div>
         <div className="bottomRight">
            <div className="songHeadings">
               <div className="songHeadingsHash"><span>#</span></div>
               <div className="songHeadingsTitle"><span>TITLE</span></div>
               <div className="songHeadingsDuration"><span className='material-icons'>schedule</span></div>
            </div>
            <hr />
            <SongItems songs={songs} audio={audio} setSongInfo={setSongInfo} songInfo={songInfo} />
         </div>
      </div>
   )
}
 
export default Album;