const fetchPost = (func, body, showMessage, redirect, extraFunc) => {
   fetch('http://localhost:8000/' + func, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(body)
   })
      .then(res => {
         if (res.ok) {
            res.json().then(data => showMessage('no', 'yes', data))
            if (extraFunc) {
               extraFunc()
            }
            setTimeout(() => window.location.replace(redirect), 500)
         } else {
            res.json().then(data => showMessage('yes', 'no', data))
         }
      })
   .catch(err => showMessage('yes', 'no', 'Login Error'))
}

const showPassword = e => {
   let passwordField = e.target.parentElement.children[0]
   if (passwordField.type === 'password') {
      passwordField.type = 'text'
   } else {
      passwordField.type = 'password'
   }
}

const showMessage = (remove, add, msg) => {
   const message = document.querySelector('.message')
   message.classList.remove(remove)
   message.classList.add('show', add)
   message.innerText = msg
}

export default fetchPost
export { showPassword, showMessage }