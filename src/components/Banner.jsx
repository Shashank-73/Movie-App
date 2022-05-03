import React, { Component } from 'react'
import { getMovies } from "./getMovies"
export default class Banner extends Component {
  render() {
    const movies = getMovies.results[0];
    return (
      <div className='banner'>
        {
          movies == '' ?
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            : <div className="card banner-card">
              <img src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`} className="card-img-top banner-img" alt="..." />
              <div className="card-body banner-text">
                <p className="card-text">{movies.original_title}</p>
                <p className='overview'>{movies.overview}</p>
              </div>
            </div>
        }
      </div>
    )
  }
}
