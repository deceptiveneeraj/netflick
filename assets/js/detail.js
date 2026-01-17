// imports necessary functions and data
import { getMovieInfo, getMultipleMovies} from './collectMovieDetails.js';
import { top10 } from './movieData.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Extract movie/show name from URL
    const params = new URLSearchParams(window.location.search);
    const showName = params.get('show');

    if (showName) {
        const decodedShowName = decodeURIComponent(showName);
        const showData = top10[decodedShowName];

        // Update main title
        document.getElementById('detailShowName').textContent = decodedShowName;

        // Fetch movie info from API
        getMovieInfo(decodedShowName).then((info) => {
            document.querySelector('.detailImage').style.backgroundImage = `url('${showData.detailImg || 'assets/img/hero/default.png'}')`;
            document.querySelector('.match').innerHTML = `Ratings: ${info.rating || "8.0"}/10`;
            document.getElementById('detailYear').innerHTML = `Year: ${info.year || "2025"}`;
            document.querySelector('.type').innerHTML = `${top10[showName].type || "TV-MA"}`;
            document.getElementById('detailGenre').innerHTML = `Genre: ${(info.genre).replaceAll(",", " | ") || "Action | Drama | Adventure | Fantasy"}`;
            document.getElementById('detailDesc').innerHTML = `Description: ${info.description || "No description available."}`;
            document.getElementById('cast').innerHTML = `Cast: ${info.actors || "Cast information not available."}`;

            // Display seasons if it's a TV show
            if (showData && showData.type === "TV Show" && showData.seasons) {
                displaySeasons(showData.seasons, decodedShowName);
            }
             else if(showData && showData.type === "Movie") {
                const seasonsSection = document.getElementById('seasonsSection');
                const seasonSelect = document.getElementById('seasonSelect');
                
                // Show seasons section
                seasonsSection.style.display = 'block';
                seasonSelect.style.display = 'none';

                document.getElementById('episodes').innerHTML = "Movie";
                document.getElementById('resolution').textContent = `Quality: ${showData.quality || 'HD'}`;

                const movieThumbnail = showData.thumbnail || 'Image Not Found';
                const movieTitle = showData.title || '';
                const movieDescription = showData.description || '';
                const movieLink = showData.link || "#";

                let episodesHTML = '';
                episodesHTML += `
                <div class="episode-item">
                    <a href="${movieLink}">
                        <div class="episode-thumbnail" data-episode-number="${""}">
                            <div class="episode-number">${""}</div>
                            ${movieThumbnail ? `<img src="${movieThumbnail}" alt="${movieTitle}" onerror="this.style.display='none'">` : ''}
                        </div>
                        <div class="episode-info">
                            <div class="episode-header">
                                <h3 class="episode-title">${movieTitle}</h3>
                                <span class="episode-duration">&DownArrowBar;</span>
                            </div>
                            <p class="episode-description">
                                ${movieDescription}
                            </p>
                        </div>
                    </a>
                </div>
                `;
            
            episodesList.innerHTML = episodesHTML;
                    
            }
        });
    }
});

// Function to display seasons and episodes
function displaySeasons(seasons, showName) {
    // document.getElementById('episodes').innerHTML = "Episodes";
    const seasonSelect = document.getElementById('seasonSelect');
    const episodesList = document.getElementById('episodesList');
    const seasonsSection = document.getElementById('seasonsSection');

    if (!seasonSelect || !episodesList) return;

    // Clear existing options
    seasonSelect.innerHTML = '';

    // Get season names
    const seasonNames = Object.keys(seasons);

    if (seasonNames.length === 0) {
        seasonsSection.style.display = 'none';
        return;
    }

    // Show seasons section
    seasonsSection.style.display = 'block';

    // Populate season dropdown
    seasonNames.forEach((seasonName, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = seasonName;
        seasonSelect.appendChild(option);
    });

    // Function to display episodes for selected season
    function displayEpisodesForSeason(seasonIndex) {
        const seasonName = seasonNames[seasonIndex];
        const season = seasons[seasonName];

        if (!season.episodes || season.episodes.length === 0) {
            episodesList.innerHTML = '<p class="no-episodes">No episodes available</p>';
            return;
        }

        // Thumbnail for episode removed
        // <div class="episode-thumbnail">
        //     <div class="episode-number">${episodeIndex + 1}</div>
        // </div>

        // <a href="${episodeLink}">
        
        // Duration for episode removed
        // <span class="episode-duration">45 min</span>
        let episodesHTML = '';
        document.getElementById('resolution').textContent = `Quality: ${season.quality || 'HD'}`;
        season.episodes.forEach((episode, episodeIndex) => {
            const episodeTitle = episode.title || episode
            const episodeLink = episode.link || '#';
            const episodeThumbnail = episode.episodeThumbnail || '';
            const episodeDescription = episode.describe || '';
            
            episodesHTML += `
            <div class="episode-item">
                <a href="${episodeLink}">
                    <div class="episode-thumbnail" data-episode-number="${episodeIndex + 1}">
                        <div class="episode-number">${episodeIndex + 1}</div>
                        ${episodeThumbnail ? `<img src="${episodeThumbnail}" alt="${episodeTitle}" onerror="this.style.display='none'">` : ''}
                    </div>
                    <div class="episode-info">
                        <div class="episode-header">
                            <h3 class="episode-title">${episodeTitle}</h3>
                            <span class="episode-duration">&DownArrowBar;</span>
                        </div>
                        <p class="episode-description">
                            ${episodeDescription}
                        </p>
                    </div>
                </a>
            </div>

            `;
        });
        
        episodesList.innerHTML = episodesHTML;
    }
    // Display episodes for first season initially
    displayEpisodesForSeason(0);
    
    // Update episodes when season changes
    seasonSelect.addEventListener('change', function() {
        displayEpisodesForSeason(parseInt(this.value));
    });
}