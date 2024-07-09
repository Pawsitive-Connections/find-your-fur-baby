const button = $('.quizBtn')
const header = $('h1')

console.log(button)


// console.log(array)


button.attr('style', 'background-color: #dbddec;')


for (const btn of button) {
    console.log(btn)

    btn.addEventListener('click', function () {

        btn.setAttribute('style', 'background-color: #bab0a4;')

       for (let i = 0; i < button.length; i++) {
        if (button[i] !== btn) {
            button[i].setAttribute('style', 'background-color: #dbddec;')
        }
       }
    })

}
    
    


