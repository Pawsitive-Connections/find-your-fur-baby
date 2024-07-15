const dog = document.getElementsByClassName('dog');
// const allDogs = document.getElementById('anywhere')
console.log(dog)

anywhere.addEventListener('clicked', function (event) {
    event.preventDefault()
    console.log('clicked')
})

// for (const dog of [HTMLCollection]) {
//     console.log(dog)

// dog.addEventListenor('click', function (event) {
//     event.preventDefault()
//     console.log('clicked')
// })

// }