export async function getMovieInfo(movieName) {
  const OMDB_API_KEY = "8a570048";

  // Add timeout promise
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), 5000); // 5 second timeout
  });

  // Try OMDB first
  try {
    // Try OMDB with timeout
    const omdbPromise = fetch(
      `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${OMDB_API_KEY}`
    ).then(response => response.json());
    
    const omdbData = await Promise.race([omdbPromise, timeoutPromise]);

    if (omdbData.Response === "True") {
      return {
        source: "OMDB",
        title: omdbData.Title,
        year: omdbData.Year,
        genre: omdbData.Genre,
        description: omdbData.Plot,
        director: omdbData.Director,
        actors: omdbData.Actors,
        rating: omdbData.imdbRating,
        poster: omdbData.Poster,
        runtime: omdbData.Runtime,
      };
    }
    
    // If OMDB returns but no data, don't try Wikipedia for speed
    return {
      source: "none",
      title: movieName,
      error: "Movie not found in OMDB"
    };
    
  } catch (error) {
    console.log(`Failed to fetch ${movieName}:`, error.message);
    // Return minimal data quickly
    return {
      source: "none",
      title: movieName,
      error: `Error: ${error.message}`
    };
  }

  // Fallback to Wikipedia
  try {
    // Step 1: Search for the movie
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      movieName + " film"
    )}&format=json&origin=*`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.query.search.length) {
      return {
        source: "none",
        error: `Movie "${movieName}" not found`,
      };
    }

    const pageTitle = searchData.query.search[0].title;

    // Step 2: Get the page content
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageprops&exintro=true&explaintext=true&titles=${encodeURIComponent(
      pageTitle
    )}&format=json&origin=*`;
    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();

    const pages = contentData.query.pages;
    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    if (page.missing) {
      return {
        source: "none",
        error: `Movie "${movieName}" not found`,
      };
    }

    const extract = page.extract || "No description available.";
    const firstParagraph = extract.split("\n")[0];

    // Extract genre from text
    const genreMatch = extract.match(
      /(?:is an?|genres?\s+(?:are|include))\s+([^.]+?)(?:\s+film|\s+movie)/i
    );
    const genre = genreMatch ? genreMatch[1].trim() : "Unknown";

    return {
      source: "Wikipedia",
      title: page.title,
      genre: genre,
      description: firstParagraph,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
        pageTitle.replace(/ /g, "_")
      )}`,
    };
  } catch (error) {
    return {
      source: "none",
      error: `Error fetching data: ${error.message}`,
    };
  }
}

// Function to fetch multiple movies
// In collectMovieDetails.js - ROBUST VERSION
export async function getMultipleMovies(movieNames) {
  try {
    const promises = movieNames.map(movie => getMovieInfo(movie));
    
    const settledResults = await Promise.allSettled(promises);
    
    // Process results (both successful and failed)
    const results = settledResults.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        console.warn(`Failed to fetch ${movieNames[index]}:`, result.reason);
        return {
          title: movieNames[index],
          source: "none",
          error: "Failed to load data"
        };
      }
    });
    
    return results;
    
  } catch (error) {
    console.error("Critical error in getMultipleMovies:", error);
    throw error;
  }
} 

// Example usage:
// Single movie
// getMovieInfo("The Matrix").then(info => {
//   console.log(info);
//   // Access data easily:
//   // info.title, info.genre, info.description, etc.
// });

// // Multiple movies
// const movieList = ["The Matrix", "Inception", "Interstellar"];
// getMultipleMovies(movieList).then(results => {
//   console.log(results);
//   // results is an array of movie objects
//   // Access like: results[0].title, results[0].genre, etc.
// });