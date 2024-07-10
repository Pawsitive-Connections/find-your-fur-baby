document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC';
    const url = `https://api.api-ninjas.com/v1/dogs?name=beagle&X-Api-Key=${apiKey}`;
    const placeholderImageUrl = 'https://via.placeholder.com/400';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        
            if (data && data.length >= 1 && data[0].image_link && data[0].image_link.length > 0) {
                const image1 = document.getElementById('image1');
                const imgElement = document.createElement('img');
                imgElement.src = data[0].image_link;
                image1.appendChild(imgElement);
                imgElement.classList.add('appended-image1');

                const nameDiv = document.getElementById('name');
                const nameElement = document.createElement('p');
                nameElement.textContent = `Breed: ${data[0].name}`;
                nameDiv.appendChild(nameElement)

                const descriptionDiv = document.getElementById('description')
                const goodWithChildrenElement = document.createElement('p')
                goodWithChildrenElement.textContent = `Good with Children: ${data[0].good_with_children}`
                descriptionDiv.appendChild(goodWithChildrenElement)

                const goodWithOtherDogsElement = document.createElement('p')
                goodWithOtherDogsElement.textContent = `Good with Other Dogs: ${data[0].good_with_other_dogs}`
                descriptionDiv.appendChild(goodWithOtherDogsElement)

                const sheddingElement = document.createElement('p')
                sheddingElement.textContent = `Shedding: ${data[0].shedding}`
                descriptionDiv.appendChild(sheddingElement)

                const groomingElement = document.createElement('p')
                groomingElement.textContent = `Grooming: ${data[0].grooming}`
                descriptionDiv.appendChild(groomingElement)

                const droolingElement = document.createElement('p')
                droolingElement.textContent = `Drooling: ${data[0].drooling}`
                descriptionDiv.appendChild(droolingElement)
        } else {
            console.error('Data is emmpty');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
})