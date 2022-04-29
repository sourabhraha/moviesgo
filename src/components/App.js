import React from 'react';
import { connect } from 'react-redux';
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';


class App extends React.Component{
 
    componentDidMount () {

       
        // make api call

        this.props.dispatch(addMovies (data));
       
    }

    isMovieFavourite = (movie) => {
        const {movies} = this.props;

        const { favourites } = movies;

        const index = favourites.indexOf(movie);

        if (index !== -1)
        {
            // Found the Movie
            return true;
        }
        return false;
    }
    
   

    onChangeTab = (val) => {
        this.props.dispatch(setShowFavourites(val));
    }  
     
    render() {
        const { movies, search } = this.props// {movies: {}, search: {}}

        const {list, favourites, showFavourites}   =  movies;   
       
        const displayMovies = showFavourites ?  favourites : list;
    return (
       <React.Fragment>
            <div className = "App">
                <Navbar search  = {search}/>
                <div className = "main">
                    <div className = "tabs">
                        <div className = {`tab ${showFavourites ? '': 'active-tabs'}`} onClick = {() => this.onChangeTab(false)}>Movies</div>
                        <div className = {`tab ${showFavourites ? 'active-tabs': ''}`} onClick = {() => this.onChangeTab(true)}>Favorites</div>
                    </div>

                    <div className = "list">
                        {displayMovies.map((movie,index) => (
                            <MovieCard 
                                movie = {movie} 
                                key = {`movies-${index}` }
                                dispatch = {this.props.dispatch} 
                                isFavourite = {this.isMovieFavourite(movie)}

                            />
                        ))}

                    </div>
                    {displayMovies.length === 0 ? <div className = "no-movies">No Movies To Display ! </div> : null}
                </div>
            </div>
       </React.Fragment>
    );
 } 
}

// class AppWrapper extends React.Component {
//     render () {
//         return (
//             <StoreContext.Consumer>
//                {(store) =>  <App store = {store}/> }
//             </StoreContext.Consumer>
//         );
//     }
// }

function mapStateToProps(state) {

    return {
        movies: state.movies,
        search: state.movies, 
    };
}

const connectedAppComponent = connect( mapStateToProps)(App);

export default connectedAppComponent;













