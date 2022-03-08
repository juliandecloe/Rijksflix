//import functions
import { $$ } from "../script.js";
import {starterResults} from "./renderData.js";
import {searchResults} from "./renderData.js";

//import variables
import { exploreWrap } from "../script.js";
import { searchWrap } from "../script.js";
import { searchSec } from "../script.js";
import { searchInput } from "../script.js";
import { page } from "../script.js";
import { exploreSec } from "../script.js";


const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
const searchAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&q=';

export function getartistData() {
    fetch(rijksAPI + page)
    .then(function(response) {
        return response.json();
    })
    .then(function(collection) {
        console.log(collection)
        starterResults(collection);
    })
    .then(function() {
        exploreWrap.insertAdjacentHTML('beforeend', 
            `<li class="loading lastOne"></li>`
        );	
    })
}

export function getsearchData() {
    const listEl = $$('.search li');
    if(listEl != null) { 
        for(let i = 0; i < listEl.length; i++) {
            listEl[i].remove();
        }
    }
    exploreSec.classList.add('hide');
    searchSec.classList.remove('hide');
    searchWrap.insertAdjacentHTML('beforeend', 
        `<li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>`
    );
    fetch(searchAPI + window.location.hash.slice(1))
    .then(function(response) {
        return response.json();
    })
    .then(function(collection) {
        console.log(collection)
        searchResults(collection);
    })
}



