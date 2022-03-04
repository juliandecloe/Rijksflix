import { $ } from "../script.js";
import { $$ } from "../script.js";

export function searchFunction() {

    const searchForm = $('header form'); 
    const searchAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&q=';
    const exploreSec = $('section:first-child');
    const searchWrap = $('.search ul');
    const searchSec = $('.search');
    let searchInput = $('header input');

    let page = 1;

    function searchItems() {
        const listEl = $$('.search li');
        if(listEl != null) { 
            for(let i = 0; i < listEl.length; i++) {
                listEl[i].remove();
            }
        }
        searchSec.classList.remove('hide');
        fetch(searchAPI + searchInput.value)
        .then(function(response) {
            return response.json();
        })
        .then(function(collection) {
            console.log(collection)
            searchResults(collection);
        })
    }

    function searchResults(collection) {
        const loadingList = $$('.loading');
        for(let i = 0; i < loadingList.length; i++) {
            loadingList[i].remove();
        }
        exploreSec.classList.add('hide');
        const artObjects = collection.artObjects; 
        const noResults = $('.no-results');
        if(artObjects.length == 0) {
            noResults.classList.remove('hide');
        } else {
            if(!noResults.classList.contains('hide')) {
                noResults.classList.add('hide');
            }
            for(let i = 0; i < artObjects.length; i++) {
                searchWrap.insertAdjacentHTML('beforeend', 
                    `<li>
                        <h3>${artObjects[i].principalOrFirstMaker}</h3>
                        <img src="${artObjects[i].webImage.url.slice(0, -3)+"=s1000"}" alt="${artObjects[i].title}">
                    </li>`
                );
            }
        }   
    }

    searchForm.addEventListener('submit', function(e) {
        if(searchInput.value == "") {
            searchSec.classList.add('hide');
            exploreSec.classList.remove('hide');
        } else {
            e.preventDefault();
            searchItems();
        }
    });
    searchForm.addEventListener('input', function() {
        if(searchInput.value == "") {
            searchSec.classList.add('hide');
            exploreSec.classList.remove('hide');
        }
    });
}