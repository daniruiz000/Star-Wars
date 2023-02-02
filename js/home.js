const printHome = () => {
    mainContainer.innerHTML = `
        <section class="section-home">
            <h3 class="section-home__title">ABOUT THE WEB<h3>
            <p class="section-home__description"> La República Galáctica está sumida en el caos. 
                Los impuestos de las rutas comerciales a los sistemas 
                estelares exteriores están en disputa... </p>
        </section>
        <section class="section-home">
            <h3 class="section-home__title">SECTIONS</h3>
            <nav class="nav">
                <a href="#" class="nav__link">Films</a>
                <a href="#" class="nav__link">Characters</a>
                <a href="#" class="nav__link">Starships</a>
                <a href="#" class="nav__link">Species</a>
                <a href="#" class="nav__link">Planets</a>
            </nav>
        </section>
    `;

    addEventsToHomeLinks();
}


const addEventsToHomeLinks = () => {
    const homeLinks =[...document.getElementsByClassName('nav__link')];
    homeLinks.forEach( element => {
        element.addEventListener('click', () => {
            printPage(element.textContent.toLocaleUpperCase());;
        });
    });
}