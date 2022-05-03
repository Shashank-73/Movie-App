import React, { Component } from 'react'
import { getMovies } from "./getMovies"
export default class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgenre: [],
            favoritemovies: [],
            search: ''
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("movies" || "[]"));
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

        // now filter all generes from genreids

        let temp = ['All Genres']
        data.forEach((obj) => {
            if (!temp.includes(genreids[obj.genre_ids[0]])) {
                temp.push(genreids[obj.genre_ids[0]]);
            }
        })
        this.setState({
            currgenre: [...temp],
            favoritemovies: [...data],
        })

    }

    changeGenrehandler = (genre) => {
        this.setState({
            genres: genre
        })
    }
    render() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        /*this.setState({
            genres: [...temp]
        }) */
        let { genres, currgenre, favoritemovies } = this.state;


        // filter a favorite list according genre
        let filterArr = [];
        if (genres == "All Genres") {
            filterArr = favoritemovies;
        }
        else {
            filterArr = favoritemovies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == genres);
        }

        
        // search functionality

        if(this.state.search=='')
        {
            filterArr=favoritemovies;
        }
        else{
            filterArr=favoritemovies.filter((movieObj)=>{
                let title=movieObj.original_title.toLowerCase();
                return title.includes(this.state.search);
            })
        }
        return (
            <>
                <div className='favorite-page'>
                    <div className="row">
                        <div className="col-2">
                            <ul className="list-group favorite-list">
                                {

                                    currgenre.map((genre) => (
                                        this.state.genres == genre ?
                                            <li className="list-group-item" style={{ background: 'blue', fontWeight: '900', color: '#fff' }}> {genre}
                                            </li> :

                                            <li className="list-group-item" onClick={() => this.changeGenrehandler(genre)} style={{ cursor: 'pointer' }}>
                                                {genre}
                                            </li>)
                                    )
                                }
                            </ul>
                        </div>
                        <div className="col-9 favorite-table">
                            <div className='row'>
                                <input type="text" className='input-group-text col' placeholder='Search'
                                    value={this.state.search}
                                    onChange={(e)=>this.setState({
                                        search: e.target.value
                                    })} />
                                <input type="number" className='input-group-text col' />
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">Popularity</th>
                                            <th scope="col">Ratings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movie) => (
                                                <tr key={movie.id}>
                                                    <th scope="row">
                                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                                            style={{
                                                                width: '80px',
                                                                height: '50px'
                                                            }} />
                                                        {movie.original_title}
                                                    </th>
                                                    <td>{genreids[movie.genre_ids[0]]}</td>
                                                    <td>{movie.popularity}</td>
                                                    <td>{movie.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link">Previous</a></li>
                                    <li className="page-item"><a className="page-link">1</a></li>
                                    <li className="page-item"><a className="page-link">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
