const printStarships = () => {
    mainContainer.innerHTML = "";
    getStarships().then(response => {
        let starshipsCards = formatStarshipsCards(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">STARSHIPS</h3>
                <section class="section__container">
                    ${starshipsCards}
                </section>
            </section>
        `;
        addEventsToStarshipsLinks(response);
    });
}

const formatStarshipsCards = (starships) => {
    let templateStarships = starships.map(starship => {
        return `
            <div class="card">
                <h4 class="card__title"> ${starship.name} </h4>
                <img class="card__img" src="${starship.img}">
                <div class="card__info-container">
                    <p class="card__info-title"> CREW </p>
                    <p class="card__info"> ${starship.crew} </p>
                    <p class="card__info-title"> LENGTH </p>
                    <p class="card__info"> ${starship.length} </p>
                    <p class="card__info-title"> PASSENGERS </p>
                    <p class="card__info"> ${starship.passengers}1 </p>
                    <a class="card__link" href="#"> +MORE DETAILS </a>
                </div>
            </div> 
        `
    }).join('');

    return templateStarships;

}

const addEventsToStarshipsLinks = (starships) => {
    let cardLinks = [...document.getElementsByClassName('card__link')];
    cardLinks.forEach((element, i) => {
        element.addEventListener('click', () => {
            printPage('STARSHIPS', starships[i].urlDetail);
        })
    });
}


const getStarships = async () => {
    let url = URL_BASE + "/starships/";
    
    let urlNext = null;
    let dataAll = [];
    do {
        let response = (urlNext !== null) ? await fetch(urlNext): await fetch(url);
        data = await response.json();
        dataAll = [...dataAll, ...mapDataStarships(data.results)];
        urlNext = data.next;
        //console.log(dataAll);

    } while (data.next !== null)

    return dataAll;
}

const mapDataStarships = (data) => {
    let dataMapped = data.map( starship => {
        let object = {
            name: starship.name,
            img: "assets/images/starships/" + starship.url.replace("https://swapi.dev/api/starships/","").replace("/","") + '.jpg',
            crew: starship.crew,
            length: starship.length,
            passengers: starship.passengers,
            urlDetail: starship.url
        }

        return object;
    });

    return dataMapped;
}