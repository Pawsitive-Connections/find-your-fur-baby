// const url = 'https://dogapi.dog/api/v2/breeds'

// const imgDiv = $('div')
// const infoDiv = $('div')
// const findSect = $('.adopt')
// findSect.append(imgDiv)
// findSect.append(infoDiv)
const findSect = document.getElementById('find')
const submit = document.getElementById('submit')
const zip = document.getElementById('textarea1')
const mile = document.getElementById('miles')

const h2 = document.getElementById('breedH2')


let breed = localStorage.getItem('selectedBreed');
// h2.textContent = `Find my ${breed}!`;

submit.textContent = `Find ${breed} neare me`
submit.addEventListener('click', function (event){
    event.preventDefault();
    anywhere.setAttribute('style', 'background-color: #dbddec;')
    fetchAdopt()

    
})
const anywhere = document.getElementById('anywhere');
anywhere.addEventListener('click', function (event){
    event.preventDefault();
    console.log('clicked')
    submit.setAttribute('style', 'background-color: #dbddec;')
    fetchAnywhere()
})



h2.textContent = `Find my ${breed}!`
function fetchAnywhere () {

  const url = 'https://api.rescuegroups.org/v5/public/animals/search/available/dogs/?sort=random&limit=25'
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/vnd.api+json");
  myHeaders.append("Authorization", "DBLRH7bt");
  
  let raw = JSON.stringify({
    "data": {
      "filters": [
        {
          "fieldName": "animals.breedPrimary",
          "operation": "equal",
          "criteria": breed
        },
      ],
    }
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  
  };
  
  
      
      
  
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      // data = data.data
      // console.log(data)
  
      
     
      createLinks(data)
  
      
  })
  .catch(error => {
      console.error('error fetching data:', error)
       h2.textContent = `There are no ${breed}s in that area`
  })
  }

function fetchAdopt () {

  const url = 'https://api.rescuegroups.org/v5/public/animals/search/available/dogs/'
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/vnd.api+json");
  myHeaders.append("Authorization", "DBLRH7bt");
  
  let raw = JSON.stringify({
    "data": {
      "filters": [
        {
          "fieldName": "animals.breedPrimary",
          "operation": "equal",
          "criteria": breed
        },
      ],
      // "filterProcessing": "1 and 2",
      "filterRadius": {
        "miles": mile.value,
        "postalcode": zip.value
      }
    }
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  
  };
  
  
      
      
  
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
      console.log(data)
      // data = data.data
      // console.log(data)
  
      
     
      createLinks(data)
  
      
  })
  .catch(error => {
      console.error('error fetching data:', error)
       h2.textContent = `There are no ${breed}s in that area`
  })
  }

let dogArray = []


function createLinks (dogs) {
    console.log(dogs.data) 

    let dogDiv
    let isDogs = false;
    let isNoDogs = false;

    // images
    for (const dog of dogs.data) {
        let img = dog.attributes.pictureThumbnailUrl
        const imgEl = document.createElement('img')
        dogDiv = document.createElement('div')
        const ul = document.createElement('ul')
        const li1 = document.createElement('li')
        const li2 = document.createElement('li')
        const li3 = document.createElement('li')
        const li4 = document.createElement('li')
        const li5 = document.createElement('li')
        const li6 = document.createElement('li')
        const des = document.createElement('p')
   

        ul.appendChild(li1)
        ul.appendChild(li2)
        ul.appendChild(li3)
        ul.appendChild(li4)
        ul.appendChild(li5)
        ul.appendChild(li6)



        li1.textContent = dog.attributes.name
        li1.classList.add('name')
        li2.textContent = dog.attributes.breedString
        li3.textContent = dog.attributes.ageString
        li4.textContent = dog.attributes.colorDetails
        li5.textContent = dog.attributes.sex
        des.textContent = dog.attributes.descriptionText
  

        li6.classList.add('link')
        des.classList.add('hide')
  

    


        // li6.textContent = dog.attributes.rescueId


        findSect.appendChild(dogDiv)
        imgEl.setAttribute('src', img)
        dogDiv.appendChild(imgEl)
        dogDiv.appendChild(des)
        dogDiv.appendChild(ul)
        findSect.appendChild(dogDiv)

        dogDiv.classList.add('dog')

        const link = dog.attributes.descriptionText
     

          // const linkRegex = /(https?:\/\/[^\s]+)/;
          // const linkMatch = link.match(linkRegex);
        
    

      if (dog.attributes.url) {
            const linkText = 'Click to Adopt'
            const a = document.createElement('a')
            a.href = dog.attributes.url
            a.textContent = linkText
            li6.appendChild(a)
            isDogs = true;


        }   
      //   else if (link) {
      //     const linkRegex = /(https?:\/\/[^\s]+)/;
      //     const linkMatch = link.match(linkRegex);
      //     extractedLink = linkMatch
      //     // console.log(extractedLink)
      //     const linkText = 'Click to Adopt'
      //     const a = document.createElement('a')
      //     a.href = extractedLink
      //     a.textContent = linkText
      //     li6.appendChild(a)
      //     isDogs = true

      // } 
      else if (dog.attributes.descriptionText) {
          isDogs = true;
      }
      else {
            dogDiv.remove(); 
            isNoDogs = true
            
        }

    
        

        dogArray.push(dogDiv)
        // if (dogArray === dog.attributes.url) {
        //     console.log('all dogs')
        // } else if (dogArray === dog.attributes.url && dogArray !== dog.attributes.url) {
        //     console.log('some dogs')
        // } else if (dogArray !== dog.attributes.url) {
        //     console.log('no dogs')
        // }
        
    // }
    aboutDog(dogArray)
   
}

if (isDogs === true && isNoDogs === true) {
    console.log('all dogs are up')
} else if (isDogs === true && isNoDogs === false) {
    console.log('some dogs are up')
} else if (isDogs === false && isNoDogs === true) {
       h2.textContent = `There are no ${breed}s in that area`
}

for (const div of dogArray) {
    if (div) {
        console.log('div')
    } else {
        console.log('no div')
    }
}
// if (dogDiv) {
//         console.log('there are dogs')
// } 
// else if (dogDiv && !dogDiv) {
//         console.log('there are some dogs')
// } else if (!dogDiv) {

//         console.log('there are no dogs')
     
//    }

console.log(dogArray)




}

// createLinks()

// console.log(aboutText.textContent)
function aboutDog (pickADog) {

  // console.log(description)
  const aboutText = document.getElementById('aboutBreed')
  const pText = document.getElementById('description')
  const img = document.getElementById('dog-img')
  for (const dog of pickADog) {
    dog.addEventListener('click', function (event) {
      // event.preventDefault()
      // console.log(dogData)
      document.getElementById('dHeader').classList.remove('hide')
      
      // console.log(dog)
      let imgUrl = dog.children[0].currentSrc
      console.log(imgUrl)
    img.setAttribute('src', imgUrl)
    img.setAttribute('style', 'width: 200px; height: auto; border-radius: 5px;')

    let dogName = dog.lastChild.childNodes[0].innerText
    aboutText.textContent = `More about ${dogName}`;
    let description = dog.children[1].innerText;
    let cleanDes = description.replace('&nbsp;', ' ')
    pText.textContent = cleanDes
    pText.classList.remove('center')





  })
  }
}



$(document).ready(function(){
    $('select').formSelect();
  });


  const newLoc = document.getElementById('new-loc') 


  newLoc.addEventListener('click', function () {
    location.reload()
    
  })


   $(document).ready(function(){
     $('.modal').modal();
     $('#modal1').modal('open');

   });

  
 
         