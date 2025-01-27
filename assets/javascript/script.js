// API urls & keys
var gifKey = "KISAUxVEoSojC461QWS5Qdgd1ZGxaUE5";
var usaUrl = "https://disease.sh/v3/covid-19/countries/usa";
var gifUrl = `https://api.giphy.com/v1/gifs/search?q=cats&api_key=${gifKey}`

// Global Variables
var usaTotalEl = document.querySelector('.usaTotal');
var usaActiveEl = document.querySelector('.usaActive');
var usaRecoveredEl = document.querySelector('.usaRecovered');
var usaDeathsEl = document.querySelector('.usaDeaths');
var stateTitleEl = document.querySelector('.stateTitle');
var stateTotalEl = document.querySelector('.stateTotal');
var stateActiveEl = document.querySelector('.stateActive');
var stateRecoveredEl = document.querySelector('.stateRecovered');
var stateDeathsEl = document.querySelector('.stateDeaths');
var searchBtnEl = document.querySelector('#searchBtn');
var input = document.querySelector('.stateInput');
var gif1El = document.querySelector('#gif1');
var gif2El = document.querySelector('#gif2');
var gif3El = document.querySelector('#gif3');
var gif4El = document.querySelector('#gif4');
var gif5El = document.querySelector('#gif5');
var gif6El = document.querySelector('#gif6');
var gif7El = document.querySelector('#gif7');
var gif8El = document.querySelector('#gif8');
var catBtn = document.querySelector('#catBtn');
var catContainer = document.querySelector('#catContainer');
var placeholderImg = document.querySelector('#placeholderImg');
var searchHistoryEl = document.querySelector('#searchHistory');

// HTML Script effects
var sideNav = document.querySelector('.sidenav');
// Side nav needs to be capitalized for some reason..
M.Sidenav.init(sideNav, {})

// slider script for materialize
var slider = document.querySelector('.slider')
M.Slider.init(slider, {
    indicators: false,
    height: 600,
    width: 200,
    transition: 500,
    interval: 6000

});

// auto complete with states
var ac = document.querySelector('.autocomplete');
M.Autocomplete.init(ac, {
    data: {
        "Alabama": null,
        "Alaska": null,
        "Arizona": null,
        "Arkansas": null,
        "California": null,
        "Colorado": null,
        "Connecticut": null,
        "Delaware": null,
        "Florida": null,
        "Georgia": null,
        "Hawaii": null,
        "Idaho": null,
        "Illinois": null,
        "Indiana": null,
        "Iowa": null,
        "Kansas": null,
        "Kentucky": null,
        "Louisiana": null,
        "Maine": null,
        "Maryland": null,
        "Massachusetts": null,
        "Michigan": null,
        "Minnesota": null,
        "Mississippi": null,
        "Missouri": null,
        "Montana": null,
        "Nebraska": null,
        "Nevada": null,
        "New Hampshire": null,
        "New Jersey": null,
        "New Mexico": null,
        "New York": null,
        "North Carolina": null,
        "North Dakota": null,
        "Ohio": null,
        "Oklahoma": null,
        "Oregon": null,
        "Pennsylvania": null,
        "Rhode Island": null,
        "South Carolina": null,
        "South Dakota": null,
        "Tennessee": null,
        "Texas": null,
        "Utah": null,
        "Vermont": null,
        "Virginia": null,
        "Washington": null,
        "West Virginia": null,
        "Wisconsin": null,
        "Wyoming": null,
    },
    limit: 5

});

// script to zoom in on selected gifs
var gallery = document.querySelectorAll('.materialboxed')
M.Materialbox.init(gallery, {});

// Starting function to check for history in local storage
var init = function () {
    renderHistory();
}

var searchHistory = JSON.parse(localStorage.getItem("history")) || [];

// function connected to event listener that takes the searched item and puts that data into the api
var searchBtnHandler = function (event) {
    event.preventDefault();

    var state = input.value.trim();

    if (state) {
        getState(state);
        input.value = '';
    } else {
        return;
    }

    // logs what was searched and stores it in local storage
    searchHistory = [];
    var historyText = state;
    searchHistory = searchHistory.concat([historyText]);

    localStorage.setItem("history", JSON.stringify(searchHistory));
    renderHistory();
};

// renders the history on to the page
var renderHistory = function () {
    searchHistoryEl.textContent = "Recently Searched: " + searchHistory;

    if (searchHistory !== "") {
        getState(searchHistory);
    }
}

// updates the api and pushes the new api data to be displayed
var getState = (function (state) {
    var stateUrl = `https://disease.sh/v3/covid-19/states/${state}`;

    fetch(stateUrl)
        .then(function (response) {
            // This code prevents the data field from being updated with undefined
            var myStatus = response.status;
            if (myStatus === 404) {
                return init();
            }
            return response.json();
        }).then(function (stateData) {

            displayState(stateData);
        })


})

// displays the searched for data onto the page
var displayState = (function (data) {

    var stateTitle = data.state;
    var stateTotal = data.cases;
    var stateActive = data.active;
    var stateRecovered = data.recovered;
    var stateDeaths = data.deaths;

    stateTitleEl.textContent = stateTitle + " Data";
    stateTotalEl.textContent = "Total Cases: " + stateTotal;
    stateActiveEl.textContent = "Active Cases: " + stateActive;
    stateRecoveredEl.textContent = "Recovered: " + stateRecovered;
    stateDeathsEl.textContent = "Deaths: " + stateDeaths;
})

// displays the total USA api results onto the page
var displayUSA = (function (country) {

    var usaTotal = country.cases;
    var usaActive = country.active;
    var usaRecovered = country.recovered;
    var usaDeaths = country.deaths;

    usaTotalEl.textContent = "Total Cases: " + usaTotal;
    usaActiveEl.textContent = "Active Cases: " + usaActive;
    usaRecoveredEl.textContent = "Recovered: " + usaRecovered;
    usaDeathsEl.textContent = "Deaths: " + usaDeaths;
})

// pulls the total USA api results from the api
fetch(usaUrl)
    .then(function (response) {
        return response.json();
    }).then(function (usaData) {
        displayUSA(usaData);
    })


// calls the cats gifs from giphy api
var getCats = function () {

    fetch(gifUrl)
        .then(function (response) {
            return response.json();
        }).then(function (gifData) {
            displayCats(gifData);
        })
}


// displays the cat gifs from giphy onto the page, while making the container appear, and the placholder gif disappear.
var displayCats = function (cats) {
    placeholderImg.setAttribute("style", "display: none");
    catContainer.setAttribute("style", "");

    gif1El.setAttribute("src", cats.data[0].images.original.url);
    gif2El.setAttribute("src", cats.data[11].images.original.url);
    gif3El.setAttribute("src", cats.data[1].images.original.url);
    gif4El.setAttribute("src", cats.data[25].images.original.url);
    gif5El.setAttribute("src", cats.data[3].images.original.url);
    gif6El.setAttribute("src", cats.data[15].images.original.url);
    gif7El.setAttribute("src", cats.data[23].images.original.url);
    gif8El.setAttribute("src", cats.data[13].images.original.url);

}

// event listeners and function call
searchBtn.addEventListener('click', searchBtnHandler);
catBtn.addEventListener('click', getCats);
init();