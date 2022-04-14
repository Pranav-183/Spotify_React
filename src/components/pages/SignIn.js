import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchPost, { showMessage, showPassword } from "../../functions/formFunctions";

const SignIn = ({ currentUser, setCurrentUser }) => {
   const navigate = useNavigate()
   useEffect(() => {
      if (currentUser.username) {
         navigate(-1)
      }
      document.querySelector('.usernameField').focus()
   }, [currentUser, navigate])

   const submit = e => {
      e.preventDefault()
      const { username, password } = e.target
      fetch('http://localhost:8000/login', {
         method: 'POST',
         headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
         body: JSON.stringify({
            username: username.value,
            password: password.value
         })
      })
         .then(res => {
            if (res.ok) {
               res.json()
                  .then(data => {
                     showMessage('no', 'yes', data.message)
                     setCurrentUser({
                        username: data.user[0].username,
                        playlists: data.user[0].playlists
                     })
                  })
               setTimeout(() => window.location.replace('#/'), 500)
            } else {
               res.json().then(data => showMessage('yes', 'no', data))
            }
         })
         .catch(err => showMessage('yes', 'no', 'Login Error'))
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