const express = require('express');
const [ movieSearch, getSimilarMovies ] = [require('./movie-look-up'),require('./movie-look-up')];

const app = express();
//setting my port number
const port = 3000;
app.use(express.static("Public"))

//this is to handle the GET requests to '/search' endpoint
app.get('/search', (req, res) => {
  //taking the 'title' query parameter from the request
    const title = req.query.title;
    console.log(title)
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWIyNDRhOTcyZWIyZGEwMTgyODM1MGQ5MTFlMzg3OSIsInN1YiI6IjY2NmI4MGQ4ODhmYzAwNjQxZjM4MmI2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFp-i5FmcOUfoqu-Lr_XI-pxE3_Mx7_zbp0R23o-v8'
  }
};

//This is to Fetch the movie data from the movie search API
fetch(url, options)
  .then(response => response.json())
  .then(json => {
    //the 0 index means thats we're going to extract the first result from the search results
    const firstResult = json.results[0]
    
const url2 = `https://api.themoviedb.org/3/movie/${firstResult.id}/similar?language=en-US&page=1`;
const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWIyNDRhOTcyZWIyZGEwMTgyODM1MGQ5MTFlMzg3OSIsInN1YiI6IjY2NmI4MGQ4ODhmYzAwNjQxZjM4MmI2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CeFp-i5FmcOUfoqu-Lr_XI-pxE3_Mx7_zbp0R23o-v8'
  }
};
//Fetch similar movies data using the movie ID from the first result
fetch(url2, options2)
  .then(response2 => response2.json())
  .then(json => res.json(json)) //Send JSON response containing similar movies data
  .catch(err => console.error('error:' + err));
 
  })
  .catch(err => console.error('error:' + err));
  
    // if (!title) {
    //     return res.status(400).send({response:'Please provide a movie title.'});
    // }

    // movieSearch(title, (error, data) => {
    //     if (error) {
    //         return res.status(500).send(error);
    //     }

    //     getSimilarMovies(data.id, (error, similarMovies) => {
    //         if (error) {
    //             return res.status(500).send(error);
    //         }
            
    //         res.send({
    //             movieId: data.id,
    //             similarMovies: similarMovies.map(movie => movie.title)
    //         });
    //     });
    // });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
