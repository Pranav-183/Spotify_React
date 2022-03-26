import '../../styles/Home.css'
import { Link } from "react-router-dom";
import HomeDataObj from '../../data/Home.json'

const Home = () => {
   const messageReturner = () => {
      let mssg
      let timeHour = new Date().toString().substring(16,18)
      if (timeHour > 0 && timeHour < 12) {
         mssg = 'Good Morning'
      } else if (timeHour > 11 && timeHour < 16) {
         mssg = 'Good Afternoon'
      } else if (timeHour > 15 && timeHour < 20) {
         mssg = 'Good Evening'
      } else if (timeHour > 19 && timeHour < 25) {
         mssg = 'Good Night'
      }
      return mssg
   }

   const HomeData = HomeDataObj.HomeData

   const addBg = e => {
      e.target.style.setProperty('background-color' , 'rgb(94, 53, 0)')
   }

   const removeBg = e => {
      e.target.style.backgroundColor = null
   }

   return (
      <div className="homepage">
         <div className="welcomeHome">{ messageReturner() }</div>
         <div className="homepageGrid">
            {HomeData.map((data, index) => (
               <Link to={`/albums/${data.name}`} className="homepageEl" key={index+1} onMouseOver={addBg} onMouseOut={removeBg}>
                  <img src={`/images/${data.name}.jpg`} alt={data.name} />
                  <span>{ data.name }</span>
               </Link>
            ))}
         </div>
      </div>
   )
}

export default Home;