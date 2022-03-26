import '../../styles/Search.css'
import '../../styles/CustomScrollbar.css'
import Albums from '../../data/Albums.json'
import { useState } from 'react'
import SongItems from '../parts/SongItems'

const Search = () => {
   const [searchResult, setSearchResult] = useState([])

   const allSongs = []
   Albums.albums.forEach(album => {
      album.songs.forEach((song, i) => {
         allSongs.push(song)
      })
   })

   const search = (e) => {
      let songs = []
      if (!e.target.value) {
         setSearchResult(songs)
         return
      }
      allSongs.forEach(song => {
         if (song.songName.toLowerCase().includes(e.target.value.toLowerCase())) {
            songs.push(song)
         }
      })
      songs.forEach((song, i) => {
         song.id = i+1
      })
      setSearchResult(songs)
   }

   document.addEventListener('keyup', e => {
      if (e.key === '/') {
         document.querySelector('.searchBar').focus()
      }
   })

   return (
      <div className="Search">
         <div className="searchBarDiv">
            <input type="text" className='searchBar' placeholder='Search for Songs Only' onChange={search} />
         </div>
         <div className="searchOutput customScrollbar">
            <SongItems songs={searchResult} />
         </div>
      </div>
   )
}
 
export default Search