import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";




function MovieDetails() {


const genres = useSelector(store => store.genres);
const dispatch = useDispatch();


const postDetails = () => {
    dispatch({
        type: 'SET_GENRES'
    })
}





}




export default MovieDetails;