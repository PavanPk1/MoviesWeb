import "./index.css";
import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

class Navbar extends React.Component {
  state = {
    search: "",
    showHamburger: false,
    searchData: [],
  };

  onClickSearchBtn = async () => {
    const { search } = this.state;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=670a2ba7410ae5c9dd25d236b7d7ce05&language=en-US&query=${search}&page=1`
    );
    const data = await response.json();
    const searchData = data.results.map((item) => ({
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
    this.setState({ searchData });
  };
  onChangeSearch = (e) => this.setState({ search: e.target.value });

  onClickHambugerIcon = () => {
    this.setState((prevState) => ({ showHamburger: !prevState.showHamburger }));
  };

  render() {
    const { showHamburger, search } = this.state;
    return (
      <>
        <div className="navbar">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1712669565/logo_zadiiw.jpg"
              className="logo-img"
              alt="logo"
            />
          </Link>
          <GiHamburgerMenu
            size={25}
            onClick={this.onClickHambugerIcon}
            className="mobile-menu"
          />
          <ul className="navOptions">
            <li className="nav-option">
              <Link to="/" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="nav-option">
              <Link to="/top-rated" className="nav-link">
                Top Rated
              </Link>
            </li>
            <li className="nav-option">
              <Link to="/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
            <li className="nav-option">
              <input
                type="search"
                className="userSearch"
                placeholder="Search for a movie..."
                value={search}
                onChange={this.onChangeSearch}
              ></input>
              <button
                className="search-button"
                type="button"
                onClick={this.onClickSearchBtn}
              >
                <Link to="/user-search">Search</Link>
              </button>
            </li>
          </ul>
        </div>
        {showHamburger && (
          <ul className="mobile-navOptions">
            <li className="mobile-nav-option">
              <Link to="/" className="nav-link">
                Popular
              </Link>
            </li>
            <li className="mobile-nav-option">
              <Link to="/top-rated" className="nav-link">
                Top Rated
              </Link>
            </li>
            <li className="mobile-nav-option">
              <Link to="/upcoming" className="nav-link">
                Upcoming
              </Link>
            </li>
            <li>
              <input
                type="search"
                className="userSearch"
                placeholder="Search for a movie..."
                value={search}
                onChange={this.onChangeSearch}
              ></input>
              <button className="search-button" type="button">
                Search
              </button>
            </li>
          </ul>
        )}
      </>
    );
  }
}

export default Navbar;
