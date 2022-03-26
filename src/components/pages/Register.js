import fetchPost, { showMessage, showPassword } from '../../functions/formFunctions'
import '../../styles/Form.css'

const Register = () => {
   const submit = e => {
      e.preventDefault()
      const { name, username, password } = e.target
      fetchPost('register', {
         name: name.value,
         username: username.value,
         password: password.value
      }, showMessage, '/#/login')
   }

   return (
      <div className="logister" onSubmit={submit}>
         <form autoComplete="off" className='form'>
            <h1>Register to Spotify</h1>
            <div className="message"></div>
            <input type="text" name="name" className="nameField" placeholder="Enter your Name" />
            <input type="text" name="username" className="usernameField" placeholder="Enter a Username" />
            <span>
               <input type="password" name="password" className="passwordField" placeholder="Enter a Password" />
               <input type="checkbox" className="showPassword" onClick={showPassword} />
            </span>
            <h5>Click Here <i className="material-icons">arrow_downward</i></h5>
            <button className="submit">Register</button>
         </form>
      </div>
   )
}
 
export default Register;