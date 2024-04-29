// TMDB API 가져오기
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2QzZmY4ZDU2ODE2ZjkzZTkyYmQ3M2MxZjE2OTg2MyIsInN1YiI6IjY2MjhjMWY0MjIxYmE2MDE3YzE4NjcyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gvAvQlPHoyU4f2XSFGkYE2yST8FE2YIndKlXtP4goZ4",
  },
};

let movieData; // 전역 변수 선언

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    movieData = data; // 전역 변수에 데이터 저장
    // console.log(movieData); // 저장된 데이터 출력

    const movies = movieData.results;
    const movieID = document.getElementById("movie-id");

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.innerHTML = `
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3 class="movie-title">${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p class="movie-id">영화 id: ${movie.id}</p>
        `;
      movieID.appendChild(movieCard);
    });

    // 각 포스터 이미지에 클릭 이벤트 리스너 추가
    const posters = document.querySelectorAll(".movie-poster");
    posters.forEach((poster, index) => {
      poster.addEventListener("click", () => {
        const movieId = movies[index].id;
        alert(`영화 ID: ${movieId}`);
      });
    });
  })
  .catch((err) => {
    console.error("에러 발생", err); // 에러 처리
  });
