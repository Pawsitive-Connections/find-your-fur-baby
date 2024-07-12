
$(document).ready(() => {
    const questions = $('.question');
    let answers = {};

    const showQuestion = (currentQuestion) => {
        console.log(`Current question ${currentQuestion}`)
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

const goldenRetriever = {q1: 5, q2:5, q3: 4, q4: 2, q5:2, q6:1, q7:5, q8:4, q9: 3, q10:5, q11: 3, q12: 1}
const url = `https://api.api-ninjas.com/v1/dogs?good_with_children=${answers.q1}&good_with_other_dogs=${answers.q2}&shedding=${answers.q3}&grooming=${answers.q4}&drooling=${answers.q5}&coat_length=${answers.q6}&good_with_strangers=${answers.q7}&playfulness=${answers.q8}&protectiveness=${answers.q9}&trainability=${answers.q10}&energy=${answers.q11}&barking=${answers.q12}`;


// const sample = {
//     good_with_children: 5,
//     good_with_other_dogs: 4,
//     max_weight: 20
// }

// let dogUrl = "https://api.api-ninjas.com/v1/dogs?";
// for( const property in sample){
//     dogUrl += property + "=" + sample[property] + "&"
// }


function getBreeds(answers) {
    const apiKey = `nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC`;
    const url = `https://api.api-ninjas.com/v1/dogs?max_height=500`
    console.log(apiKey);
    console.log(url);

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dogs?max_height=500&&offset=5',
        headers: { 'X-Api-Key': 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC'},
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


function findBreeds(breeds, answers) {
    return breeds.filter(breed => {
        return (
            breed.good_with_children === answers.q1 &&
            breed.good_with_other_dogs === answers.q2 &&
            breed.shedding === answers.q3 &&
            breed.grooming === answers.q4 &&
            breed.drooling === answers.q5 &&
            breed.coat_length === answers.q6 &&
            breed.good_with_strangers === answers.q7 &&
            breed.playfulness === answers.q8 &&
            breed.protectiveness === answers.q9 &&
            breed.trainability === answers.q10 &&
            breed.energy === answers.q11 &&
            breed.barking === answers.q12
        );
    });
}