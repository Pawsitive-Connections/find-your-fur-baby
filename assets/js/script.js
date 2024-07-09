const apiKey = 'nRPoBjRs5ZStqGdhxXi3zA==vDeVKQVySaNORCHC'
const url = `https://api.api-ninjas.com/v1/dogs?name=beagle&X-Api-Key=${apiKey}`

fetch(url)
.then(response => response.json())
.then(data => {
console.log(data)
})
.catch(error => {
console.error('error fetching data:', error)
})