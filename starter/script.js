'use strict';

const countriesContainer = document.querySelector('.countries');
const renderCountry = function (data, className = '') {
  // Sätter className by default till inget
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  const html = `
  <article class="country ${className}">
 <img class="country__img" src= "${data.flags.svg}">
 <div class="country__data">
   <h3 class="country__name"> ${data.name.official}</h3>
   <h4 class="country__region">${data.region}</h4>    
   <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(
     // Rundar av talet.
     1
   )} million</p>         
   <p class="country__row"><span>🗣️</span>${languages[0]}</p>
   <p class="country__row"><span>💰</span>${currencies[0].name}</p>
 </div>
</article>`;

  // Applicerar den genererade html koden till elementet
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // fetch metoden returnerar en promise
  const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      // Måste calla JSON metoden på responsen för att kunna läsa värdet av ReadableStream.
      return response.json();
    })
    // Eftersom JSON metoden också är asynkron och returnerar en ny promise måste vi använde en till then metod för att få ut datan.
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

getCountryData('russia');
