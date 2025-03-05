const API_KEY="16eb4ec8d87cc60175f397736c2b1143"
const image_Path="https://image.tmdb.org/t/p/w1280"
let input=document.querySelector(".search input")
let button=document.querySelector(".search button")
const mainGridTitle=document.querySelector(".movies-container h1")
const mainGrid=document.querySelector(".movies-container .movies-grid")
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
return ` <div class="card" data-id=${movie.id}>
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
async function getMovieDetails(movieID){
    const response = await fetch(`https:api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
    const data=await response.json()
    console.log(data,"datadata")
    return data
}

async function showPopUp(card){
    console.log("clicked POPUP",card)
    popupcontainer.classList.add("show_pop_up")
    let movieID=card.getAttribute("data-id")
    console.log(movieID,"movieIDmovieID")
    const movieData=await getMovieDetails(movieID)
}



button.addEventListener("click",addSearchMoviesToDOM)
