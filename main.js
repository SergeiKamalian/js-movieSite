const API_KEY = 'be0ec3e6-dd5a-4585-b29d-19215090c7d7'
const API_TOP20 = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1'
const API_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const API_ACTIVE = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
const API_ACTORS = 'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId='
let cardimg = document.querySelector('.card_img')
let loader = document.querySelector('.loader_div')
// ============================ SLIDER ============================

let sliderPlus = document.querySelector('.slider_right');
let sliderMinus = document.querySelector('.slider_left');
let sliderImg = document.querySelector('.cards_slider_items')
let allMovies = [];
let count = 0;
let movieInfo = document.querySelector('.movie_information')
let body = document.querySelector('body')

sliderPlus.addEventListener('click', () => {
    if (count <= 7) {
        count++
        sliderImg.style.transform = `translateX(-${count * 307}px)`
    } else {
        sliderImg.style.transform = `translateX(0%)`
        count = 0
    }
})
sliderMinus.addEventListener('click', () => {
    if (count == 0) {
        sliderImg.style.transform = `translateX(-2456px)`
        count = 8;
    } else {
        count--;
        sliderImg.style.transform = `translateX(-${count * 307}px)`
        // console.log(count + '-');
    }
})

let popularData;
async function getData(url) {
    popularData = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    return popularData.data.films
}
async function getActive(url) {
    activeData = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        }
    })
    return activeData
}


// ====================== SCHEME TOP MOVIES ======================

async function sprintPopularMovies() {
    try {
        let films = await getData(API_TOP20)
        // console.log(films);

        let title = '';
        let str;
        let img;
        films.forEach((i, index) => {
            if (sliderImg.children.length < 12) {
                if (i.nameRu.split('').length > 18) {
                    str = i.nameRu.slice(0, 18).split('');
                    title = str.concat('...').join('')
                } else {
                    title = i.nameRu;
                }
                sliderImg.insertAdjacentHTML('beforeend', `
                <div class="card" data-value="${i.filmId}">
                    <div class="card_img" style="background-image: url(${i.posterUrlPreview})">
                        <div class="watch"><i class='bx bx-play-circle'></i></div> 
                    </div>
                    <span class="card_title">${title}</span>
                    <span class="card_country">${i.year}</span>
                    <div class="stars">
                        <i class='bx bxs-star'></i>
                        <span>${i.rating}</span>
                    </div>
                </div>                                  
            `)
            }
        })
        // try {
















        // ====================== SCHEME INFO MOVIE ======================
        allMovies = document.querySelectorAll('.card')
        // console.log(allMovies);
        allMovies.forEach(i => {

            i.addEventListener('click', async () => {
                loader.hidden = false;
                movieId = i.getAttribute('data-value')
                console.log(movieId);
                let activeMovieData = await getActive(API_ACTIVE + movieId)

                sprintActiveMovie(activeMovieData.data)
                mainAll.hidden = true;
                movieInfo.hidden = false;


            })
        })















    } catch {
        console.log(1);
    }

}
sprintPopularMovies()

async function sprintActiveMovie(arr) {
    console.log(arr);
    let genresText = '';
    Array.from(arr.genres).forEach((i, o) => {
        if (o < 3) {
            console.log(o);
            console.log(i.genre);
            genresText += i.genre + ', '
        }

    })
    let videoMovie = await getActive(API_ACTIVE + movieId + '/videos')
    // console.log(videoMovie);
    let genresStr = genresText.substring(0, genresText.length - 2)
    // console.log(genresStr);
    let activeMovieStaff = await getActive(API_ACTORS + movieId)
    // console.log(activeMovieStaff.data[0].nameRu);
    let limit;
    if (arr.ratingAgeLimits != null) {
        limit = arr.ratingAgeLimits.substr(3)
    }

    // console.log(arr.genres.for);
    movieInfo.children[0].innerHTML = `
    
    <div class="movie_image_images">
                    <div class="movie_ava">
                        <img src="${arr.posterUrl}" alt="" class="movie_ava_img">
                    </div>
                    <span class="gif_images">Кадры из фильма:</span>
                    <div class="movie_info_imgs_slider"></div>
                </div>
                <div class="movie_info_text">
                    <span class="movie_info_title">${arr.nameRu}</span>
                    <span class="about_movie">О фильме:</span>
                    <div class="movie_info_item">
                        <span class="info_item_title">Год производства:</span>
                        <span class="info_item_info">${arr.year}</span>
                    </div>
                    <div class="movie_info_item">
                        <span class="info_item_title">Страна:</span>
                        <span class="info_item_info">${arr.countries[0].country}</span>
                    </div>
                    <div class="movie_info_item">
                        <span class="info_item_title">Жанр:</span>
                        <span class="info_item_info">${genresStr}</span>
                    </div>
                    <div class="movie_info_item">
                        <span class="info_item_title">Режиссер:</span>
                        <span class="info_item_info">${activeMovieStaff.data[0].nameRu}</span>
                    </div>
                    <div class="movie_info_item">
                        <span class="info_item_title">Начало:</span>
                        <span class="info_item_info">${arr.startYear}</span>
                    </div>
                    <div class="movie_info_item">
                        <span class="info_item_title">Возраст:</span>
                        <span class="info_item_info">${limit}+</span>
                    </div>
                    <span class="about_movie">Награды:</span>
                    <div class="awards">
                    </div>
                    <span class="about_movie">Похожые фильмы:</span>
                    <div class="similars_movies">
                    </div>
                </div>
                <div class="movie_stars_actors">
                    <div class="movie_info_stars">
                        <i class='bx bxs-star'></i>
                        <span>${arr.ratingKinopoisk}</span>
                    </div>
                    <span class="countReview">${arr.ratingKinopoiskVoteCount} оценок</span>
                    <div class="actors_title">В главных ролях:</div>
                    <div class="info_actors">
                    </div>
                </div>

        `
    // награды
    let activeAwards = await getActive(API_ACTIVE + movieId + '/awards')
    let awardsDiv = document.querySelector('.awards')
    let awardsArray = activeAwards.data.items;
    if (activeAwards.data.items != []) {
        // console.log(awardsArray.persons);
        awardsArray.forEach((i, o) => {
            if (o < 5) {
                // console.log(i.persons[0]);
                // console.log(i.persons);
                awardsDiv.insertAdjacentHTML('beforeend', ` 
                    <div class="award">
                        <div class="award_name">${i.name}</div>
                        <div class="award_year">${i.year} г.</div>
                    </div>
                    `)
            }
        })
    }
    // актеры

    let infoActors = document.querySelector('.info_actors')
    let activeActors = []
    console.log(activeMovieStaff.data);
    activeMovieStaff.data.forEach((i, o) => {
        if (i.professionKey == "ACTOR") {
            if (activeActors.length < 10) {
                activeActors.push(i)
            }
        }
    })
    activeActors.forEach(i => {
        infoActors.insertAdjacentHTML('beforeend', ` 
                <div class="actor_item">${i.nameRu}</div>
            ` )
    })

    // похожые фильмы

    let similarsMovies = await getActive(API_ACTIVE + movieId + '/similars')
    let similActive = [];
    let similDiv = document.querySelector('.similars_movies')
    similarsMovies.data.items.forEach((i, o) => {
        if (similActive.length < 4) {
            similActive.push(i)
        }
    })
    similActive.forEach(i => {
        similDiv.insertAdjacentHTML('beforeend', `
            <div class="simi_movies_item">
                <div class="simi_movie_img">
                    <img src="${i.posterUrl}" alt="" class="simi_img">
                </div>
                <span class="simi_title">${i.nameRu}</span>
            </div>
        `)
    })
    console.log(similActive);

    // images 
    let activeImgs = await getActive(API_ACTIVE + movieId + '/images?type=STILL&page=1')
    let imgsActive = activeImgs.data.items;
    let imgDiv = document.querySelector('.movie_info_imgs_slider');
    imgsActive.forEach((i, o) => {
        setTimeout(() => {
            let img = 'url(' + `'` + `${i.imageUrl}` + `')`
            console.log(img);
            // console.log(img);
            // console.log(i.imageUrl);
            imgDiv.style.background = img;
            imgDiv.style.backgroundSize = 'cover';
        }, o * 5000)
    })
    console.log(imgDiv);
    

    loader.hidden = true;
}




async function getOnlyMovie(active) {
    let activeMovie = await getData(API_ACTIVE + movieId)
    // console.log(activeMovie);
}

// ====================== SCHEME SEARCH ======================
let searchInput = document.querySelector('.search_input');
let searchBtn = document.querySelector('.search_btn');
let mainAll = document.querySelector('.main_all');
let searchMenu = document.querySelector('.main_search')
let searchList = document.querySelector('.search_list')
let searchContent = document.querySelector('.search_content')
let movieId;

async function sprintSearchMovies() {
    try {
        loader.hidden = false;
        mainAll.hidden = true;
        if (searchInput.value) {
            mainAll.hidden = true;
            movieInfo.hidden = true;
            searchMenu.hidden = false;
            searchList.innerHTML = '';
            let films = await getData(API_SEARCH + searchInput.value)
            console.log(films);
            let title = '';
            let str;
            let img;
            console.log(films);
            films.forEach((i, index) => {
                if (i.nameRu.split('').length > 18) {
                    str = i.nameRu.slice(0, 18).split('');
                    title = str.concat('...').join('')
                } else {
                    title = i.nameRu;
                }
                console.log(i);
                searchList.insertAdjacentHTML('beforeend', `
                        <div class="card card_margin" data-value="${i.filmId}">
                            <div class="card_img" style="background-image: url(${i.posterUrlPreview})">
                                <div class="watch"><i class='bx bx-play-circle'></i></div> 
                            </div>
                            <span class="card_title">${title}</span>
                            <span class="card_country">${i.year}</span>
                            <div class="stars">
                                <i class='bx bxs-star'></i>
                                <span>${i.rating}</span>
                            </div>
                        </div>                                  
            `)
            }
            )
        } else {
            searchContent.classList.add('search_error')
            setTimeout(() => {
                searchContent.classList.remove('search_error')
            }, 300)
        }
        // Array.from(searchList.children).forEach(i => {
        //     allMovies.push(i)
        // })
    } catch {
        console.log(2);
    } finally {
        loader.hidden = true;
        searchInput.value = ''
    }




    allMovies = document.querySelectorAll('.card')
    // console.log(allMovies);
    allMovies.forEach(i => {

        i.addEventListener('click', async () => {
            loader.hidden = false;
            body.classList.add('overflow')
            movieId = i.getAttribute('data-value')
            console.log(movieId);
            let activeMovieData = await getActive(API_ACTIVE + movieId)

            sprintActiveMovie(activeMovieData.data)
            
            mainAll.hidden = true;
            movieInfo.hidden = false;
            searchMenu.hidden = true;
            body.classList.remove('overflow')
        })
    })

}
searchBtn.addEventListener('click', sprintSearchMovies)