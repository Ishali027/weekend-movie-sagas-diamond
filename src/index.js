import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    // getting movies from all movies
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);

    //getting movie genre info
    yield takeEvery('FETCH_GENRES', fetchGenres);

    //getting movie info from client side
    yield takeEvery('GET_MOVIE_INFO', fetchInfo)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ 
            type: 'SET_MOVIES', 
            payload: movies.data });

    } catch (error) {
        console.log('error GETting movies', error);
    }
        
}

function* fetchGenres (action) {
    // made this generator function to get all genres from database
    try {
        const genres = yield axios.get(`/api/genre/${action.payload.id}`);
        console.log('get all:', genres);
        yield put({
            type: 'SET_GENRES', 
            payload: genres.data });

    } catch (error){
        console.log('get all errors', error);

    }
}

// made this generator function to get movie id from clientside movie List
function* fetchInfo (action) {
    try {
        yield put ({
            type: 'GET_INFO',
            payload: action.payload
        })
    } catch (error) {
        console.log(error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// made this reducer to store individual movie data
const info = (state = [], action) => {
    switch(action.type) {
        case 'GET_INFO':
            return action.payload;
            default:
                return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        // added my info reducer to the store
        info
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
