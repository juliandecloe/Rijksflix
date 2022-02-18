//1. Variables (aka bindings), on top of global scope
let page = 1;
const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=5&imgonly=true&p=';

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
		const list = $$('ul li');
		const listWrap = $('section:first-child ul');
		if(page <= 1) {
			for(let i = 0; i < list.length; i++) {
				list[i].remove();
			}
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
	})
}

function $(element) {
	return document.querySelector(element);
}

function $$(element) {
	return document.querySelectorAll(element);
}

setInterval(function() {
	let listLast = $$('li');
	const rect = listLast[listLast.length - 1].getBoundingClientRect();
	if(rect.right < 600) {
		console.log('in view')
		page = page + 1;
		getData();
	}
}, 10)
	

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


