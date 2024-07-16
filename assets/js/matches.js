
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC';
    const placeholderImageUrl = 'https://via.placeholder.com/400';

    
    function fetchDataAndAppend(breedName, apiKey, imageContainerId) {
        const url = `https://api.api-ninjas.com/v1/dogs?name=${breedName}&X-Api-Key=${apiKey}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data && data.length >= 1 && data[0].image_link && data[0].image_link.length > 0) {
                const imageContainer = document.getElementById(imageContainerId);
                const imgElement = document.createElement('img');
                imgElement.src = data[0].image_link;
                imageContainer.appendChild(imgElement);
                imgElement.classList.add(`appended-${imageContainerId}`);
                
                const container = document.createElement('divDescription')
                container.id = 'description123'
                imageContainer.appendChild(container)
                
                const nameDiv = document.createElement('div');
                nameDiv.textContent = `Breed: ${data[0].name}`;
                nameDiv.classList.add('breedSelection');
                container.appendChild(nameDiv);
                
                
                const sentences = {
                    good_with_children: {
                        1: 'This breed is not good with children.',
                        2: 'This breed is decent with children.',
                        3: 'This breed is good with children.',
                        4: 'This breed is great with children.',
                        5: 'This breed is perfect with children.'
                    },
                    good_with_other_dogs: {
                        1: 'This breed is not good with other dogs.',
                        2: 'This breed is decent with other dogs.',
                        3: 'This breed is good with other dogs.',
                        4: 'This breed is great with other dogs.',
                        5: 'This breed is perfect with other dogs.'
                    },
                    shedding: {
                        1: 'This breed has very little shedding',
                        2: 'This breed has a small amount of shedding',
                        3: 'This breed has moderate amount of shedding',
                        4: 'This breed has a lot of shedding',
                        5: 'This breed has the highiest amount of shedding'
                    },
                    trainability: {
                        1: 'This breed is very difficult to train',
                        2: 'This breed is difficult to train',
                        3: 'This breed is trainable',
                        4: 'This breed is easy to train',
                        5: 'This breed is very easy to train'
                    },
                    energy: {
                        1: 'This breed is low energy',
                        2: 'This breed is decently low energy',
                        3: 'This breed is moderately energetic',
                        4: 'This breed is energetic',
                        5: 'This breed is highly energetic'
                    },
                    barking: {
                        1: 'This breed rarely barks',
                        2: 'This breed barks occasionally ',
                        3: 'This breed barks regularly',
                        4: 'This breed barks often',
                        5: 'This breed barks constantly'
                    }
                }
                const attributes = ['good_with_children', 'good_with_other_dogs', 'shedding', 'trainability', 'energy', 'barking'];
                
                attributes.forEach(attribute => {
                    const score = data[0][attribute];
                    const sentence = sentences[attribute][score];
                    const attributeEle = document.createElement('p');
                    attributeEle.innerHTML = `<i class="material-icons tiny">pets</i> ${sentence}`;
                    container.appendChild(attributeEle);
                })
                
                const button = document.createElement('button');
                button.textContent = `Find your very own ${data[0].name}!`;
                button.classList.add('btn', 'wave-effect', 'wave-light');
                button.addEventListener('click', () => {
                    localStorage.setItem('selectedBreed', data[0].name);
                    window.location.href = 'breed.html';
                });
                container.appendChild(button);

            } else {
                console.error('Data is empty');
            }
        })
        .catch(error => {
            console.error(`Could not fetch ${breedName} data:`, error);
        });
    }

    const selectedBreeds = JSON.parse(localStorage.getItem('selectedBreeds')) || [];

    selectedBreeds.forEach((breed, index) => {
        const imageContainerId = `image${index + 1}`;

        fetchDataAndAppend(breed, apiKey, imageContainerId);
    });

});