const printSpecies = () => {
    mainContainer.innerHTML = "";
    getSpecies().then(response => {
        let speciesCards = formatSpeciesCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">SPECIES</h3>
                <section class="section__container">
                    ${speciesCards}
                </section>
            </section>
        `;
        addEventsToSpeciesLinks(response);
    });
}

const formatSpeciesCards = (species) => {
    let templatePlanet = species.map(specie => {
        return `
            <div class="card">
                <h4 class="card__title"> ${specie.name} </h4>
                <img class="card__img" src="${specie.img}">
                <div class="card__info-container">
                    <p class="card__info-title"> CLASSIFICATION </p>
                    <p class="card__info"> ${specie.classification} </p>
                    <p class="card__info-title"> LIFESPAN </p>
                    <p class="card__info"> ${specie.lifespan} </p>
                    <p class="card__info-title"> LANGUAGE </p>
                    <p class="card__info"> ${specie.language} </p>
                    <a class="card__link" href="#"> +MORE DETAILS </a>
                </div>
            </div> 
        `
    }).join('');

    return templatePlanet;

}

const addEventsToSpeciesLinks = (species) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('SPECIES', species[i].urlDetail);
        })
    });
}


const getSpecies = async () => {
    let url = URL_BASE + "/species/";
    
    let urlNext = null;
    let dataAll = [];
    do {
        let response = (urlNext !== null) ? await fetch(urlNext): await fetch(url);
        data = await response.json();
        dataAll = [...dataAll, ...mapDataSpecies(data.results)];
        urlNext = data.next;
        //console.log(dataAll);

    } while (data.next !== null)

    return dataAll;
}

const mapDataSpecies = (data) => {
    let dataMapped = data.map( specie => {
        let object = {
            name: specie.name,
            img: "assets/images/species/" + specie.url.replace("https://swapi.dev/api/species/","").replace("/","") + '.jpg',
            classification: specie.classification,
            lifespan: specie.average_lifespan,
            language: specie.language,
            urlDetail: specie.url
        }

        return object;
    });

    return dataMapped;
}