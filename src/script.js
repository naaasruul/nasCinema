// load movies from API

function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

// async function indiana() {
//   const URL = `https://omdbapi.com/?s=Indiana Jones&page=1&apikey=fc1fef96`;
//   const res = await fetch(URL);
//   const data = await res.json();

//   if (data.Response === "True") {
//     // Extract the list of movies
//     const indianaMovies = data.Search || [];

//     // Display the list of movies
//     displayListMovies(indianaMovies);
//   } else {
//     console.error("Error fetching Indiana Jones movies:", data.Error);
//   }
// }
// indiana()

async function loadMovies() {
  searchMovie = document.getElementById("searchMovie").value;
  const URL = `https://omdbapi.com/?s=${searchMovie}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  // console.log(URL);
  // console.log(data);
  if (data.Response == "True") {
    displayListMovies(data.Search); // dia akan passing array

    // Clear the contents of the movie details section
    document.querySelector(".movieDetails").classList.add("d-none");
  }
}

function displayListMovies(listofmovies) {
  movieCont = document.getElementById("listMovie");
  movieCont.innerHTML = ""; // Clear the contents of movieCont

  for (let i = 0; i < listofmovies.length; i++) {
    console.log(listofmovies[i]); // Assuming each movie object has a "title" property
    var movielist = document.createElement("button");
    movielist.setAttribute(
      "onclick",
      `displayDetails('${listofmovies[i].imdbID}')`
    ); // Set the target modal dynamically

    // create div dalam tu 2 benda gambar and tajuk movie
    // bagi id, kita pakai modal untuk display details movie
    poster = document.createElement("img");
    poster.src = listofmovies[i].Poster;

    console.log(movielist);
    console.log(poster);
    movieCont.appendChild(movielist);

    movielist.appendChild(poster);
  }
}

async function displayDetails(movieID) {
  console.log(movieID);

  // // Hide the search results section
  // document.getElementById("searchResults").classList.add("d-none");

  // Clear the contents of the movie details section
  document.querySelector(".movieDetails").classList.remove("d-none");

  movieCont = document.getElementById("listMovie");
  movieCont.innerHTML = ""; // Clear the contents of movieCont

  const URL = `https://omdbapi.com/?i=${movieID}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();

  console.log("dsfds", data);

  var poster = document.getElementById("poster");
  var title = document.getElementById("title");
  var desc = document.getElementById("desc");
  var rated = document.getElementById("rated");
  var vote = document.getElementById("vote");
  var hours = document.getElementById("hours");
  var genre = document.getElementById("genre");
  var years = document.getElementById("years");

  var director = document.getElementById("director");
  var writer = document.getElementById("writer");
  var country = document.getElementById("country");
  var lang = document.getElementById("lang");
  var releasedate = document.getElementById("releasedate");
  var addtofav = document.getElementById("addtofav");

  // Now, assign the movie data to the elements
  poster.src = data.Poster; // Assuming 'poster' is an <img> tag
  title.textContent = data.Title;
  desc.textContent = data.Plot;
  rated.textContent = `Rated: ${data.Rated}`;
  hours.textContent = `Runtime: ${data.Runtime}`;
  genre.textContent = `Genre: ${data.Genre}`;
  years.textContent = `Year: ${data.Year}`;
  vote.textContent = `Votes: ${data.imdbVotes}`;

  director.textContent = `Director: ${data.Director}`;
  writer.textContent = `Writer: ${data.Writer}`;
  country.textContent = `Country: ${data.Country}`;
  lang.textContent = `Language: ${data.Language}`;
  releasedate.textContent = `Release Date: ${data.Released}`;
  var addToFavouriteBtn = document.getElementById("addtofav");
  var addToWatchBtn = document.getElementById("addtowatchlist");

  // Assume this is the string you get from the movie data
  const actors = data.Actors;

  // Split the string into an array of actors
  const actorArray = actors.split(", ");

  // Select the <ul> element where you want to list the actors
  const actorListUl = document.getElementById("actorList");

  // Clear previous entries
  actorListUl.innerHTML = "";

  // Iterate over the array of actors
  actorArray.forEach((actor) => {
    // Create a new <li> element for each actor
    const li = document.createElement("li");

    // Set the text content of the <li> to the actor's name
    li.textContent = actor;

    // Append the <li> to the <ul>
    actorListUl.appendChild(li);
  });

  // Attach the click event listener using an inline (anonymous) function
  addToFavouriteBtn.setAttribute("onclick", `addtofav('${movieID}')`);
  // Attach the click event listener using an inline (anonymous) function
  addToWatchBtn.setAttribute("onclick", `addtowatchlist('${movieID}')`);
}

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
    let favorites = localStorage.getItem("favMovies"); // Attempt to retrieve existing favorites from localStorage
    favorites = favorites ? JSON.parse(favorites) : {}; // Parse the favorites into an object, or initialize a new object if it doesn't exist

    // Check if the movieID already exists in favorites to avoid duplicates
    if (!favorites[movieID]) {
      favorites[movieID] = data; // Add the new movie data to the favorites object
      localStorage.setItem("favMovies", JSON.stringify(favorites)); // Save the updated favorites object back to localStorage
      console.log(`Added movieID ${movieID} to favorites.`);
    } else {
      console.log(`MovieID ${movieID} is already in favorites.`);
    }
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
  }

  console.log(localStorage);
}

async function addtowatchlist(movieID) {
  const URL = `https://omdbapi.com/?i=${movieID}&apikey=fc1fef96`;
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    // Assuming you want to store the entire movie object in favorites:
    let watchlist = localStorage.getItem("watchListMovies"); // Attempt to retrieve existing favorites from localStorage
    watchlist = watchlist ? JSON.parse(watchlist) : {}; // Parse the favorites into an object, or initialize a new object if it doesn't exist

    // Check if the movieID already exists in favorites to avoid duplicates
    if (!watchlist[movieID]) {
      watchlist[movieID] = data; // Add the new movie data to the favorites object
      localStorage.setItem("watchListMovies", JSON.stringify(watchlist)); // Save the updated favorites object back to localStorage
      console.log(`Added movieID ${movieID} to favorites.`);
    } else {
      console.log(`MovieID ${movieID} is already in favorites.`);
    }
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
  }
}

function readAllItemsFromLocalStorage() {
  const moviesList = document.getElementById("moviesList");
  moviesList.innerHTML = ""; // Clear existing list

  // Check if the 'favMovies' item exists in localStorage
  const storedMovies = localStorage.getItem("favMovies");
  if (!storedMovies) {
    moviesList.innerHTML = "<p>No favourite movies added yet.</p>";
    console.log("No favourite movies added yet."); // Log to console as well
    return;
  }

  try {
    const movies = JSON.parse(storedMovies);
    // Now movies is an object where each property is a movieID and its value is the movie details
    Object.keys(movies).forEach((movieID) => {
      const movie = movies[movieID];
      // console.log(`Movie ID: ${movieID}`, movie); // Log the movie details to the console for debugging

      const movieElement = document.createElement("div");
      // Add a class to the movieElement div
      movieElement.classList.add("movie-item");

      movieElement.innerHTML = `
      <hr>
      <img src="${movie.Poster}" alt="${movie.Title}" style="width:300px;">
      <span class="d-flex flex-column p-4 justify-content-center mt-2 align-items-start">
      <h1>${movie.Title} (${movie.Year})</h1>
      <p class="">${movie.Plot}</p>
      <button class="btn mt-3 w-25 btn-danger" id="remove-${movieID}">Remove</button>
      </span>        
      <hr>
      <div class="d-flex justify-content-center">
      </div>
      `;

      moviesList.appendChild(movieElement);

      // Add click event listener for the remove button
      document
        .getElementById(`remove-${movieID}`)
        .addEventListener("click", function () {
          removeMovieFromFavorites(movieID);
        });
    });
  } catch (e) {
    console.error("Error parsing movie data from localStorage:", e);
  }
}

function removeMovieFromFavorites(movieID) {
  // Retrieve the current list of movies from localStorage
  const storedMovies = localStorage.getItem("favMovies");
  if (storedMovies) {
    const movies = JSON.parse(storedMovies);

    // Check if the movieID exists in the movies object
    if (movies.hasOwnProperty(movieID)) {
      // Remove the specified movie from the object
      delete movies[movieID];

      // Update the localStorage with the new set of movies
      localStorage.setItem("favMovies", JSON.stringify(movies));

      // Refresh the movies list
      readAllItemsFromLocalStorage();

      // Send message to user
      showMessage("Movie removed successfully.", "warning");
    } else {
      showMessage("Movie not found.", "danger");
    }
  }
}

function showMessage(messageText, type) {
  var messageElement = document.getElementById("message");
  if (!messageElement) {
    console.error("Message element with ID 'message' not found.");
    return;
  }

  // Create the alert message element
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", `alert-${type}`);
  alertElement.setAttribute("role", "alert");
  alertElement.textContent = messageText;

  // Append the alert message to the message element
  messageElement.appendChild(alertElement);

  // Remove the alert message after a delay (e.g., 3 seconds)
  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}

function readAllWatchList() {
  const moviesList = document.getElementById("watchList");
  moviesList.innerHTML = ""; // Clear existing list

  // Check if the 'favMovies' item exists in localStorage
  const storedMovies = localStorage.getItem("watchListMovies");
  if (!storedMovies) {
    moviesList.innerHTML = "<p>No favourite movies added yet.</p>";
    console.log("No favourite movies added yet."); // Log to console as well
    return;
  }

  try {
    const movies = JSON.parse(storedMovies);
    // Now movies is an object where each property is a movieID and its value is the movie details
    Object.keys(movies).forEach((movieID) => {
      const movie = movies[movieID];
      // console.log(`Movie ID: ${movieID}`, movie); // Log the movie details to the console for debugging

      const movieElement = document.createElement("div");
      // Add a class to the movieElement div
      movieElement.classList.add("movie-item");

      movieElement.innerHTML = `
      <hr>
      <img src="${movie.Poster}" alt="${movie.Title}" style="width:300px;">
      <span class="d-flex w-100 flex-column p-4 justify-content-center mt-2 align-items-start">
      <h1>${movie.Title} (${movie.Year})</h1>
      <p class="">${movie.Plot}</p>
      <span class="d-flex flex-row justify-content-start gap-3" style="width: 100%;">
        <button class="btn  mt-3 w-25 btn-danger" id="remove-${movieID}">Remove</button>
        <button class="btn  mt-3 w-25 btn-success" id="check-${movieID}"><i class="bi bi-check-circle"></i></button>
      </span>

      </span>        
      <hr>
      <div class="d-flex justify-content-center">
      </div>
      `;

      moviesList.appendChild(movieElement);

      // Add click event listener for the remove button
      document
        .getElementById(`remove-${movieID}`)
        .addEventListener("click", function () {
          removeMovieFromWatchList(movieID);
        });

      // Add click event listener for the check button
      document
        .getElementById(`check-${movieID}`)
        .addEventListener("click", function () {
          updateMovieStatus(movieID);
        });
    });
  } catch (e) {
    console.error("Error parsing movie data from localStorage:", e);
  }
}

function updateMovieStatus(movieID) {
  // Retrieve the current list of movies from localStorage
  const storedMovies = localStorage.getItem("watchListMovies");

  if (storedMovies) {
    const movies = JSON.parse(storedMovies);

    // Toggle the status of the movie
    movies[movieID].watched = !movies[movieID].watched;

    // Update the localStorage with the new set of movies
    localStorage.setItem("watchListMovies", JSON.stringify(movies));

    // Refresh the movies list
    readAllWatchList();

    // Change the button's icon based on the movie's watched status
    const button = document.getElementById(`check-${movieID}`);
    if (movies[movieID].watched) {
      button.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
    } else {
      button.innerHTML = '<i class="bi bi-check-circle"></i>';
    }

    console.log("Movie status updated");
  } else {
    console.log("No movies found in localStorage");
  }
}



function removeMovieFromWatchList(movieID) {
  // Retrieve the current list of movies from localStorage
  const storedMovies = localStorage.getItem("watchListMovies"); // Corrected key name
  if (storedMovies) {
    const movies = JSON.parse(storedMovies);

    // Check if the movieID exists in the movies object
    if (movies.hasOwnProperty(movieID)) {
      // Remove the specified movie from the object
      delete movies[movieID];

      // Update the localStorage with the new set of movies
      localStorage.setItem("watchListMovies", JSON.stringify(movies)); // Corrected key name

      // Refresh the movies list
      readAllWatchList();

      // Send message to user
      showMessage("Movie removed successfully.", "warning");
    } else {
      showMessage("Movie not found.", "danger");
    }
  }
}

readAllItemsFromLocalStorage();
readAllWatchList();

// Actors
// :
// "Mustafa Abbas, Yasmin Abdulaziz, Hasan Abdulfattah"
// Awards
// :
// "N/A"
// BoxOffice
// :
// "N/A"
// Country
// :
// "Egypt"
// DVD
// :
// "N/A"
// Director
// :
// "Akram Fareed"
// Genre
// :
// "Comedy"
// Language
// :
// "Arabic"
// Metascore
// :
// "N/A"
// Plot
// :
// "A man wants to his sister marry to leave the apartment to him and he can also get married ."
// Poster
// :
// "https://m.media-amazon.com/images/M/MV5BZmQ2M2YzZjItNmRhNC00NzFjLThhMjMtODY3MzM0NWI0MmEyXkEyXkFqcGdeQXVyMzI4MTk3MTY@._V1_SX300.jpg"
// Production
// :
// "N/A"
// Rated
// :
// "N/A"
// Ratings
// :
// [{…}]
// Released
// :
// "05 Jan 2006"
// Response
// :
// "True"
// Runtime
// :
// "N/A"
// Title
// :
// "Haha we tofaha"
// Type
// :
// "movie"
// Website
// :
// "N/A"
// Writer
// :
// "Belal Fadl"
// Year
// :
// "2006"
// imdbID
// :
// "tt0835036"
// imdbRating
// :
// "3.6"
// imdbVotes
// :
// "582"
