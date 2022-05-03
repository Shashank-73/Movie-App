import React, { Component } from 'react'
//import { getMovies } from "./getMovies"
import axios from "axios";
export default class Movie extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            pages: [1],
            currPage: 1,
            movies: [],
            favorites: []
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4c84ea9e80e96001c31f2cbd6065f034&language=en-US&page=${this.state.currPage}`)
        const data = res.data;
        this.setState({
            movies: [...data.results]
        })
    }

    // pagination

    pageChangeHandler = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=4c84ea9e80e96001c31f2cbd6065f034&language=en-US&page=${this.state.currPage}`);
        const data = res.data;
        this.setState({
            movies: [...data.results]
        })
    }

    pageRightHandler = () => {
        let tempArr = [];
        for (var i = 1; i <= this.state.pages.length + 1; i++) {
            tempArr.push(i);
        }
        this.setState({
            pages: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.pageChangeHandler)
    }
    pageLeftHandler = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.pageChangeHandler)
        }
    }

    currPageHandler = (page) => {
        if (page != this.state.currPage) {
            this.setState({
                currPage: page
            }, this.pageChangeHandler)
        }
    }

    // favoritehandler for favorite pages

    favoriteHandler = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
        if (this.state.favorites.includes(movieObj.id)) {
            oldData = oldData.filter((mymovie) => mymovie.id != movieObj.id)
        }
        else {
            oldData.push(movieObj);
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        console.log(oldData);
        this.favoriteStateHandler();
    }

    favoriteStateHandler = () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]");
        let temp = oldData.map((movie) => movie.id);
        this.setState({
            favorites: [...temp]
        })
    }

    // render functionality
    render() {
        //const movies = getMovies.results;
        const { movies } = this.state;
        return (
            <div>
                {
                    movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status" style={{ marginLeft: '143px', marginTop: '50px' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <h3 style={{ textAlign: 'center', fontSize: '2rem', fontFamily: 'cursive' }}>TRENDING</h3>
                            <div className='movies-list'>
                                {
                                    movies.map((movie) => (
                                        <div className="card" key={movie.id} onMouseEnter={() => this.setState({ hover: movie.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <div className="image">
                                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}/>
                                            </div>
                                            <div className="card-content">
                                                <p className="card-text card-title">{movie.original_title}</p>
                                                <div>
                                                    {
                                                        this.state.hover == movie.id && <a className="btn btn-primary movie-btn" onClick={() => this.favoriteHandler(movie)}>
                                                            {
                                                                this.state.favorites.includes(movie.id) ? "Remove from Favorites" : "Add to Favorite"
                                                            }
                                                        </a>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='pagination'>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.pageLeftHandler}>Previous</a></li>
                                        {
                                            this.state.pages.map((page) => (
                                                <li className="page-item"><a className="page-link" onClick={() => this.currPageHandler(page)}>{page}</a></li>
                                            ))
                                        }
                                        <li className="page-item"><a className="page-link" onClick={this.pageRightHandler}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </div>
        );
    }
}