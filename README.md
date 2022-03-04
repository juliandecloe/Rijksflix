# My Web App - Rijksmuseum

I chose for the Rijksmuseum assignment. The user story for this assignment is:
> As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art during a lockdown. [Rijksmuseum - RijksData API](https://data.rijksmuseum.nl/object-metadata/)

The plan I have is to create something like Netflix, but for art. Hence the name [Rijksflix](juliandecloe.github.io/rijksflix/spa)

## Insights

### How to fetch the detailed artObject API
```
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
}
```

```
let page = 1;
const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';

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

```

### Check if element is in screen to load more objects

This is to check on horizontal scroll if the 4th last element is in screen to load 10 new objects.

```
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
```
