const button = $('.quizBtn')
const header = $('h1')
const submit = $('#submit')

// console.log(button)


// console.log(array)


button.attr('style', 'background-color: #dbddec;')


for (const btn of button) {
    // console.log(btn)

    btn.onmouseover = () => {
        btn.setAttribute('style', 'border: 4px solid #bab0a4;')
    }

    btn.addEventListener('click', function () {

        btn.setAttribute('style', 'background-color: #bab0a4;')

       for (let i = 0; i < button.length; i++) {
        if (button[i] !== btn) {
            button[i].setAttribute('style', 'background-color: #dbddec;')
           
        }
       }
    })

}


submit.on('click', function(event) { 
    // event.preventDefault();
    // window.location.replace('./matches.html');
    submit.attr('style', 'background-color: #ecd3d3;')
})




    
    


