// Define the addtofav function that takes movieID as a parameter
async function addtofav(movieID) {
    const URL = `https://omdbapi.com/?i=${movieID}&apikey=fc1fef96`;
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
  
      // Assuming you want to store the entire movie object in favorites:
      let favorites = localStorage.getItem('favMovies'); // Attempt to retrieve existing favorites from localStorage
      favorites = favorites ? JSON.parse(favorites) : {}; // Parse the favorites into an object, or initialize a new object if it doesn't exist
  
      // Check if the movieID already exists in favorites to avoid duplicates
      if (!favorites[movieID]) {
        favorites[movieID] = data; // Add the new movie data to the favorites object
        localStorage.setItem('favMovies', JSON.stringify(favorites)); // Save the updated favorites object back to localStorage
        console.log(`Added movieID ${movieID} to favorites.`);
      } else {
        console.log(`MovieID ${movieID} is already in favorites.`);
      }
    } catch (error) {
      console.error("Failed to fetch movie data:", error);
    }
  
    console.log(localStorage)
  }
  