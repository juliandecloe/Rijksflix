
const backgroundNormal = document.querySelector('section > img');

function showFunnypic() {
	backgroundNormal.src = "img/julian2.jpg";
	setTimeout(function() { 
		backgroundNormal.src = "img/julian.jpg";
	}, 500);

}

backgroundNormal.addEventListener('click', showFunnypic);