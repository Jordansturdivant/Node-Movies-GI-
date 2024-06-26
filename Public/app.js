//This references the input element and the container for the movie results
const textinput = document.getElementById('textInput')
const movie_holder = document.getElementById('movie_holder')

//with this im adding a event listener for the 'keydown' event on the text input
textinput.addEventListener('keydown',event=>{
    if (event.key==="Enter"){
        console.log(textinput.value)
    
    // We'll Construct the URL for the API request using the input value
    const url= window.location.origin+`/search?title=${textinput.value}`
     fetch(url)
       .then(response => response.json())
       .then(data => {
        console.log(movie_holder)
        movie_holder.innerHTML=""
       data.results.forEach(movie => {
         //show a paragraph element with the movie title to the movie holder
            movie_holder.innerHTML+=`<p>${movie.title}</p>`
       })
       })
        //Log any errors that occur during the fetch or data handling
       .catch(err => console.error(err));
    }
})

