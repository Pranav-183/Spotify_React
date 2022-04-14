import '../../styles/BottomBar.css'
import { Link } from 'react-router-dom';

const BottomBar = ({ plauseSongMain, songInfo, volume, changeVolume, audio, nextOrPrevFunc, index }) => {
   const { song_album, song_playlist, song_name, song_artist, song_duration, song_current_time, song_playing } = songInfo

   const seekFunc = e => {
      audio.currentTime = e.target.value * audio.duration / 100
   }

   return (
      <div className="bottomBar">
         <div className="songInfo">
            <img src={`/images/${song_album ? song_album : song_playlist}.jpg`} alt="songInfoImg" className="songInfoImg" />
            <div className="songInfoText">
               <span className="songInfoSongName">{song_name}</span>
               <span className="songInfoSongArtist">{song_artist}</span>
            </div>
         </div>

         <div className="controls">
            <div className="icons">
               <i className="material-icons shuffle">shuffle</i>
               <i className="material-icons previous" onClick={() => nextOrPrevFunc(index - 1, false)}>skip_previous</i>
               <i className="material-icons plause" onClick={plauseSongMain}>
                  {song_playing ? 'pause_circle' : 'play_circle_filled'}
               </i>x
               <i className="material-icons next" onClick={() => nextOrPrevFunc(index + 1, false)}>skip_next</i>
               <i className="material-icons repeat">repeat</i>
            </div>
            <div className="seekbarDiv">
               <span className="currentTime">{song_current_time}</span>
               <input type="range" name='seekbar' className='seekbar' min={0} max={100} defaultValue={0} onChange={seekFunc} />
               <span className="totalTime">{song_duration}</span>
            </div>
         </div>

         <div className="otherControls">
            <Link to="/queue"><i className='material-icons queue'>queue_music</i></Link>
            <i className="material-icons volume">volume_up</i>
            <input type="range" className='volumeBar' name='volumeBar' min={0} max={100} defaultValue={volume} onMouseMove={changeVolume} onChange={changeVolume} />
         </div>
      </div>
   )
}

export default BottomBar