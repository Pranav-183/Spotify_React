const topBarFunction = (e) => {
   let topBar = document.querySelector('.topBar')
   let rightEl = e.target
   let scrollTop = Math.floor(rightEl.scrollTop)
   topBar.style.setProperty('--transparency', scrollTop / 100)
   if (scrollTop > 90) {
      topBar.style.setProperty('--transparency', 1)
   }
}

export default topBarFunction