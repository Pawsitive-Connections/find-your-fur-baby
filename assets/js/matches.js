
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

                    const container = document.createElement('div')
                    imageContainer.appendChild(container)
                    
                    const nameDiv = document.createElement('div');
                    nameDiv.textContent = `Breed: ${data[0].name}`;
                    container.classList.add('breedSelection')
                    container.appendChild(nameDiv);

                    const descriptionDiv = document.createElement('p');
                    descriptionDiv.textContent = `Good with Children: ${data[0].good_with_children}`;
                    container.appendChild(descriptionDiv);

                    const goodWithOtherDogsElement = document.createElement('p');
                    goodWithOtherDogsElement.textContent = `Good with Other Dogs: ${data[0].good_with_other_dogs}`;
                    container.appendChild(goodWithOtherDogsElement);

                    const sheddingElement = document.createElement('p');
                    sheddingElement.textContent = `Shedding: ${data[0].shedding}`;
                    container.appendChild(sheddingElement);

                    const trainabilityElement = document.createElement('p');
                    trainabilityElement.textContent = `Trainability: ${data[0].trainability}`;
                    container.appendChild(trainabilityElement);

                    const energyElement = document.createElement('p');
                    energyElement.textContent = `Energy: ${data[0].energy}`;
                    container.appendChild(energyElement);

                } else {
                    console.error('Data is empty');
                }
            })
            .catch(error => {
                console.error(`Error fetching ${breedName} data:`, error);
            });
    }

    fetchDataAndAppend('beagle', apiKey, 'image1');

    fetchDataAndAppend('bulldog', apiKey, 'image2');

    fetchDataAndAppend('Pug', apiKey, 'image3')

//         // // const breedSelection = data from quiz containing 3 best matces
//         // breedSelection.forEach((breed, index) => {
//         //     const imageContainerId = `image${index + 1}`;
//         //     fetchDataAndAppend(breed, apiKey, imageContainerId);
            
//         // });
// });

});