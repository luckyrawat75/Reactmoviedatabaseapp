import React from "react";
import { useGlobalContext } from "./Context";
import { NavLink } from "react-router-dom";
import "./Movie.css";

function Movies() {
  const { movies, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <section className="movie-page">
        <div className="loading">Loading....</div>
      </section>
    );
  }

  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movies.map((currMovie) => {
          const { Title, Year, Poster, imdbID } = currMovie;

          const movieName =
            Title.length > 15 ? `${Title.substring(0, 15)}...` : Title;

          return (
            <NavLink to={`/movie/${imdbID}`} key={imdbID}>
              <div className="card">
                <div className="card-info">
                  <h2>{movieName}</h2>
                  <h3>{Year ? Year : "N/A"}</h3> {/* Show Year if available */}
                  <img src={Poster} alt={Title} />
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default Movies;
