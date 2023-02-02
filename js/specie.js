const printDetailSpecie = (url) => {
    getSpecie(url).then(response => {
        let specieDetail = formatSpecieDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">SPECIE</h3>
                <section class="section__container">
                    ${specieDetail}
                </section>
            </section>

        `;
        addEventListenerToOptions('characters', response.characters);
        addEventListenerToOptions('films', response.films);
    });
}

const getSpecie = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataSpecie(data);

    return data;
}


const formatDataSpecie= (data) => {
    let dataFormated = {
        name: data.name.toUpperCase(),
        img: "assets/images/species/" + data.url.replace("https://swapi.dev/api/species/","").replace("/","") + '.jpg',
        classfication: data.classfication,
        lifespan: data.average_lifespan,
        language: data.language,
        films: mapOptions(data.films, 'films'),
        characters: mapOptions(data.people, 'characters')
    }

    return dataFormated;
}

const formatSpecieDetail = (specie) => {
    let films = formatOptions('films', specie.films);
    let characters = formatOptions('characters', specie.characters);

    return `
        <div class="detail">
            <img class="detail__img" src="${specie.img}">
            <div class="detail__info-container">
                <h4 class="detail__title">${specie.name}</h4>
                <p class="detail__info-title">CLASSIFICATION</p>
                <p class="detail__info">${specie.classfication}</p>
                <p class="detail__info-title">LIFESPAN</p>
                <p class="detail__info">${specie.lifespan}</p>
                <p class="detail__info-title">LANGUAGE</p>
                <p class="detail__info">${specie.language}</p>
            </div>
            <div class="detail__options-container">
                ${characters}
                ${films}
            </div>
        </div>
    `;
}


