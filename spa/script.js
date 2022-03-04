//1. Variables (aka bindings), on top of global scope
import {searchFunction} from "./modules/search.js";
import {loadArtist} from "./modules/artists.js";


searchFunction();
loadArtist();


export function $(element) {
	return document.querySelector(element);
}

export function $$(element) {
	return document.querySelectorAll(element);
}
	


/*
for(let i = 0; i < collection.artObjects.length; i++) {
	fetch('https://www.rijksmuseum.nl/api/nl/collection/' + collection.artObjects[i].objectNumber +'?key=C21U7KQu&imgonly=true')
	.then(function(response) {
		return response.json();
	})
	.then(function(detailed) {
		console.log(detailed)
		listWrap.insertAdjacentHTML('beforeend', 
			`<li>
				<h3>${detailed.artObject.principalOrFirstMaker}</h3>
				<img src="${detailed.artObject.webImage.url}" alt="${detailed.artObject.title}">
			</li>`
		);	
	})
}*/

