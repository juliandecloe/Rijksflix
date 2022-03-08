//import functions
import { $ } from "../script.js";

//import variables
import { searchInput } from "../script.js";


const routerDirect = $('.search h2');

export function resultsRouter() {
    routerDirect.id = searchInput.value;
    window.location.hash = routerDirect.id;
}

export function removeHash() {
    window.location.hash = '';
	history.replaceState("", "", location.pathname);
}