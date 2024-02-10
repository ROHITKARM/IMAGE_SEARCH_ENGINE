const acesskey = "G90apYV08erLaJJEkSopxW720uCwT8vQ7ZlIjggSOsM";

const formEl = document.querySelector("form");
const searchIdEl = document.getElementById("search-id");
const searchResultsEl = document.querySelector(".search-results")
const showMoreButton = document.getElementById("show-more-btn")

let inputData = "";
let page = 1;
async function searchImages(){
  inputData = searchIdEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${acesskey}`
  console.log(url);
  const responce = await fetch(url);
  const data = await responce.json();
//   console.log(data);

  if(page === 1){
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result)=>{

    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("search-result")
    const image = document.createElement("img")
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a")
    imageLink.href = result.links.html
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description;
    // console.log(result);
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  })

  page++;
// console.log(page)
  if(page > 1){
    showMoreButton.style.display = "block";
  }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})
showMoreButton.addEventListener("click",()=>{

    searchImages();
})