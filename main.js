// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
//
//     titolo
//     titolo originale
//     lingua
//     voto

//quando clicco sul pulsante search
$('#btn-search').click(function(){
    searchMovie();
}); // click sul pulsante

//ricerca premendo tasto enter
$('#input-search').keyup(function(event){
    if (event.which == 13) {
        searchMovie();
    }
})

//handlebars
var source   = $("#results-template").html();
var template = Handlebars.compile(source)

//funzione per trovare il film
function searchMovie() {
    var search = $('#input-search').val().trim()
    console.log(search);
    //controllo che l'utente abbia digitato qualcosa
    if (search.length > 1) {
        //svuoto l'input
        $('#input-search').val('');
        //svuoto il html per la prossima ricerca
        $('.card').empty();
        //faccio partire una chiamata ajax a tmdb
        $.ajax({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'data': {
                'api_key':'239041d19fa5a16a25dff0efb29a6dec',
                'query': search ,
                'language': 'pt',
            },
            'success': function(data){
                var movies = data.results
                console.log(movies);
                //con il ciclo for recupero gli oggetti dentro l'array
                for (var i = 0; i < movies.length; i++) {
                    var moviesResults = movies[i]
                    console.log(moviesResults);
                    //dall'OGGETTO prendo le informazioni che mi servono
                    var nameMovie = moviesResults.title;
                    var originalName = moviesResults.original_title;
                    var originalLg = moviesResults.original_language;
                    var averageVote = moviesResults.vote_average;
                    console.log(nameMovie);
                    console.log(originalName);
                    console.log(originalLg);
                    console.log(averageVote);
                    var context = {
                        'title': nameMovie,
                        'title-original': originalName,
                        'original-language': originalLg ,
                        'average-vote': averageVote
                    };
                    var html    = template(context);
                    //appendo con Handlebars
                    $('.container').append(html)
                    
                } //ciclo for
            },
            'error': function(){
                alert('error')
            }
        }) //ajax
    } else {
        alert('digita qualcosa')
    }// fine if
}; // fine funzione
