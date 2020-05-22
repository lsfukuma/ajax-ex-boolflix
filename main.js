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
            'language': 'pt',
        },
        'success': function(data){
            var films = data.results
            console.log(films);
            //con il ciclo for recupero gli oggetti dentro l'array
            for (var i = 0; i < films.length; i++) {
                var filmResults = films[i]
                console.log(filmResults);
                //dall'OGGETTO prendo le informazioni che mi servono
                var nameFilm = filmResults.title;
                var originalName = filmResults.original_title;
                var originalLg = filmResults.original_language;
                var averageVote = filmResults.vote_average;
                console.log(nameFilm);
                console.log(originalName);
                console.log(originalLg);
                console.log(averageVote);
                 $('ul').append("<li>" + nameFilm + "</li>");
                 $('ul').append("<li>" + originalName
                  + "</li>");
                 $('ul').append("<li>" +'lingua original: '+ originalLg
                  + "</li>");
                 $('ul').append("<li>" + 'voto médio: ' + averageVote
                  + "</li>");
            } //ciclo for
        },
        'error': function(){
            alert('error')
        }
    }) //ajax




}); // click sul pulsante
