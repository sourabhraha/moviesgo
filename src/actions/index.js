//  {
//     type: 'ADD_MOVIES'
//  }

// action types
export const ADD_MOVIES = 'ADD_MOVIES';
export const  ADD_FAVOURITES = 'ADD_FAVOURITES';
export const  REMOVE_FAVOURITES = 'REMOVE_FAVOURITES';
export const  SET_SHOW_FAVOURITES = 'SET_SHOW_FAVOURITES';
export const ADD_MOVIE_TO_LIST = 'ADD_MOVIE_TO_LIST';
export const  ADD_SEARCH_RESULT = 'ADD_SEARCH_RESULT';
export const MOVIE_NOT_FOUND = 'MOVIE_NOT_FOUND';

// action creators 
export function addMovies (movies) {
    return {
        type: ADD_MOVIES, 
        movies
    }
}

export function addFavourites (movie) {
    return {
        type: ADD_FAVOURITES,
        movie
    }
}

export function removeFavourites (movie) {
    return {
        type: REMOVE_FAVOURITES,
        movie
    }
}




export function setShowFavourites (val) {
    return {
        type: SET_SHOW_FAVOURITES,
        val
    }
}

export function addMovieToList (movie) {
    return {
        type: ADD_MOVIE_TO_LIST,
        movie
    };
}

export function handleMovieSearch (movie) {

    return function (dispatch) {
    const url = `https://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;

    fetch(url)
    .then(response => response.json())
    .then(movie => {
        // dispatch an action 

        if(movie.Response !== 'False'){
             dispatch(addMovieSearchResult(movie));
             console.log('movie',  movie);
        }

        else{
            dispatch(movieNotFound(movie));
            console.log("MOVIE_NOT_FOUND");
        }
    })
    }
}

export function addMovieSearchResult (movie) {
    return {
        type: ADD_SEARCH_RESULT,
        movie
    }
}

export function movieNotFound (movie) {
    return {
        type: MOVIE_NOT_FOUND,
        movie
    }
}