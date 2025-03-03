const API_KEY="16eb4ec8d87cc60175f397736c2b1143"
const image_Path="https://image.tmdb.org/t/p/w1280"
let input=document.querySelector(".search input")
let button=document.querySelector(".search button")
const mainGridTitle=document.querySelector(".movies-container h1")
const mainGrid=document.querySelector(".movies-container .movies-grid")
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
}


button.addEventListener("click",addSearchMoviesToDOM)