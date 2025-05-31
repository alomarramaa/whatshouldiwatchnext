const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a movie name.");

  fetch(`http://127.0.0.1:5000/search?title=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(movies => {
      resultsDiv.innerHTML = ""; // clear previous results

      if (!movies.length) {
        resultsDiv.innerHTML = "<p>No movies found.</p>";
        return;
      }

      movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";

        movieCard.innerHTML = `
          ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title}" />` : ""}
          <div class="movie-title">${movie.title}</div>
          <div class="movie-overview">${movie.overview || "No description."}</div>
          <div class="movie-release">Release: ${movie.release_date || "Unknown"}</div>
        `;

        resultsDiv.appendChild(movieCard);
      });
    })
    .catch(err => {
      console.error(err);
      resultsDiv.innerHTML = "<p>Error fetching movies. Try again.</p>";
    });
});
