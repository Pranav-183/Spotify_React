import 'material-icons/iconfont/material-icons.css'
import '../../styles/CustomScrollbar.css'
import '../../styles/Navbar.css'
import { Link } from "react-router-dom"

const Navbar = ({ currentUser }) => {
   let albumsExpanded = false
   let playlistsExpanded = false

   function expandAlbums(e) {
      let albumList = e.target.parentElement.parentElement.lastElementChild
      let albums = albumList.parentElement
      if (albumsExpanded === false) {
         albumsExpanded = true
         albums.style.height = `${(albumList.childElementCount * 28) + 40}px`
         e.target.innerText = 'expand_less'
         setTimeout(() => {
            albumList.style.display = 'block'
         }, 100)
      } else if (albumsExpanded === true) {
         albumsExpanded = false
         albums.style.height = '40px'
         e.target.innerText = 'expand_more'
         setTimeout(() => {
            albumList.style.display = 'none'
         }, 50)
      }
   }

   function expandPlaylists(e) {
      let playlistList = e.target.parentElement.parentElement.parentElement.lastElementChild
      let playlists = playlistList.parentElement
      if (playlistsExpanded === false) {
         playlistsExpanded = true
         playlists.style.height = `${(playlistList.childElementCount * 28) + 40}px`
         e.target.innerText = 'expand_less'
         setTimeout(() => {
            playlistList.style.display = 'block'
         }, 100);
      } else if (playlistsExpanded === true) {
         playlistsExpanded = false
         playlists.style.height = '40px'
         e.target.innerText = 'expand_more'
         setTimeout(() => {
            playlistList.style.display = 'none'
         }, 50);
      }
   }

   return (
      <nav className="navbar customScrollbar">
         <div className="spotify">
            <img src={"/images/Spotify Logo.png"} alt="Spotify Logo" className="spotify-logo" />
            <span className="spotifyText">Spotify</span>
         </div>
         <ul className="homeSearch">
            <li className="homeSearchElement"><Link to=""><i className="material-icons">home</i><span className="homeSearchIconText">Home</span></Link></li>
            <li className="homeSearchElement"><Link to="search"><i className="material-icons">search</i><span className="homeSearchIconText">Search</span></Link></li>
            <li className="homeSearchElement"><Link to="library"><i className="material-icons">library_music</i><span className="homeSearchIconText">Library</span></Link></li>
         </ul>
         <hr className="navbarHR" />
         <div className="albums">
            <span className="albumDrop"><h2><Link to="/albums">ALBUMS</Link></h2><i className="material-icons" id="expandAlbumsIcon" onClick={expandAlbums}>expand_more</i></span>
            <ul className="albumList">
               <li className="album"><Link to="albums/Four">Four</Link></li>
               <li className="album"><Link to="albums/Made%20In%20The%20AM">Made In The A.M.</Link></li>
               <li className="album"><Link to="albums/Midnight%20Memories">Midnight Memories</Link></li>
               <li className="album"><Link to="albums/Take%20Me%20Home">Take Me Home</Link></li>
               <li className="album"><Link to="albums/Up%20All%20Night">Up All Night</Link></li>
            </ul>
         </div>
         <hr className="navbarHR" />
         <div className="playlists">
            <span className="playlistDrop"><h2><Link to="playlists">PLAYLISTS</Link><i className="material-icons" id="expandPlaylistsIcon" onClick={expandPlaylists}>expand_more</i></h2></span>
            <ul className="playlistList">
               {
                  currentUser.playlists[0]
                     ? currentUser.playlists.map(playlist => (
                        <li className="playlist" key={playlist}><Link to={`playlists/${playlist}`}>{playlist}</Link></li>
                     ))
                     : <li>SignIn to view your playlists</li>
               }
            </ul>
         </div>
         <hr className="navbarHR" />
      </nav>
   );
}

export default Navbar;