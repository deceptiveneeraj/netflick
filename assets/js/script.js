// imports necessary functions and data
import { getMovieInfo, getMultipleMovies} from './collectMovieDetails.js';
import { top10 } from './movieData.js';

// Slider functionality
const path = "assets/img/hero/";
const images = [
  path + "stranger things.png",
  path + "alice in borderland.png",
  path + "all of us are dead.png",
  path + "moon knight.png",
];

let counter = 0;
const slider = document.querySelector(".slider");

// Function to update slider
function updateSlider() {
  const imageUrl = images[counter];
  
  // Set background image
  slider.style.backgroundImage = `url('${imageUrl}')`;
  
  // Extract show name
  const showName = imageUrl
    .split("/")
    .pop()
    .replace(".png", "")
    .replace(/_/g, " ")
    .toUpperCase();
  
  // Update show title
  document.getElementById("showName").textContent = showName;
  
  // Fetch movie info
  getMovieInfo(showName).then((info) => {
    document.getElementById("genre").innerHTML = "<i>Genre : </i>" + (info.genre || "").replaceAll(",", " | ");
    document.getElementById("year").innerHTML = "<i>Year : </i>" + (info.year || "");
    
    // Only create More Info button if we have valid data
    if (info.title) {
      document.querySelector('.more-info-container').innerHTML = 
        `<button class="more-info" onclick="location.href='detail.html?show=${encodeURIComponent(info.title)}'">
          More Info
        </button>`;
    }
  }).catch(error => {
    console.log("Failed to fetch movie info:", error);
  });
  
  // Update counter for next slide
  counter = (counter + 1) % images.length;
}

// Load first slide IMMEDIATELY
updateSlider();

// Then start interval for remaining slides
setInterval(updateSlider, 9000);

// ------------------------------------------------------------------
// Display Top 10 Shows
const header = () => {
  document.querySelector('.heading').innerHTML = `Top 10 Trending Movies And TV Shows`;
  // document.querySelector('.heading').innerHTML = `Top 10 Trending Movies And TV Shows <button class="show-all-btn" onclick="location.href='#'">All &#9660;</button>`;
};
getMultipleMovies(Object.keys(top10)).then(results => {
    let top10HTML = ''; // Initialize the HTML string
    header();
    results.forEach((show, index) => {
        top10HTML += `
        <div class="card" onclick="location.href='detail.html?show=${encodeURIComponent(Object.keys(top10)[index])}'">        
            <div class="rank">${index + 1}</div>
            <div class="card-image">
                <img src="${Object.values(top10)[index].thumbnail || 'assets/img/hero/default.png'}" alt="${show.title}">
            </div>
            <div class="card-title">${Object.keys(top10)[index]}</div>
            <div class="card-genre">${show.genre || 'Genre: Not specified'}</div>
            <div class="card-year">Year: ${show.year || 'N/A'}</div>
        </div>       
        `;
    });
    document.getElementById("top10").innerHTML = top10HTML;
});
