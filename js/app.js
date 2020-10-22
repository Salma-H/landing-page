/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll(".landing__container");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function getNavElement(section) {
    const sectionID = section.getAttribute('id');

    return document.getElementById(sectionID+'.');
}

// This function takes the event target anf returns the id to the section to scroll to
function getSecId(target, targetNodeName) {
    if (targetNodeName === 'A'){
        const liId = target.parentElement.getAttribute('id');
        return liId.slice(0, -1);
    }
    else if (targetNodeName === 'LI'){
        const liId = target.getAttribute('id');
        return liId.slice(0, -1);
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function buildNav() {
    const docFrag = document.createDocumentFragment();

    for (const section of sections){

        // Creating a list item its content is a link for the section
        const listItem = document.createElement('li');
        const anch = document.createElement('a');

        const secID = section.parentElement.getAttribute('id');
        anch.setAttribute('href','#' + secID);
        anch.textContent = section.parentElement.getAttribute("data-nav");

        // giving this list item an id to get it easily after
        listItem.setAttribute('id',secID+'.')

        listItem.appendChild(anch);
        docFrag.appendChild(listItem);
    }
    // Adding this list to the navbar
    const navlist = document.querySelector("#navbar__list");
    navlist.appendChild(docFrag);
}



// Add class 'active' to section when near top of viewport
let observer = new IntersectionObserver(
    (entries, observer) => { 
      entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("your-active-class");
            let navItem = getNavElement(entry.target);
            navItem.style.backgroundColor = "lightblue";
        }
        else {
            entry.target.classList.remove("your-active-class");
            let navItem = getNavElement(entry.target);
            navItem.style.backgroundColor = "white";
        }      
    });
    }, 
    {threshold: 0.5});


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
document.querySelector('ul').addEventListener('click', function(event) {
    event.preventDefault();
    const secID = getSecId(event.target, event.target.nodeName);
    document.getElementById(secID).scrollIntoView({
        behavior: 'smooth'
    });
});

// Set sections as active
document.querySelectorAll('section').forEach(section => { observer.observe(section) });