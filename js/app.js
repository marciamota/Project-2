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

const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const myHeaderHeight = document.getElementById('my-header').clientHeight;
    return (
        (rect.top <= (window.innerHeight || document.documentElement.clientHeight)*2/3 && 
        rect.bottom > myHeaderHeight) 
    );
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu() {
    const navBarLinks = document.getElementById('navbar__list');
    for (section of sections){
        const newMenuItem = document.createElement('li');
        const sectionName = section.getAttribute('data-nav');
        const sectionId = section.getAttribute('id');
        const linkId = section.getAttribute('id') + "link";
        newMenuItem.innerHTML = `<a class="menu__link" data-section="${sectionId}" id="${linkId}">${sectionName}</a>`;
        newMenuItem.addEventListener('click', (event) => scrollToSection(event));
        navBarLinks.appendChild(newMenuItem);
        section.setAttribute('data-menu-item', linkId);
    }
    addScrollListener();
}

// Add class 'active' to section when near top of viewport
function addScrollListener(){
    document.addEventListener('scroll', function () {
        for (section of sections){
            const linkId = section.getAttribute('data-menu-item');
            const menuItem = document.getElementById(linkId);
            if (isInViewport(section)){
                console.log('in view ' + section.getAttribute('id'));
                section.classList.add("your-active-class");
                menuItem.classList.add('active-link');
            }else{
                section.classList.remove("your-active-class");
                menuItem.classList.remove('active-link');
            }
        }
    }, {
        passive: true
    });
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    const sectionId = event.target.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    section.scrollIntoView({behavior: "smooth"});
}

/**
 * End Main Functions
 * 
*/

// Build menu 
buildMenu();


