import '../../styles/SongItems.css'

const SongItems = ({ songs, plauseSongItem }) => {
   return (
      <div className='songItems'>
         {songs.map(song => (
            <div className="songItem" key={song.id} id={song.id}>
               <div className="songNumOrIcon">
                  <div className="songNumber">{song.id}</div>
                  <div className="plauseIcon" onClick={plauseSongItem}><i className="material-icons">play_arrow</i></div>
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