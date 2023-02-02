const printDetailStarship = (url) => {
    getStarship(url).then(response => {
        let starshipDetail = formatStarshipDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">STARSHIP</h3>
                <section class="section__container">
                    ${starshipDetail}
                </section>
            </section>

        `;
        addEventListenerToOptions('films', response.films);
    });
}

const getStarship = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataStarship(data);

    return data;
}


const formatDataStarship= (data) => {
    let dataFormated = {
        name: data.name.toUpperCase(),
        img: "assets/images/starships/" + data.url.replace("https://swapi.dev/api/starships/","").replace("/","") + '.jpg',
        model: data.model,
        class: data.class,
        passengers: data.passengers,
        capacity: data.cargo_capacity,
        crew: data.crew,
        films: mapOptions(data.films, 'films'),
    }

    return dataFormated;
}

const formatStarshipDetail = (starship) => {
    let films = formatOptions('films', starship.films);
    return `
        <div class="detail detail--starship">
            <img class="detail__img" src="${starship.img}">
            <div class="detail__info-container">
                <h4 class="detail__title">${starship.name}</h4>
                <p class="detail__info-title">MODEL</p>
                <p class="detail__info">${starship.model}</p>
                <p class="detail__info-title">CLASS</p>
                <p class="detail__info">${starship.class}</p>
                <p class="detail__info-title">PASSENGERS</p>
                <p class="detail__info">${starship.passengers}</p>
                <p class="detail__info-title">CARGO CAPACITY</p>
                <p class="detail__info">${starship.capacity}</p>
                <p class="detail__info-title">CREW</p>
                <p class="detail__info">${starship.crew}</p>
            </div>
            <div class="detail__options-container">
                ${films}
            </div>
        </div>
    `;
}


