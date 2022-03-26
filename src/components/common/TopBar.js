import '../../styles/TopBar.css'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const TopBar = ({ currentUser }) => {
   const [time, setTime] = useState(new Date().toString().substring(16, 24))
   setTimeout(() => {
      setTime(new Date().toString().substring(16, 24))
   }, 1000)
   const navigate = useNavigate()

   const accounts = () => {
      if (currentUser) {
         return <>
            {currentUser}
         </>
      } else {
         return <>
            <Link to={'/register'}>Register</Link>
            <Link to={'/signin'}>Sign In</Link>
         </>
      }
   }

   return (
      <div className="topBar">
         <div className="navigates">
            <span className="navigate material-icons" onClick={() => navigate(-1)}>arrow_back_ios</span>
            <span className="navigate material-icons" onClick={() => navigate(1)}>arrow_forward_ios</span>
         </div>
         <div className="time">{time}</div>
         <div className="accounts">
            {accounts()}
         </div>
      </div>
   )
}

export default TopBar