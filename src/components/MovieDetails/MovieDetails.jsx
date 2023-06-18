import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";




function MovieDetails() {


    const history = useHistory();
    const Moviegenres = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const info = useSelector(store => store.info);

        console.log(Moviegenres, info);



    const back = () => {
        history.push('/')
}


return (
    <div>

    <h1>Movie Details</h1>
    
    <img src={info.poster}/>
    <br />
    <p>{info.description}</p>


    <div>
        {Moviegenres.map(genre => (
            <div key={genre.genres_id}>
               
                <h1>{genre.genre}</h1>
            </div>
        ))}
    </div>

    <button onClick={back}>Back to home</button>
    </div>
)


}




export default MovieDetails;