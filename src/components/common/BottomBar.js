import '../../styles/BottomBar.css'
import { SONG_INFO } from '../../functions/songFunctions';
import { Link } from 'react-router-dom';

const BottomBar = ({ plauseSongMain }) => {
   const { songAlbum, songName, songArtist, songDuration, songVolume, songCurrentTime } = SONG_INFO
   return (
      <div className="bottomBar">
         <div className="songInfo">
            <img src={`/images/${songAlbum}.jpg`} alt="songInfoImg" className="songInfoImg" />
            <div className="songInfoText">
               <span className="songInfoSongName">{ songName }</span>
               <span className="songInfoSongArtist">{ songArtist }</span>
            </div>
         </div>

         <div className="controls">
            <div className="icons">
               <i className="material-icons shuffle">shuffle</i>
               <i className="material-icons previous">skip_previous</i>
               <i className="material-icons plause" onClick={plauseSongMain}>play_circle_filled</i>
               <i className="material-icons next">skip_next</i>
               <i className="material-icons repeat">repeat</i>
            </div>
            <div className="seekbarDiv">
               <span className="currentTime">{ songCurrentTime }</span>
               <input type="range" name='seekbar' className='seekbar' min={0} max={0} defaultValue={0} />
               <span className="totalTime">{ songDuration }</span>
            </div>
         </div>

         <div className="otherControls">
            <Link to="/queue"><i className='material-icons queue'>queue_music</i></Link>
            <i className="material-icons volume">volume_up</i>
            <input type="range" className='volumeBar' name='volumeBar' min={0} max={100} defaultValue={songVolume} />
         </div>
      </div>
   )
}
 
export default BottomBar