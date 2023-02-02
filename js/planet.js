const printDetailPlanet = (url) => {
    getPlanet(url).then(response => {
        let planetDetail = formatPlanetDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">PLANET</h3>
                <section class="section__container">
                    ${planetDetail}
                </section>
            </section>

        `;
        addEventListenerToOptions('characters', response.characters);
        addEventListenerToOptions('films', response.films);
    });
}

const getPlanet = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataPlanet(data);

    return data;
}


const formatDataPlanet= (data) => {
    let dataFormated = {
        name: data.name.toUpperCase(),
        img: "assets/images/planets/" + data.url.replace("https://swapi.dev/api/planets/","").replace("/","") + '.jpg',
        population: data.population,
        climate: data.climate.split(',')[0],
        terrain: data.terrain.split(',')[0],
        films: mapOptions(data.films, 'films'),
        characters: mapOptions(data.residents, 'characters')
    }

    return dataFormated;
}

const formatPlanetDetail = (planet) => {
    let films = formatOptions('films', planet.films);
    let characters = formatOptions('characters', planet.characters);

    return `
        <div class="detail">
            <img class="detail__img" src="${planet.img}">
            <div class="detail__info-container">
                <h4 class="detail__title">${planet.name}</h4>
                <p class="detail__info-title">POPULATION</p>
                <p class="detail__info">${planet.population}</p>
                <p class="detail__info-title">CLIMATE</p>
                <p class="detail__info">${planet.climate}</p>
                <p class="detail__info-title">TERRAIN</p>
                <p class="detail__info">${planet.terrain}</p>
            </div>
            <div class="detail__options-container">
                ${characters}
                ${films}
            </div>
        </div>
    `;
}


