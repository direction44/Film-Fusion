const API_KEY="16eb4ec8d87cc60175f397736c2b1143"
const image_Path="https://image.tmdb.org/t/p/w1280"
let input=document.querySelector(".search input")
let button=document.querySelector(".search button")
const mainGridTitle=document.querySelector(".Favourites h1")
const mainGrid=document.querySelector(".Favourites .movies-grid")
const trendingGrid=document.querySelector(".Tranding .movies-grid")
const popupcontainer=document.querySelector(".popupcontainer")
console.log(input);
console.log(button);

async function getMovieBySearch(search_term){
 let resp=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_term}`)
 let respData=await resp.json()
 return respData.results
}

async function addSearchMoviesToDOM(){
const searchText=input.value
const data=await getMovieBySearch(searchText)
mainGridTitle.innerText="Search Result...."
const resultsArr=data.map((movie)=>{
return `<div class="card" data-id=${movie.id}>
                    <div class="img">
                        <img src=${image_Path+movie.poster_path} alt="">
                    </div>
                    <div class="info">
                        <h2>${movie.title}</h2>
                        <div class="single-info">
                            <span class="rating">Rating:</span>
                            <span class="rating">${movie.vote_average}/10</span>
                        </div>
                        <div class="single-info">
                            <span class="rating">Release Date:</span>
                            <span class="rating">${movie.release_date}</span>
                        </div>
                    </div>
        </div>`
     })
mainGrid.innerHTML=resultsArr.join(" ")
const cards=document.querySelectorAll(".card")
addClickEffectToCard(cards)
}

function addClickEffectToCard(cards){
    cards.forEach(card => {
        card.addEventListener("click",()=>{
            showPopUp(card)
        }) 
  });
}

async function getMovieDetails(movieID){
    const response = await fetch(`https:api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
    const data=await response.json()
    console.log(data,"datadata")
    return data
}
async function getMovieTrailer(movieID){
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`);
    const data=await response.json()
    console.log(data,"Trailer")
    return data.results[0].key
}

async function showPopUp(card){
    popupcontainer.classList.add("show_pop_up")
    let movieID=card.getAttribute("data-id")
    const movieData=await getMovieDetails(movieID)
    console.log(movieData,"movieData")
    const movieTrailer=await getMovieTrailer(movieID)
    popupcontainer.style.background=`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)),
    url(${image_Path+movieData.poster_path})`
    popupcontainer.innerHTML=`<span class="x-icon">&#10006;</span>
        <div class="content">
            <div class="left">
                <div class="poster-img">
                  <img src="${image_Path+movieData.poster_path}" alt="" />
                </div>
                <div class="single-info">
                  <span>Add to favourites :</span>
                  <span class="heart-icon">&#9829;</span>
                </div>
            </div>
            <div class="right">
                <h1>${movieData.title}</h1>
                <h3>${movieData.tagline}</h3>
                <div class="single-info-container">
                  <div class="single-info">
                    <span>Languages :</span>
                    <span>${movieData.spoken_languages[0].name}</span>
                  </div>
                  <div class="single-info">
                    <span>Length :</span>
                    <span>${movieData.runtime} Minutes</span>
                  </div>
                  <div class="single-info">
                    <span>Rating :</span>
                    <span>${movieData.vote_average} / 10</span>
                  </div>
                  <div class="single-info">
                    <span>Budget :</span>
                    <span>$${movieData.budget}</span>
                  </div>
                  <div class="single-info">
                    <span>Release Date</span>
                    <span>${movieData.release_date}</span>
                  </div>
                </div>
      
                <div class="genres">
                  <h2>Genres</h2>
                  <ul>
                    ${
                    movieData.genres.map((e)=>{
                        return `<li>${e.name}</li>`
                    }).join("")
                    }
                  </ul>
                </div>
      
                <div class="overview">
                  <h2>Overview</h2>
                  <p>
                  ${movieData.overview}
                  </p>
                </div>
               
                <div class="trailer">
                  <h2>Trailer</h2>
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/${movieTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-pictur"/>
                </div>
              </div>
        </div>`
    let xIcon=document.querySelector(".x-icon")
    xIcon.addEventListener("click",()=>{
            popupcontainer.classList.remove("show_pop_up")
        })
    let heartIcon=document.querySelector(".heart-icon")
    let moviesArr = JSON.parse(localStorage.getItem("movieIdIs"));
    console.log(moviesArr,"ADIiiiii")
    if(moviesArr)
    {
      moviesArr.forEach((maovieIs)=>{
          console.log(movieID,maovieIs.id,"maovieIs.id")
          if(maovieIs.id==movieID){
             heartIcon.classList.add("change-color")
          }
         }) 
    }
      heartIcon.addEventListener("click",()=>{
            if(heartIcon.classList.contains("change-color"))
            {
                heartIcon.classList.remove("change-color")
            }
            else{
            let moviesArr = JSON.parse(localStorage.getItem("movieIdIs")) || [];
            console.log(moviesArr, "moviesArrmoviesArr");
            if (!Array.isArray(moviesArr)) {
                moviesArr = [];
            }
            if (!moviesArr.some(movie => movie.id === movieData.id)) {
                moviesArr.push(movieData);
            }

            localStorage.setItem("movieIdIs", JSON.stringify(moviesArr));
            heartIcon.classList.add("change-color")
            }
       })       
           
}


button.addEventListener("click",addSearchMoviesToDOM)

async function getTrendingMovies() {
    let response=await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    let respData=await response.json()
    return respData.results
}


async function trendingMoviesToDOM() {
    const data=await getTrendingMovies()
    const displayMovies=data.slice(0,5)
    console.log(displayMovies)
    const resultsArr=displayMovies.map((movie)=>{
        return `<div class="card" data-id=${movie.id}>
                            <div class="img">
                                <img src=${image_Path+movie.poster_path} alt="">
                            </div>
                            <div class="info">
                                <h2>${movie.title}</h2>
                                <div class="single-info">
                                    <span class="rating">Rating:</span>
                                    <span class="rating">${movie.vote_average}/10</span>
                                </div>
                                <div class="single-info">
                                    <span class="rating">Release Date:</span>
                                    <span class="rating">${movie.release_date}</span>
                                </div>
                            </div>
                </div>`
          })
trendingGrid.innerHTML=resultsArr.join(" ")
const cards=document.querySelectorAll(".card")
addClickEffectToCard(cards)
}

async function setFavMoviesInDOM(){
  let allFavmoviesArr = JSON.parse(localStorage.getItem("movieIdIs"));
  console.log(allFavmoviesArr)
  if(allFavmoviesArr){
    const resultsArr=allFavmoviesArr.map((movie)=>{
    return `<div class="card" data-id=${movie.id}>
                        <div class="img">
                            <img src=${image_Path+movie.poster_path} alt="">
                        </div>
                        <div class="info">
                            <h2>${movie.title}</h2>
                            <div class="single-info">
                                <span class="rating">Rating:</span>
                                <span class="rating">${movie.vote_average}/10</span>
                            </div>
                            <div class="single-info">
                                <span class="rating">Release Date:</span>
                                <span class="rating">${movie.release_date}</span>
                            </div>
                        </div>
            </div>`
         })
         mainGrid.innerHTML=resultsArr.join(" ")
         const cards=document.querySelectorAll(".card")
         addClickEffectToCard(cards)
         
  }
}

window.onload=()=>{
  trendingMoviesToDOM()
  setFavMoviesInDOM()
}