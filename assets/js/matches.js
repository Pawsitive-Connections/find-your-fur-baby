
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

                    const nameDiv = document.createElement('div');
                    nameDiv.textContent = `Breed: ${data[0].name}`;
                    imageContainer.appendChild(nameDiv);

                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.textContent = `Good with Children: ${data[0].good_with_children}`;
                    imageContainer.appendChild(descriptionDiv);

                    const goodWithOtherDogsElement = document.createElement('p');
                    goodWithOtherDogsElement.textContent = `Good with Other Dogs: ${data[0].good_with_other_dogs}`;
                    descriptionDiv.appendChild(goodWithOtherDogsElement);

                    const sheddingElement = document.createElement('p');
                    sheddingElement.textContent = `Shedding: ${data[0].shedding}`;
                    descriptionDiv.appendChild(sheddingElement);

                    const groomingElement = document.createElement('p');
                    groomingElement.textContent = `Grooming: ${data[0].grooming}`;
                    descriptionDiv.appendChild(groomingElement);

                    const droolingElement = document.createElement('p');
                    droolingElement.textContent = `Drooling: ${data[0].drooling}`;
                    descriptionDiv.appendChild(droolingElement);
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