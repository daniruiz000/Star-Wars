const printDetailFilm = (url) => {
    getFilm(url).then(response => {
        let filmDetail = formatFilmDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">FILM</h3>
                <section class="section__container">
                    ${filmDetail}
                </section>
            </section>

        `;

        addEventListenerToOptions('characters', response.characters);
        addEventListenerToOptions('planets', response.planets);
        addEventListenerToOptions('starships', response.starships);
        addEventListenerToOptions('species', response.species);

    });
}

const getFilm = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    data = formatDataFilm(data);

    return data;
}


const formatDataFilm = (data) => {
    let dataFormated = {
        title: data.title.toUpperCase(),
        img: "assets/images/films/" + data.url.replace("https://swapi.dev/api/films/","").replace("/","") + '.jpg',
        episode: getRomanNumber(data.episode_id),
        director: data.director,
        date: data.release_date,
        characters: mapOptions(data.characters, 'characters'),
        planets: mapOptions(data.planets, 'planets'),
        starships: mapOptions(data.starships, 'starships'),
        species:mapOptions(data.species, 'species')

    }

    return dataFormated;
}

const formatFilmDetail = (film) => {
    let characters = formatOptions('characters', film.characters);
    let planets = formatOptions('planets', film.planets);
    let starships = formatOptions('starships', film.starships);
    let species = formatOptions('species', film.species);

    return `
        <div class="detail">
            <img class="detail__img" src="${film.img}">
            <div class="detail__info-container">
                <h4 class="detail__title">${film.title}</h4>
                <p class="detail__info-title">EPISODE</p>
                <p class="detail__info">${film.episode}</p>
                <p class="detail__info-title">DIRECTOR</p>
                <p class="detail__info">${film.director}</p>
                <p class="detail__info-title">DATE</p>
                <p class="detail__info">${film.date}</p>
            </div>
            <div class="detail__options-container">
                ${characters}
                ${planets}
                ${starships}
                ${species}
            </div>
        </div>
    `;
}




    /*
    console.log('Oye he llegado aquí ' + url);
    mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">FILM</h3>
            <section class="section__container">
                <div class="detail">
                    <img class="detail__img" src="../assets/images/films/1.jpg">
                    <div class="detail__info-container">
                        <h4 class="detail__title">LA AMENAZA FANTASMA</h4>
                        <p class="detail__info-title">EPISODE</p>
                        <p class="detail__info">V</p>
                        <p class="detail__info-title">DIRECTOR</p>
                        <p class="detail__info">George Lucas</p>
                        <p class="detail__info-title">DATE</p>
                        <p class="detail__info">19-05-1970</p>
                    </div>
                    <div class="detail__options-container">
                        <p class="detail__options-title">CHARACTERS</p>
                        <div class="detail__img-container">
                            <img class="detail__options-img" src="../assets/images/characters/1.jpg">
                            <img class="detail__options-img" src="../assets/images/characters/2.jpg">
                            <img class="detail__options-img" src="../assets/images/characters/4.jpg">
                            <img class="detail__options-img" src="../assets/images/characters/8.jpg">
                        </div>
                        <p class="detail__options-title">PLANETS</p>
                        <div class="detail__img-container">
                            <img class="detail__options-img" src="../assets/images/planets/3.jpg">
                            <img class="detail__options-img" src="../assets/images/planets/5.jpg">
                            <img class="detail__options-img" src="../assets/images/planets/10.jpg">
                            <img class="detail__options-img" src="../assets/images/planets/15.jpg">
                        </div>
                        <p class="detail__options-title">STARSHIPS</p>
                        <div class="detail__img-container">
                            <img class="detail__options-img" src="../assets/images/starships/3.jpg">
                            <img class="detail__options-img" src="../assets/images/starships/5.jpg">
                            <img class="detail__options-img" src="../assets/images/starships/10.jpg">
                            <img class="detail__options-img" src="../assets/images/starships/15.jpg">
                        </div>
                        <p class="detail__options-title">SPECIES</p>
                        <div class="detail__img-container">
                            <img class="detail__options-img" src="../assets/images/species/1.jpg">
                            <img class="detail__options-img" src="../assets/images/species/2.jpg">
                            <img class="detail__options-img" src="../assets/images/species/4.jpg">
                            <img class="detail__options-img" src="../assets/images/species/8.jpg">
                        </div>
                    </div>
                </div>
            </section>
        </section> 
    `;
    */
