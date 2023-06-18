import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();


    const handleClick = ( id) => {
        
        dispatch({
            type: 'GET_MOVIE_INFO',
            payload: id
        }),
        dispatch({
            type: 'FETCH_GENRES',
            payload: id
        })
        
        history.push(`/details`)
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    
                    return (
                        
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={() => handleClick(movie)} src={movie.poster} alt={movie.title}  />
                        </div>
                        
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;