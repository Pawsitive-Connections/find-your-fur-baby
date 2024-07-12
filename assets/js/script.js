
$(document).ready(() => {
    const questions = $('.question');
    let answers = {};

    const showQuestion = (currentQuestion) => {
        questions.each(function (index) {
            $(this).toggleClass('hide', currentQuestion !== index);
        });
    }

    questions.each(function (index) {
        const nextBtn = $(this).find(`.next`);
        const prevBtn = $(this).find(`.prev`)

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

    $('.quizBtn').click(function() {
        const question = $(this).data('question');
        const answer = $(this).data('answer');
        answers[question] = answer;
        console.log(answers);
    });

    $('#submit').click(function() {
        getBreeds(answers)
    })

    
    
});

function getBreeds(answers) {
    const apiKey = `nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC`;
    let dogUrl = `https://api.api-ninjas.com/v1/dogs?`;

    for ( const property in answers) {
        dogUrl += property + "=" + answers[property] + "&";
    }

    $.ajax({
        method: 'GET',
        url: dogUrl,
        headers: { 'X-Api-Key': apiKey},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });









    // fetch(url, {
    //     method: `Get`,
    //     headers: {
    //         'X-Api-Key': apiKey,
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Response not found.')
    //     } 
    //     console.log(response.json);
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    //     // const breeds = findBreeds(data, answers);
    //     // console.log(breeds);
    // })
    // .catch(error => {
    //     console.error(error);
    // }); 
};


// function findBreeds(breeds, answers) {
//     return breeds.filter(breed => {
//         return (
//             breed.good_with_children === answers.q1 &&
//             breed.good_with_other_dogs === answers.q2 &&
//             breed.shedding === answers.q3 &&
//             breed.grooming === answers.q4 &&
//             breed.drooling === answers.q5 &&
//             breed.coat_length === answers.q6 &&
//             breed.good_with_strangers === answers.q7 &&
//             breed.playfulness === answers.q8 &&
//             breed.protectiveness === answers.q9 &&
//             breed.trainability === answers.q10 &&
//             breed.energy === answers.q11 &&
//             breed.barking === answers.q12
//         );
//     });
// }