
$(document).ready(() => {
    const questions = $('.question');
    let answers = {};

    /* The showQuestion iterates through each question div and toggles hide on
    all but the current question */

    const showQuestion = (currentQuestion) => {
        questions.each(function (index) {
            $(this).toggleClass('hide', currentQuestion !== index);
        });
    }

    /* This function grabs the next and previous buttons, and on the click runs the
    the showQuestion function by incrementing the index by 1 or - 1 depending on the
    button pressed. */
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

        /* Takes the questions and answers and puts then in the answer object when the 
        answer buttons are selected.  */

    $('.quizBtn').click(function() {
        const question = $(this).data('question');
        const answer = $(this).data('answer');
        answers[question] = answer;
    });

    $('#submit').click(function() {
        getBreeds(answers)
    })

    /* Retrieves fact from API and adds it to the fun-fact container */
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

    /* Retrieves image from API and adds it to the img tag */
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

    /* Fetches facts and image when page loads. */
    fetchFunFact();
    fetchDogImage();

    /* Fetches a new fact and image everytime one of the next or previous buttons are clicked.*/
    $('.fetch-fact-and-image').click(function() {
        fetchFunFact();
        fetchDogImage();
    })
});

/* The createQueryUrl function creates a url that will be used to retrieve breeds in the getBreed function.
There is a coniditional to ensure that shedding is the first parameter added and the last removed since it 
is one of the required parameters for the API to work. This way, unrequired parameters are removed first 
ensuring the API will not get a bad response. The function returns the url with the query string and the final
& removed.*/

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

/* the getBreed function retrieves breends from the API according to the contents of the answers object.
The format of the ajax request was taken from the https://api-ninjas.com/api/dogs website with some 
modifications. */

function getBreeds(answers) {
    let breeds =[]
    let queries = Object.keys(answers);
    let dogUrl = createQueryUrl(answers);
    const apiKey = `nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC`;

    const getBreedPage = (url) => {
        $.ajax({
            method: 'GET',
            url: url,
            headers: { 'X-Api-Key': apiKey},
            contentType: 'application/json',
            success: function(results) {
                breeds = breeds.concat(results);

                /* Checks to see if there are less then three matches, and if there are less than three,
                the last query is removed using the removeQueryParameter function and the getBreed function
                is run again. If there are more than three, the results are shuffled for more diverse matches
                and the first three of the array are stored in breeds. The breeds are then set to local storage.*/

                if (breeds.length < 3 && queries.length > 0) {
                    const lastQuery = queries.pop();

                    dogUrl = removeQueryParameter(dogUrl, lastQuery);

                    getBreedPage(dogUrl);               
                } else {
                    breeds = shuffleArray(breeds).slice(0,3);
            
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

/* Splits url into an array using the query ? as the partition, then further seperates each
query string using &. The for loops then checks each parameter to see if it is the parameter to be
removed, if not, it pushes the string into the queryString array. The URL is then reformed and returned
with the specified parameter removed.  */

function removeQueryParameter(url, parameterToRemove) {
    const urlSections = url.split('?');
    const baseUrl = urlSections[0];
    const queries = urlSections[1];
    const querySections = queries.split('&');
    const queryStrings = []

    for (let i = 0; i < querySections.length; i++) {
        const [parameter, value] = querySections[i].split('=')

        if (parameter !== parameterToRemove) {
        queryStrings.push(`${parameter}=${value}`);
        }
    }

    const newQuery = queryStrings.join('&');

    return `${baseUrl}?${newQuery}`
}

/* for each iteration of the for loop, the index variable randomIndex is 
randomized and swapped with the iterative currentIndex. This ensures the breed matches
are more diverse.  */

function shuffleArray(array) {
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

