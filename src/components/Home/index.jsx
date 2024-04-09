import MovieCard from "../MovieCard";
import Navbar from "../Navbar";
import "./index.css";

import { Component } from "react";
import * as Loader from "react-loader-spinner";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN PROGRESS",
};


class Home extends Component {
  state = {
    moviesData: [],
    apiStatus: apiStatusConstants.initial,
  };

  componentDidMount = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=670a2ba7410ae5c9dd25d236b7d7ce05&language=en-US&page=1"
    );
    const data = await response.json();
    if (response.ok) {
      //   console.log(data);
      const moviesData = data.results.map((item) => ({
        id: item.id,
        adult: item.adult,
        backdropPath: item.backdrop_path,
        genreIds: item.genre_ids,
        originalLanguage: item.original_language,
        originalTitle: item.original_title,
        overview: item.overview,
        popularity: item.popularity,
        posterPath: item.poster_path,
        relaseData: item.release_date,
        title: item.title,
        video: item.video,
        voteAverage: item.vote_average,
        voteCount: item.vote_count,
      }));
      this.setState({ moviesData, apiStatus: apiStatusConstants.success });
    } else {
        this.setState({ apiStatus: apiStatusConstants.failure })
    }
  };

  renderMovies = () => {
    const { moviesData } = this.state;
    return (
      <ul className="movies-container">
        {moviesData.map((item) => (
          <MovieCard details={item} key={item.id} />
        ))}
      </ul>
    );
  };

  renderLoader = () => {
    return (
      <div className="loader-container">
        <Loader.TailSpin color="#0284C7" height={50} width={50} />
      </div>
    );
  }

  onApiFailure = () => {
    return (
      <div className="failureView-container">
        <img
          src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694930693/Group_7522failureCase_ydyurk.png"
          alt="failure view"
        />
        <p className="failureView-title">
          Something went wrong. Please try again
        </p>
      </div>
    );
  }

  renderPopularMovies = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader();
      case apiStatusConstants.success:
        return this.renderMovies();
      case apiStatusConstants.failure:
        return this.onApiFailure();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="Main-container">
        <Navbar />
        <div className="home-container"><h1 className="heading">----Popular Movies----</h1> {this.renderPopularMovies()}</div>
      </div>
    );
  }
}

export default Home;
