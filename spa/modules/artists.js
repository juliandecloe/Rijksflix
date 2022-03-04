import { $ } from "../script.js";
import { $$ } from "../script.js";

export function loadArtist() {

    const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
    let page = 1;
    let listChecker;
    const listWrap = $('.explore ul');
    const exploreSec = $('.explore');

    //2. the story
    getData();

    //3. functions
    function getData() {
        fetch(rijksAPI + page)
        .then(function(response) {
            return response.json();
        })
        .then(function(collection) {
            console.log(collection)
            listAssign(collection);
        })
        .then(function() {
            listWrap.insertAdjacentHTML('beforeend', 
                `<li class="loading lastOne"></li>`
            );	
        })
    }

    function listAssign(collection) {
        const loadingList = $$('.loading');
        for(let i = 0; i < loadingList.length; i++) {
            loadingList[i].remove();
        }	
        for(let i = 0; i < collection.artObjects.length; i++) {
            const artObjects = collection.artObjects[i]; 
            listWrap.insertAdjacentHTML('beforeend', 
                `<li>
                    <h3>${artObjects.principalOrFirstMaker}</h3>
                    <img src="${artObjects.webImage.url.slice(0, -3)+"=s1000"}" alt="${artObjects.title}">
                </li>`
            );
            listWrap.classList.remove('antiscroll');
        }
        listChecker = setInterval(rectChecker, 50);
    }

    function rectChecker() {
        if(!exploreSec.classList.contains('hide')) {
            let listLast = $$('.explore li');
            const rect = listLast[listLast.length - 4].getBoundingClientRect();
            if(rect.right < 600) {
                page = page + 1;
                clearInterval(listChecker);
                getData();
            }
        }
    }

}