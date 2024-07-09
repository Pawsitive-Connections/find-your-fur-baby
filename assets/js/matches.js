document.addEventListener('DOMContentLoaded'), () => {
const apiKey = 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC';
const url = `https://api.api-ninjas.com/v1/dogs?name=beagle&X-Api-Key=${apiKey}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        if (data.length > 0) {
            
            document.getElementById('image1').src = data[0].image_url;
            document.getElementById('image2').src = data[1].image_url;
            document.getElementById('image3').src = data[2].image_url;
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}