$(document).ready(() => {
    $('#searchForm').on('submit', (event) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        event.preventDefault();

    });
});

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&apikey=104aab75')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${movie.Poster}"> 
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output)

    })
    .catch((err) => {
        console.log(err);
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function actorArray(actors){
   return actors.split(',');
}

function getBirthday(){
    // use Google search API to find actor's birthday in form of ["month", day, year];
};

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com/?i=' + movieId + '&apikey=104aab75')
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let actorsArray = actorArray(movie.Actors);
        let actorsHTML = ""; 
        $.each(actorsArray, (index, actor) => {
            let actorQuery = actor.trim().replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+').replace(' ', '+');
            
            let url = 'http://api.serpstack.com/search?access_key=da87b6e9cacb0ab88053a97e2c24673f&query=' + actorQuery + '+birthday';

            $.get(url, function(data){
                console.log(url)
                console.log(data)
            });

            actorsHTML += `
            <li>${actor}</li>`
        })
        console.log(actorsHTML);
        let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail">
            </div>
            <div>
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item><strong>Director:</strong> ${movie.Director}</li>
                    ${actorsHTML}
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
               
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb></a>
                <a href="index.html" class="btn btn-default">Back to Search</a>
                </hr>
            </div>
        </div>
        `
        

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });

}