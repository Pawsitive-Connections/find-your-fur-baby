const apiKey = 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC'
const url = `https://api.api-ninjas.com/v1/dogs?name=beagle&X-Api-Key=${apiKey}`

fetch(url)
.then(response => response.json())
.then(data => {
console.log(data)
})
.catch(error => {
console.error('error fetching data:', error)
})

$(document).ready(() => {
    const questions = $('.question');

    const showQuestion = (currentQuestion) => {
        questions.each(function (index) {
            console.log(index)
            $(this).toggleClass('hide', currentQuestion !== index);
        });
    }

    questions.each(function (index) {
        const nextBtn = $(this).find(`#q${index + 1}-next`);
        const prevBtn = $(this).find(`#q${index + 1}-prev`)

        nextBtn.on('click', () => {
            if (index < questions.length - 1) {
                showQuestion(index + 1);
            }
        })
        
        prevBtn.on('click', () => {
            if (index > 0) {
                showQuestion(index - 1);
            }
        });
    });

    showQuestion(0);
});

