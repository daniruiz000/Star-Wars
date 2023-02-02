const mainContainer = document.querySelector('.main');
const URL_BASE = "https://swapi.dev/api";

window.onload = () => {
    printHome('HOME');
}

const printPage = (section, url) => {

    adaptHeader(section);

    switch (section){
        case 'HOME':
            printHome();
            break;
        case 'FILMS':
            url ? printDetailFilm(url) : printFilms();
            break;
        case 'CHARACTERS':
            url ? printDetailCharacter(url) : printCharacters();
            break;
        case 'STARSHIPS':
            url ? printDetailStarship(url) : printStarships();
            break;
        case 'SPECIES':
            url ? printDetailSpecie(url) : printSpecies();
            break;
        case 'PLANETS':
            url ? printDetailPlanet(url) : printPlanets();
            break;
        default:
            printHome();
            break;
    }

    window.scrollTo(0,0);
}

const adaptHeader = (section) => {
    const header = document.querySelector('header');
    if(section === 'HOME'){
        header.classList.add('header--home');
    } else {
        header.classList.remove('header--home');
    }
}