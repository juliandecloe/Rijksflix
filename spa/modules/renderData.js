//Import functions
import { $ } from "../script.js";
import { $$ } from "../script.js";

//Import variables
import { rectChecker } from "../script.js";
import { exploreWrap } from "../script.js";
import { searchWrap } from "../script.js";


export let listChecker;

export function starterResults(collection) {
    const loadingList = $$('.loading');
    for(let i = 0; i < loadingList.length; i++) {
        loadingList[i].remove();
    }	
    for(let i = 0; i < collection.artObjects.length; i++) {
        const artObjects = collection.artObjects[i]; 
        exploreWrap.insertAdjacentHTML('beforeend', 
            `<li>
                <h3>${artObjects.principalOrFirstMaker}</h3>
                <img src="${artObjects.webImage.url.slice(0, -3)+"=s1000"}" alt="${artObjects.title}">
            </li>`
        );
        exploreWrap.classList.remove('antiscroll');
    }
    listChecker = setInterval(rectChecker, 50);
}

export function searchResults(collection) {
    const loadingList = $$('.loading');
    for(let i = 0; i < loadingList.length; i++) {
        loadingList[i].remove();
    }
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
                    <img src="${artObjects[i].webImage.url.slice(0, -3)+"=s1000"}" alt="${artObjects[i].title}">
                    <h3>${artObjects[i].title}</h3>
                    <p>${artObjects[i].principalOrFirstMaker}</p>
                </li>`
            );
        }
    }   
}