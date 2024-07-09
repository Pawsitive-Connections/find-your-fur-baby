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
