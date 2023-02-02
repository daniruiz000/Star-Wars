const printPlanets = () => {
    mainContainer.innerHTML = "";
    getPlanets().then(response => {
        let planetsCards = formatPlanetsCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">PLANETS</h3>
                <section class="section__container">
                    ${planetsCards}
                </section>
            </section>
        `;
        addEventsToPlanetsLinks(response);
    });
}

const formatPlanetsCards = (planets) => {
    let templatePlanet = planets.map(planet => {
        return `
            <div class="card">
                <h4 class="card__title"> ${planet.name} </h4>
                <img class="card__img" src="${planet.img}">
                <div class="card__info-container">
                    <p class="card__info-title"> POPULATION </p>
                    <p class="card__info"> ${planet.population} </p>
                    <p class="card__info-title"> TERRAIN </p>
                    <p class="card__info"> ${planet.terrain} </p>
                    <p class="card__info-title"> CLIMATE </p>
                    <p class="card__info"> ${planet.climate} </p>
                    <a class="card__link" href="#"> +MORE DETAILS </a>
                </div>
            </div> 
        `
    }).join('');

    return templatePlanet;

}

const addEventsToPlanetsLinks = (planets) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('PLANETS', planets[i].urlDetail);
        })
    });
}


const getPlanets = async () => {
    let url = URL_BASE + "/planets/";
    let urlNext = null;
    let dataAll = [];
    do {
        let response = (urlNext !== null) ? await fetch(urlNext): await fetch(url);
        data = await response.json();
        dataAll = [...dataAll, ...mapDataPlanets(data.results)];
        urlNext = data.next;
        //console.log(dataAll);

    } while (data.next !== null)

    return dataAll;
}

const mapDataPlanets = (data) => {
    let dataMapped = data.map( planet => {
        let object = {
            name: planet.name,
            img: "assets/images/planets/" + planet.url.replace("https://swapi.dev/api/planets/","").replace("/","") + '.jpg',
            population: planet.population,
            climate: planet.climate.split(',')[0],
            terrain: planet.terrain.split(',')[0],
            urlDetail: planet.url
        }

        return object;
    });

    return dataMapped;
}