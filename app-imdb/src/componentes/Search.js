import React, {useState} from "react";
import axios from "axios";
import "../css/Search.css";

function Search() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const search = async () => {
        const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=25e817bd`);
        console.log(response.data.Response);

        if (response.data.Response === "False") {
            alert("Não foram encontradas obras para a palavra pesquisada!");
            return;
        }
    
        const movieResults = response.data.Search
        const moviePromises = movieResults.map((result) => {
            return axios.get(`https://www.omdbapi.com/?i=${result.imdbID}&apikey=25e817bd`);
        });

        const movieResponses = await Promise.all(moviePromises);
        const movies = movieResponses.map((response) => response.data);

        setMovies(movies);
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (query === "") {
            alert("Informe um filme ou série!");
            return;
        }
        search();
    };

    return(
        <div>
            <form onSubmit={handleSubmit} className="search-form search-form-container">
                <input type="text" value={query} onChange={handleChange} placeholder="Digite o nome de um filme ou série..." />
                <button type="submit">Pesquisar</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>FILME OU SÉRIE</th>
                        <th>NOTA METACRITIC</th>
                        <th>LANÇAMENTO</th>
                        <th>GÊNERO</th>
                        <th>SINOPSE</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.imdbID}>
                            <td>
                                <img src={movie.Poster} alt={movie.Title} /><br></br>
                                <h3>{movie.Title}</h3>
                            </td>
                            <td>
                                {movie.Metascore}
                            </td>
                            <td>
                                {movie.Released}
                            </td>
                            <td>
                                {movie.Genre}
                            </td>
                            <td>
                                {movie.Plot}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                <p><strong>Encontre Filmes</strong> Copyright ©2023. </p>
            </footer>
        </div>
    );
}

export default Search;