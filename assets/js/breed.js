const url = 'https://dogapi.dog/api/v2/breeds'
fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)
})
.catch(error => {
    console.error('error fetching data:', error)
})