//import functions
import {getartistData} from "./modules/getData.js";
import {getsearchData} from "./modules/getData.js";
import {resultsRouter} from "./modules/router.js";

//import variables
import { listChecker } from "./modules/renderData.js";

const exploreSec = $('section:first-child');
const searchSec = $('.search');
const searchInput = $('header input');
const searchForm = $('header form');

export let searchPage = 1;
export function updateSearchPageNr(amount) {
	searchPage = searchPage + amount;
}
getartistData();

export function $(element) {
	return document.querySelector(element);
}

export function $$(element) {
	return document.querySelectorAll(element);
}
	
export function rectChecker() {
	if(!exploreSec.classList.contains('hide')) {
		let listLast = $$('.explore li');
		const rect = listLast[listLast.length - 4].getBoundingClientRect();
		if(rect.right < 600) {
			clearInterval(listChecker);
			getartistData();
		}
	}
}

window.addEventListener('hashchange', function() {
	searchPage = 1;
	if(searchInput.value.length > 0) {
		exploreSec.classList.add('hide');
		searchSec.classList.remove('hide');
	}
	if(window.location.hash == '#search') {
		searchInput.focus();
	} else if(window.location.hash == '') {
		history.replaceState("", "", location.pathname)
	} else {
		getsearchData();
	}
});

searchForm.addEventListener('submit', function(e) {
	if(searchInput.value == "") {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
	} else {
		e.preventDefault();
		resultsRouter();
		exploreSec.classList.add('hide');
		searchSec.classList.remove('hide');
	}
});

searchInput.addEventListener('input', function() {
	if(searchInput.value == "") {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
		window.location.hash = '#search';
	}
});

searchInput.addEventListener('focusin', function() {
	window.location.hash = '#search';
});

searchInput.addEventListener('focusout', function() {
	window.location.hash = searchInput.value;
	if(window.location.hash == '') {
		history.replaceState("", "", location.pathname)
	}
	if(searchInput.value == "") {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
	}
});

const noresultsBtn = document.querySelector('.no-results button');

noresultsBtn.addEventListener('click', function() {
	searchInput.value = "";
	searchInput.focus();
});

const colorAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&f.normalized32Colors.hex=ff0000';

testAPI();

function testAPI() {
    page = page + 1;
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
            `<li class="loading">
                <h3></h3>
                <p></p>
                <figure></figure>
            </li>`
        );	
    })
}