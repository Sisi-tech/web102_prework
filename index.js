/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (const game of games) {
        const name = game.name;
        const description = game.description;
        const pledged = game.pledged;
        const goal = game.goal;
        const backers = game.backers;
        const img = game.img;
    // create a new div element, which will become the game card
        const div = document.createElement('div');
        div.classList.add("game-card");
    // add the class game-card to the list
    // set the inner HTML using a template literal to display some info 
    // about each game
        div.innerHTML = `
                        <img src="${img}" class="game-img" alt="${name}" />
                        <h2>Game Name: ${name}</h2>
                        <p>Game Description: ${description}</p>
                        <p>Pledged: $${pledged.toString()}</p>
                        <p>Goal: $${goal.toString()}</p>
                        <p>Backers: ${backers}</p>
                        <p>
                        `;
    // append the game to the games-container
        gamesContainer.appendChild(div);
    }
}
// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmountRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);
raisedCard.innerHTML = `$ ${totalAmountRaised.toLocaleString('en-US')}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);
gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    })
    addGamesToPage(listOfFundedGames);
    // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter((game) => { 
    return game.pledged < game.goal 
});
let totalUnfundedGames = unfundedGames.reduce((acc, game) => { 
    return acc + 1;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${totalUnfundedGames} ${totalUnfundedGames < 2 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`
console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container
const descriptionStr = document.createElement('p');
descriptionStr.innerHTML = displayStr;
descriptionContainer.appendChild(descriptionStr);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = [sortedGames[0].name, sortedGames[1].name];

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = document.createElement('p');
topGame.innerHTML = firstGame;
firstGameContainer.appendChild(topGame);
// do the same for the runner up item
const runnerGame = document.createElement('p');
runnerGame.innerHTML = secondGame;
secondGameContainer.appendChild(runnerGame);