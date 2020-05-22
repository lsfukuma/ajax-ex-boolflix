// Predisporre quindi un layout molto semplice con una barra di ricerca e un pulsante: al click sul pulsante fare partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
// Ciclare i risultati e per ogni film restituito, stamparne in pagina:
//
//     titolo
//     titolo originale
//     lingua
//     voto

//quando clicco sul pulsante search
$('#btn-search').click(function(){
    var search = $('#input-search').val()
    console.log(search);
    //fare partire una chiamata ajax a tmdb
    $.ajax({
        'url': 'https://api.themoviedb.org/3/search/movie',
        'method': 'GET',
        'data': {
            'api_key':'239041d19fa5a16a25dff0efb29a6dec',
            'query': search ,
        },
        'success': function(data){
            var films = data.results
            console.log(films);
            for (var i = 0; i < films.length; i++) {
                var filmSearch = films[i]
                console.log(filmSearch);
            }
        },
        'error': function(){

        }

    }) //ajax




}); // click sul pulsante
