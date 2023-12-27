const darkModeToggle = document.querySelector('.darkMode i');
const kategoriList = document.querySelector('.kategori-list');
const filmCards = document.querySelector(".trending-films .film-cards");
const filmCardsRecommended = document.querySelector(".direkomendasikan .film-cards-recommended");
const page1 = document.querySelector(".film-cards .page1");
const pageRecommended1 = document.querySelector(".film-cards-recommended .page1");
const showMore = document.querySelector(".showMore");
const showMoreRecommended = document.querySelector(".showMoreRecommended")
const containerMovie = document.querySelector(".containerMovie");
const inputMovie = document.querySelector(".inputMovie");
const search = document.querySelector(".search");
const searchOn = document.querySelector(".navbar .top .searchOn");
const searchMovie = document.querySelector(".searchMovie");
const loading = document.querySelector(".loading");
const hamburger = document.querySelector(".hamburger");
const navGenre = document.querySelector(".navbar .bottom");
const footer = document.querySelector(".footer");
const footerLinks = document.querySelectorAll(".footer .footer-links a");
const footerSocial = document.querySelectorAll(".footer .footer-social a");
const heroSection = document.querySelector(".hero-section")

const baseUrl = "https://github.com/asrilHidayat404/UAS/tree/main/assets/";
heroSection.style.backgroundImage = `url(${baseUrl}hero1.jpg)`;
let heroCount = 0;

setInterval(() => {
  heroCount++;
  heroSection.style.backgroundImage = `url(${baseUrl}hero${heroCount}.jpg)`;

  if (heroCount === 5) {
    heroCount = 0;
  }
}, 10000);

hamburger.addEventListener("click", ()=> {
  navGenre.classList.toggle("on");
  search.classList.contains("on") ? search.classList.remove("on") : ''
})

searchOn.addEventListener("click", ()=> {
  search.classList.toggle("on");
  navGenre.classList.contains("on") ? navGenre.classList.remove("on") : ''
})


loading.style.display = 'flex';

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0
  });
}

searchMovie.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputMovie.value === '') {
    return;
  }
  const search = new Search();
  search.getDatas();
  loading.style.display = 'flex';
})

document.querySelector(".logo").addEventListener("click", () => location.reload());


let pageResults = 1;
let pageResultsRecommended = 1;
darkModeToggle.addEventListener('click', () => {
  const navbar = document.querySelector(".navbar");
  const filmCards = document.querySelectorAll(".film-card");
  const tHeader1 = document.querySelector(".trending-films h2")
  const tHeader2 = document.querySelector(".direkomendasikan h2")
  if (darkModeToggle.className == "fa fa-moon-o"){
    darkModeToggle.setAttribute("class","fa fa-sun-o");
    navbar.style.backgroundColor = '#F11A7B';
    searchMovie.children[0].style.color = '#eaeaea';
    searchOn.style.color = '#eaeaea';
    navbar.style.color = '#eaeaea';
    containerMovie.style.backgroundColor = '#171010'
    navGenre.style.backgroundColor= "#982176"
    // search.style.backgroundColor= "#982176"
    search.classList.add("darkOn")
    search.classList.remove("lightOn")
    hamburger.children[0].style.backgroundColor= "#eaeaea"
    hamburger.children[1].style.backgroundColor= "#eaeaea"
    hamburger.children[2].style.backgroundColor= "#eaeaea"
    tHeader1.style.color = '#eaeaea'
    tHeader2.style.color = '#eaeaea'
    filmCards.forEach(film => film.style.boxShadow = "0px 0px 2px 2px #eaeaea")
    footer.style.backgroundColor= "#F11A7B"
    footer.style.color = '#eaeaea';
    footerLinks.forEach(fs => fs.style.color = "#eaeaea")
    footerSocial.forEach(fs => fs.style.color = "#eaeaea")
  } else {
    containerMovie.style.backgroundColor = '#eaeaea'
    darkModeToggle.setAttribute("class","fa fa-moon-o")
        navbar.style.backgroundColor = '#1cb0f6'
    searchMovie.children[0].style.color = '#282828'
    searchOn.style.color = '#282828';
    navbar.style.color = '#282828'
    navGenre.style.backgroundColor= "#a1d6e2"
    // search.style.backgroundColor= "#a1d6e2"
    search.classList.add("lightOn")
    search.classList.remove("darkOn")
    hamburger.children[0].style.backgroundColor= "#282828"
    hamburger.children[1].style.backgroundColor= "#282828"
    hamburger.children[2].style.backgroundColor= "#282828"
    filmCards.forEach(film => film.style.boxShadow= "0px 0px 2px 2px #282828")
    tHeader1.style.color = '#282828'
    tHeader2.style.color = '#282828'
    footer.style.backgroundColor= "#1cb0f6"
    footer.style.color = '#282828';
    footerLinks.forEach(fs => fs.style.color = "#282828")
    footerSocial.forEach(fs => fs.style.color = "#282828")
  }
});


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 43a84b44b9e916d44359dd17e355faf5'
  }
};

class Search {
  constructor() {
    this.apiUrl = "https://api.themoviedb.org/3/search/movie?query="+inputMovie.value+"&api_key=43a84b44b9e916d44359dd17e355faf5"
  }
  getDatas() {
    return fetch(this.apiUrl)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(results => this.manage(results))
      .finally(()=> loading.style.display = 'none')
  }
  manage ({results}) {
    console.log(results)
    let card = ''
    results.forEach(result => card += this.showCard(result))
    const searchResults = `<div class="resultInfo" style="font-size: .9em">Search results from: <span class="userInput">${inputMovie.value}</span></div>
    <div class="searchResult">${card}</div>`
    containerMovie.innerHTML = searchResults
  }
  showCard ({title, genre_ids, release_date, poster_path, id, overview, popularity, backdrop_path, original_title, vote_average}) {
    const year = new Releasedbj(release_date).result().year
    return `
    <div class="film-card">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" class="poster">
          <div class="rate">
            <div><img src="assets/star2.png" alt="" class="star">
            <p class="score">${vote_average}</p>
            </div>
          </div>
          <div class="movieTitle"
              data-movieid=${id}
              data-genre=${genre_ids}
              data-originaltitle = "${original_title}"
              data-releasedate = ${release_date}
              data-overview = "${overview}"
              data-backdroppath = ${backdrop_path}
              data-posterpath = ${poster_path}
          >${title} (${year})</div>
        </div>
    `
  }
}

class Trending {
  constructor(pageIndex, pageElements) {
    this.pageIndex = pageIndex
    this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=43a84b44b9e916d44359dd17e355faf5&certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+this.pageIndex
    this.pageElements = pageElements
  }
  getDatas() {
    return fetch(this.apiUrl, options)
      .then(response => response.json())
      .finally(()=>loading.style.display = "none")
      .then(response => {
        console.log(response)
        this.manage(response)
    }) 
  }
  manage ({results}) {
    let card = ''
    results.forEach(result => card += this.showCard(result))
    if (this.pageIndex < 2) {
        return page1.innerHTML = card
    } else {
        filmCards.appendChild(this.pageElements)
        this.pageElements.innerHTML = card
    }
  }
  showCard ({title, genre_ids, release_date, poster_path, id, overview, popularity, backdrop_path, original_title, vote_average}) {
    const year = new Releasedbj(release_date).result().year
    return `
    <div class="film-card">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" class="poster">
          <div class="rate">
            <div><img src="assets/star2.png" alt="" class="star">
            <p class="score">${vote_average}</p>
            </div>
          </div>
          <div class="movieTitle"
              data-movieid=${id}
              data-genre=${genre_ids}
              data-originaltitle = "${original_title}"
              data-releasedate = ${release_date}
              data-overview = "${overview}"
              data-backdroppath = ${backdrop_path}
              data-posterpath = ${poster_path}
          >${title} (${year})</div>
        </div>
    `
  }
}

const trending1 = new Trending(pageResults)
trending1.getDatas()

class Recommended {
  constructor(pageIndex, pageElements) {
    this.pageIndex = pageIndex
    this.apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=43a84b44b9e916d44359dd17e355faf5&certification_country=US&certification.lte=G&sort_by=popularity.desc&page='+this.pageIndex
    this.pageElements = pageElements
  }
  getDatas() {
    return fetch(this.apiUrl, options)
      .then(response => response.json())
      .finally(()=>loading.style.display = "none")
      .then(response => {
        console.log(response)
        this.manage(response)
    }) 
  }
  manage ({results}) {
    let card = ''
    results.forEach(result => card += this.showCard(result))
    if (this.pageIndex < 2) {
        return pageRecommended1.innerHTML = card
    } else {
        filmCardsRecommended.appendChild(this.pageElements)
        this.pageElements.innerHTML = card
    }
  }
  showCard ({title, genre_ids, release_date, poster_path, id, overview, popularity, backdrop_path, original_title, vote_average}) {
    const year = new Releasedbj(release_date).result().year
    return `
    <div class="film-card">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" class="poster">
          <div class="rate">
            <div><img src="assets/star2.png" alt="" class="star">
            <p class="score">${vote_average}</p>
            </div>
          </div>
          <div class="movieTitle"
              data-movieid=${id}
              data-genre=${genre_ids}
              data-originaltitle = "${original_title}"
              data-releasedate = ${release_date}
              data-overview = "${overview}"
              data-backdroppath = ${backdrop_path}
              data-posterpath = ${poster_path}
          >${title} (${year})</div>
        </div>
    `
  }
}

const recommended1 = new Recommended(pageResultsRecommended)
recommended1.getDatas()


class MovieDetail {
  constructor(movieId, genre, backdroppath, originaltitle, releasedate, overview, posterpath){
    this.id = movieId
    this.genre = genre
    this.url = "https://api.themoviedb.org/3/movie/"+movieId+"/credits?api_key=43a84b44b9e916d44359dd17e355faf5"
    this.durationURL = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=43a84b44b9e916d44359dd17e355faf5"
    this.genreURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=43a84b44b9e916d44359dd17e355faf5&language=en-US"
    this.backdroppath = backdroppath
    this.originaltitle = originaltitle
    this.releasedate = releasedate
    this.overview = overview
    this.posterpath = posterpath
  }
  async getMovieDetail () {
    const duration = await fetch(this.durationURL, options)
        .then(results => results.json())
        .then(result => result)
    const getGenre = await fetch(this.genreURL, options)
      .then(response => response.json())
      .then(results => {
        const genreArray = this.genre.split(",").map(Number);
        const resultGenres = genreArray.map(genreValue => {
          return results.genres.find(genre => genre.id === genreValue);
        });
        return resultGenres;
      });
    return fetch(this.url, options)
        .then(response => response.json())
        .then(results => this.manageDetail(results, getGenre, duration.runtime)) 
        .finally(() => {
          scrollToTop()
          loading.style.display = 'none'
        })
  }

  manageDetail ({cast, crew}, getGenre, duration) {
    let genre = []
    getGenre.forEach(genres => genre.push(genres.name))

    let cardDetail = ''
    cast.forEach(cast => cardDetail += this.showDetail(cast))

    const link = `<div onclick="getTrailerURL(this, ${this.id})" class="goToYT">Tonton trailer?</div>`
    return containerMovie.innerHTML = `
      <div class="movie_card" id="bright" style="background-image: url(https://image.tmdb.org/t/p/original/${this.backdroppath});">
        <div class="info_section">
          <div class="movie_header">
            <div class="moviePoster">
              <div class="poster">
                <img src="https://image.tmdb.org/t/p/original/${this.posterpath}" width="200px" />
              </div>
              <div class="detail">
                <div class="title-date">
                  <h1>${this.originaltitle}</h1>
                  <h4>${this.releasedate}</h4>
                </div>
                <div class="duration-genre">
                  <span class="minutes">${duration} min</span>
                  <p class="type">${genre.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="movie_desc">
            <p class="text">${this.overview}</p>
          </div>
        </div>
        <div class="blur_back bright_back"></div>
    </div>
        <div class="blur_back ave_back"></div>

    ${link}

    <div class="cast">
      <h1>Actor and Actrees</h1>
      <div class="actorList">
        ${cardDetail}
      </div>
    </div>
    `
  }
  showDetail ({original_name, character, profile_path}) {
    return `
        <a href="https://id.wikipedia.org/wiki/${original_name}" target="_blank">
        <div class="actor_card">
          <div class="actorImg">
            <img class="actor_image" src="https://image.tmdb.org/t/p/original/${profile_path}" alt="">
          </div>
          <div class="actor_info">
            <span class="actor_name">${original_name}</span>
            <span class="as">as</span>
            <span class="actor_role">${character}</span>
          </div>
        </div>
       </a>
    `
  }
}


class Trailer {
  constructor (id) {
    this.id = id
    this.key = ''
  }
  async getTrailer() {
    return await fetch("https://api.themoviedb.org/3/movie/"+this.id+"?api_key=43a84b44b9e916d44359dd17e355faf5&append_to_response=videos")
      .then(result => result.json())
      .then(result => {
        this.manage(result.videos)
      })
  }
  manage ({results}) {
    const result = results.map(result => result)
    const trailers = result.filter(item => item.type === "Trailer" && (item.name.includes("Teaser Trailer") || item.name.includes("Official Trailer")|| item.name.includes("Main Trailer"))) 
    console.log(trailers)
    if (trailers.length < 1) {
     alert("Trailer tidak tersedia")
     return this.key = ''
    }
    return this.key = trailers[0].key
  }
  result() {
     return this.key
  }
}

async function getTrailerURL (e, id) {
  console.log(e)
  const trailer = new Trailer(id)
  await trailer.getTrailer()
  const key = trailer.result()
  if (key == '') {
     return
  } else {
    // Tambahkan elemen iframe untuk menampilkan pemutar video
    const iframeElement = document.createElement('iframe');
    iframeElement.width = '80%';
    iframeElement.height = '415';
    iframeElement.src = `https://www.youtube.com/embed/${key}?autoplay=1`;
    iframeElement.frameBorder = '0';
    iframeElement.allowFullscreen = true;

    // Gantikan elemen HTML yang sebelumnya
    e.innerHTML = '';
    e.setAttribute("class", "videoOn")
    e.appendChild(iframeElement);
    console.log(e)
  }
}


let pageResultsMovieOfGenre = 1
const genreList = document.querySelectorAll(".genreList .genre")
genreList.forEach(genres => {
  genres.addEventListener("click", genre => {
    loading.style.display = "flex"
    const movieOfGenre = new MovieOfGenre(1, undefined,genre.target)
    movieOfGenre.getDatas()
  })
})

class MovieOfGenre {
  constructor(pageIndex, pageElements, genreId) {
    this.pageIndex = pageIndex
    this.genre = genreId.id
    this.namaKategori = genreId.textContent
    this.apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=43a84b44b9e916d44359dd17e355faf5&with_genres=" + this.genre + "&certification_country=US&certification.lte=G&sort_by=popularity.desc&page=" + this.pageIndex
    this.pageElements = pageElements
  }
  getDatas() {
    return fetch(this.apiUrl, options)
      .then(response => response.json())
      .finally(()=>loading.style.display = "none")
      .then(response => {
        console.log(this.apiUrl)
        console.log(this.genre)
        this.manage(response)
    }) 
  }
  manage ({results}) {
    let card = ''
    console.log(this.genre)
    results.forEach(result => card += this.showCard(result))
    if (this.pageIndex < 2) {
        return containerMovie.innerHTML = `<div class="kategori-films">
      <div class="resultInfo" style="font-size:.9em;">Results of movies by category: <span class="userInput">${this.namaKategori}</span></div>
      <div class="film-item">
        <div class="film-cards-movieOfGenre">
          <div class="page page1">${card}</div>
        </div>
        <button class="btnShow showMoreMovieOfGenre" id=${this.genre}>Show more</button>
      </div>
    </div>`
    } 
    else {
        const filmCards = document.querySelector(".film-cards-movieOfGenre")
        filmCards.appendChild(this.pageElements)
        this.pageElements.innerHTML = card
    }
  }
  showCard ({title, genre_ids, release_date, poster_path, id, overview, popularity, backdrop_path, original_title, vote_average}) {
    const year = new Releasedbj(release_date).result().year
    return `
    <div class="film-card">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="" class="poster">
          <div class="rate">
            <div><img src="assets/star2.png" alt="" class="star">
            <p class="score">${vote_average}</p>
            </div>
          </div>
          <div class="movieTitle"
              data-movieid=${id}
              data-genre=${genre_ids}
              data-originaltitle = "${original_title}"
              data-releasedate = ${release_date}
              data-overview = "${overview}"
              data-backdroppath = ${backdrop_path}
              data-posterpath = ${poster_path}
          >${title} (${year})</div>
        </div>
    `
  }
}

document.addEventListener("click", e => {
  if(e.target.classList.contains("showMoreMovieOfGenre")){
      loading.style.display = "flex"
      pageResultsMovieOfGenre++
      let movieOfGenre = `movieOfGenre${pageResultsMovieOfGenre}`
      const pages = document.createElement("div")
      console.log(e.target.className)
      console.log(e.target.id)
      pages.setAttribute("class", `page page${pageResultsMovieOfGenre}`)
      movieOfGenre = new MovieOfGenre(pageResultsMovieOfGenre, pages, e.target)
      movieOfGenre.getDatas()
  }
})
showMore.addEventListener("click", (e) => {
  loading.style.display = "flex"
  pageResults++
  let trending = `trending${pageResults}`
  const pages = document.createElement("div")
  pages.setAttribute("class", `page page${pageResults}`)
  trending = new Trending(pageResults, pages)
  trending.getDatas()
})
showMoreRecommended.addEventListener("click", (e) => {
  loading.style.display = "flex"
  pageResultsRecommended++
  let recommended = `recommended${pageResultsRecommended}`
  const pages = document.createElement("div")
  pages.setAttribute("class", `page page${pageResultsRecommended}`)
  recommended = new Recommended(pageResultsRecommended, pages)
  recommended.getDatas()
})


document.addEventListener("click", (e)=> {
  if (e.target.classList.contains("movieTitle")){
    loading.style.display = 'flex'
    const movieId = e.target.dataset.movieid
    const genre = e.target.dataset.genre
    const backdroppath = e.target.dataset.backdroppath
    const originaltitle = e.target.dataset.originaltitle
    const releasedate = e.target.dataset.releasedate
    const overview = e.target.dataset.overview
    const posterpath = e.target.dataset.posterpath
    const movieDetail = new MovieDetail(movieId, genre, backdroppath, originaltitle, releasedate, overview, posterpath)
    movieDetail.getMovieDetail()
  } 
})


class Releasedbj {
  constructor (released) {
    this.released = Array.from(released)
    this.releasedObj
  }
  getYear () {
    const released = this.released
    let year = ''
    for(let i = 0; i < (released.length - released.length + 4); i++){
      year += released[i]
    }
    return year
  }
  getMonth () {
    const released = this.released
    let month = ''
    for(let i = (released.length - released.length + 5); i < ((released.length - released.length + 4) +  3); i++){
      month += released[i]
    }
    return month
  }
  getDate () {
    const released = this.released
    let date = ''
    for(let i = (released.length - 2); i < (released.length); i++){
      date += released[i]
    }
    return date
  }
  result () {
    return this.releasedObj = {
      date: this.getDate(),
      month: this.getMonth(),
      year: this.getYear()
    }
  }
}
