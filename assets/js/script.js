
$(document).ready(() => {
    const questions = $('.question');
    const apiKey = `nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC`;
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

    const fetchFunFact = () => {
        $.ajax({
            url: 'https://dogapi.dog/api/v2/facts',
            method: 'GET',
            success: function(response) {
                const fact = response.data[0].attributes.body;
                $('.fun-fact').text(fact);
            },
            error: function() {
                $('.fun-fact').text('Could not load fun fact.');
            }
        });
    }

    function fetchDogImage() {
        $.ajax({
            url: 'https://dog.ceo/api/breeds/image/random',
            method: 'GET',
            success: function(response) {
                const imageUrl = response.message;
                $('img').attr('src', imageUrl);
            },
            error: function() {
                $('img').attr('src', './assets/test-images/coco.jpg');
            }
        });
    }

    fetchFunFact();
    fetchDogImage();

    $('#q1-next, #q2-next, #q2-prev, #q3-next, #q3-prev, #q4-next, #q4-prev, #q5-next, #q5-prev, #q6-next, #q6-prev').click(function() {
        fetchFunFact();
        fetchDogImage();
    })
});

function createQueryUrl(answers) {
    let dogUrl = `https://api.api-ninjas.com/v1/dogs?`;
    if (answers.shedding) {
        dogUrl += `shedding=${answers.shedding}&`;
    }
    for ( const property in answers) {
        if (property !== "shedding") {
        dogUrl += `${property}=${answers[property]}&`;
        }
    }
    return dogUrl.slice(0, -1);
}

function getBreeds(answers) {
    let breeds =[]
    let queries = Object.keys(answers);
    let dogUrl = createQueryUrl(answers);

    const getBreedPage = (url) => {
        $.ajax({
            method: 'GET',
            url: url,
            headers: { 'X-Api-Key': apiKey},
            contentType: 'application/json',
            success: function(results) {
                breeds = breeds.concat(results);
                if (breeds.length < 3 && queries.length > 0) {
                    const lastQuery = queries.pop();
                    dogUrl = removeQueryParameter(dogUrl, lastQuery);
                    getBreedPage(dogUrl);               
                } else {
                    breeds = shuffleArray(breeds).slice(0,3);
                    console.log(breeds);
                    localStorage.setItem('selectedBreeds', JSON.stringify(breeds.map(breed => breed.name)));
                    window.location.href = 'matches.html';
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    };
    getBreedPage(dogUrl);
};

function removeQueryParameter(url, parameter) {
    const urlSections = url.split('?');
    const baseUrl = urlSections[0];
    const queryParams = new URLSearchParams(urlSections[1]);

    queryParams.delete(parameter);

    const newQueryString = queryParams.toString();
    return `${baseUrl}?${newQueryString}`
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

