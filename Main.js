import { Page } from "./js/Page.js";

document.addEventListener('DOMContentLoaded', () => {
    
    const page = new Page();

    // add a reference to the page object to the window object for easier debugging
    window.page = page;

});
