const printFilms = () => {
    mainContainer.innerHTML = "";
    getFilms().then(response => {
        let filmsCards = formatFilmsCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">FILMS</h3>
                <section class="section__container">
                    ${filmsCards}
                </section>
            </section>
        `;
        addEventsToFilmLinks(response);
    });
}

const formatFilmsCards = (films) => {
    let templateFilms = films.map (film => {
        return `
            <div class="card">
                <h4 class="card__title"> ${film.title} </h4>
                <img class="card__img" src="${film.img}">
                <div class="card__info-container">
                    <p class="card__info-title"> EPISODE </p>
                    <p class="card__info"> ${film.episode} </p>
                    <p class="card__info-title"> DIRECTOR </p>
                    <p class="card__info"> ${film.director} </p>
                    <p class="card__info-title"> DATE </p>
                    <p class="card__info"> ${film.date}1 </p>
                    <a class="card__link" href="#"> +MORE DETAILS </a>
                </div>
            </div> 
        `
    }).join('');

    return templateFilms;

}

const addEventsToFilmLinks = (films) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('FILMS', films[i].urlDetail);
        })
    });
}


const getFilms = async () => {
    let url = URL_BASE + "/films/";
    let response = await fetch(url);
    let data = await response.json();
    data = mapDataFilms(data.results);
    return data;
}

const mapDataFilms = (data) => {
    let dataMapped = data.map( film => {
        let object = {
            title: film.title,
            img: "assets/images/films/" + film.url.replace("https://swapi.dev/api/films/","").replace("/","") + '.jpg',
            episode: getRomanNumber(film.episode_id),
            director: film.director,
            date:film.release_date,
            urlDetail: film.url
        }

        return object;
    });

    return dataMapped;
}








    /*
    mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">FILMS</h3>
            <section class="section__container">

                
                <div class="card">
                    <h4 class="card__title"> LA AMENAZA FANTASMA </h4>
                    <img class="card__img" src="../assets/images/films/1.jpg">
                    <div class="card__info-container">
                        <p class="card__info-title"> EPISODE </p>
                        <p class="card__info"> III </p>
                        <p class="card__info-title"> DIRECTOR </p>
                        <p class="card__info"> Geroge Lucas </p>
                        <p class="card__info-title"> DATE </p>
                        <p class="card__info"> 1977-05-01 </p>
                        <a class="card__link" href="#"> +MORE DETAILS </a>
                    </div>
                </div> 

                <div class="card">
                    <h4 class="card__title"> LA AMENAZA FANTASMA </h4>
                    <img class="card__img" src="../assets/images/films/1.jpg">
                    <div class="card__info-container">
                        <p class="card__info-title"> EPISODE </p>
                        <p class="card__info"> III </p>
                        <p class="card__info-title"> DIRECTOR </p>
                        <p class="card__info"> Geroge Lucas </p>
                        <p class="card__info-title"> DATE </p>
                        <p class="card__info"> 1977-05-01 </p>
                        <a class="card__link" href="#"> +MORE DETAILS </a>
                    </div>
                </div> 

                <div class="card">
                    <h4 class="card__title"> LA AMENAZA FANTASMA </h4>
                    <img class="card__img" src="../assets/images/films/1.jpg">
                    <div class="card__info-container">
                        <p class="card__info-title"> EPISODE </p>
                        <p class="card__info"> III </p>
                        <p class="card__info-title"> DIRECTOR </p>
                        <p class="card__info"> Geroge Lucas </p>
                        <p class="card__info-title"> DATE </p>
                        <p class="card__info"> 1977-05-01 </p>
                        <a class="card__link" href="#"> +MORE DETAILS </a>
                    </div>
                </div> 
            </section>
        </section>
    `;
    */