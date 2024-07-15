const dog = document.getElementsByClassName('dog');


// dog.addEventListener('mouseover', function () {
   
// })

dog.onmouseover = (event) => {
    const name = document.getElementsByClassName('name')
    name.setAttribute('style', 'color: purple;')
}
dog.addEventListener('click', function (event) {
    event.preventDefault()
})