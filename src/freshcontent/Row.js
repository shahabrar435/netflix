import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condatation/variable.
  useEffect(() => {
    //If [], are blank then run once when the row loads, and dont run again.
    // Now we need to make asynchronize call because we are sending the request to out side of third party.
    async function fetchData() {
      const request = await axios.get(fetchUrl); //This line is appending two url's
      //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
      //console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //Including fetchUrl in this array is important because this is outside of block.

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* This below div is for row_poster. We are creating seperate div for this because we need to scroll the movies. */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id} // This line is to render the images in an Efficient way means if any thing changes in this row react doesn't simply re-render the whole row, it just re-render new onces.
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`} //This`` is string intapulatation javascript feature.
            alt={movie.name}
          />
        ))}
      </div>
      {/* && is for if we have trailerUrl and then show it */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;