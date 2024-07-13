// const url = 'https://dogapi.dog/api/v2/breeds'

// const imgDiv = $('div')
// const infoDiv = $('div')
// const findSect = $('.adopt')
// findSect.append(imgDiv)
// findSect.append(infoDiv)
const findSect = document.getElementById('find')

function fetchAdopt () {
const url = 'https://api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=20'
fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': 'DBLRH7bt'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)
    // data = data.data
    // console.log(data)
    
   
    createLinks(data)

    
})
.catch(error => {
    console.error('error fetching data:', error)
})
}


function createLinks (dogs) {
    console.log(dogs.data) 

    // images
    for (const dog of dogs.data) {
        let img = dog.attributes.pictureThumbnailUrl
        const imgEl = document.createElement('img')
        const dogDiv = document.createElement('div')
        const ul = document.createElement('ul')
        const li1 = document.createElement('li')
        const li2 = document.createElement('li')
        const li3 = document.createElement('li')
        const li4 = document.createElement('li')
        const li5 = document.createElement('li')
        const li6 = document.createElement('li')

        ul.appendChild(li1)
        ul.appendChild(li2)
        ul.appendChild(li3)
        ul.appendChild(li4)
        ul.appendChild(li5)
        ul.appendChild(li6)

        li1.textContent = dog.attributes.name
        li1.classList.add('name')
        li2.textContent = dog.attributes.breedPrimary
        li3.textContent = dog.attributes.ageString
        li4.textContent = dog.attributes.colorDetails
        li5.textContent = dog.attributes.sex
        li6.classList.add('link')
        // li6.textContent = dog.attributes.rescueId


        findSect.appendChild(dogDiv)
        imgEl.setAttribute('src', img)
        dogDiv.appendChild(imgEl)
        dogDiv.appendChild(ul)
        findSect.appendChild(dogDiv)

        dogDiv.classList.add('dog')

        // const link = dog.attributes.descriptionText
        // const linkRegex = /(https?:\/\/[^\s]+)/;
        // const linkMatch = link.match(linkRegex);
    

        // if (linkMatch) {
        //     extractedLink = linkMatch[0]
        //     // console.log(extractedLink)
        //     const linkText = 'Click to Adopt'
        //     const a = document.createElement('a')
        //     a.href = extractedLink
        //     a.textContent = linkText
        //     li6.appendChild(a)

        // } else 
        if (dog.attributes.url) {
            const linkText = 'Click to Adopt'
            const a = document.createElement('a')
            a.href = dog.attributes.url
            a.textContent = linkText
            li6.appendChild(a)
        } else {
            dogDiv.remove();
        }




    }

}

fetchAdopt()
// createLinks()



