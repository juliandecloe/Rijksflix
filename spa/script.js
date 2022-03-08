//import functions
import {getartistData} from "./modules/getData.js";
import {getsearchData} from "./modules/getData.js";
import {resultsRouter} from "./modules/router.js";
import {removeHash} from "./modules/router.js";

//import variables
import { listChecker } from "./modules/renderData.js";

export const exploreSec = $('section:first-child');
export const searchSec = $('.search');
export let searchInput = $('header input');
export let page = 1;
export const exploreWrap = $('.explore ul');
export const searchWrap = $('.search ul');

const searchForm = $('header form'); 

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
			page = page + 1;
			clearInterval(listChecker);
			getartistData();
		}
	}
}

window.addEventListener('hashchange', function() {
	if(window.location.hash == null) {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
	} else {
		getsearchData();
	}
})

searchForm.addEventListener('submit', function(e) {
	if(searchInput.value == "") {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
	} else {
		e.preventDefault();
		resultsRouter();
	}
});

searchForm.addEventListener('input', function() {
	if(searchInput.value == "") {
		searchSec.classList.add('hide');
		exploreSec.classList.remove('hide');
		removeHash()
	}
});


/*
for(let i = 0; i < collection.artObjects.length; i++) {
	fetch('https://www.rijksmuseum.nl/api/nl/collection/' + collection.artObjects[i].objectNumber +'?key=C21U7KQu&imgonly=true')
	.then(function(response) {
		return response.json();
	})
	.then(function(detailed) {
		console.log(detailed)
		exploreWrap.insertAdjacentHTML('beforeend', 
			`<li>
				<h3>${detailed.artObject.principalOrFirstMaker}</h3>
				<img src="${detailed.artObject.webImage.url}" alt="${detailed.artObject.title}">
			</li>`
		);	
	})
}*/

