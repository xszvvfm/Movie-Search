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
      movieCard.className = "card-list";
      movieCard.innerHTML = `
            <img class="movie-poster" id="${movie.id}" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3 class="movieTitle">${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
      movieID.appendChild(movieCard);
    });

    // 각 포스터 이미지에 클릭 이벤트 리스너 추가
    const posters = document.querySelectorAll(".movie-poster");
    posters.forEach((poster, index) => {
      poster.addEventListener("click", (movie) => {
        const movieId = movies[index].id;
        console.log(poster.id);
        alert(`영화 ID: ${poster.id}`);
      });
    });

    // 검색 창
    const addSearchBar = document.createElement("input");
    addSearchBar.setAttribute("id", "search-input");

    // 검색 버튼 클릭 시 해당 문자열 포함된 영화 웹페이지 출력
    const addSearchBtn = document.querySelector("#search");
    addSearchBtn.setAttribute("onclick", "searchMovieData()");

    // 영화 이름 검색 시 해당 문자열 포함된 영화 웹페이지 출력
    searchMovieData = () => {
      const value = document.getElementById("search-input").value.toUpperCase();
      const cardData = document.getElementsByClassName("card-list");
      // const movieTitle = document.getElementsByClassName("movie-title");
      let movieTitle;
      for (let i = 0; i < cardData.length; i++) {
        movieTitle = cardData[i].getElementsByClassName("movieTitle");
        // God father
        if (movieTitle[0].innerHTML.toUpperCase().indexOf(value) > -1) {
          cardData[i].style.display = "block";
        } else {
          cardData[i].style.display = "none";
        }
      }
    };
  })
  .catch((err) => {
    console.error("에러 발생", err); // 에러 처리
  });
