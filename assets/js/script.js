<<<<<<< HEAD
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
=======
const button = document.getElementsByClassName('quizBtn')
console.log(button)

quizBtnArray = [];

quizBtnArray.push(button)
console.log(quizBtnArray)

for (const btn of quizBtnArray[0]) {
   btn.addEventListener('click', function (event) {
        event.preventDefault();
        if (btn) {
        btn.setAttribute('style', 'background-color: #bab0a4;')
        }
        
    })
}
>>>>>>> 72d0fd4be5a179dba687e7ab2f812bebaf39ce5a
