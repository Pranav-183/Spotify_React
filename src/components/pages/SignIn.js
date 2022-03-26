import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchPost, { showMessage, showPassword } from "../../functions/formFunctions";

const SignIn = ({ currentUser, setCurrentUser }) => {
   const navigate = useNavigate()
   useEffect(() => {
      if (currentUser) {
         navigate(-1)
      }
      document.querySelector('.usernameField').focus()
   }, [currentUser, navigate])

   const submit = e => {
      e.preventDefault()
      const { username, password } = e.target
      fetchPost(
         'login',
         {
            username: username.value,
            password: password.value
         },
         showMessage,
         '#/',
         () => setCurrentUser(username.value)
      )
   }

   return (
      <div className="logister" onSubmit={submit}>
         <form autoComplete="off" className="form">
            <h1>Sign In To Spotify</h1>
            <div className="message"></div>
            <input type="text" name="username" className="usernameField" placeholder="Enter a Username" />
            <span>
               <input type="password" name="password" className="passwordField" placeholder="Enter a Password" />
               <input type="checkbox" className="showPassword" onClick={showPassword} />
            </span>
            <h5>Click Here <i className="material-icons">arrow_downward</i></h5>
            <button className="submit">Login</button>
         </form>
      </div>
   )
}
 
export default SignIn;