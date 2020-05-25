//ricerca cliccando sul pulsante search
$('.btn-search').click(function(){
    searchMovie();
    // searchSerie();
});

//ricerca premendo tasto enter
$('.input-search').keyup(function(event){
    if (event.which == 13) {
        searchMovie();
        // searchSerie();
    }
})

//handlebars
var source   = $("#results-template").html();
var template = Handlebars.compile(source)

function searchSerie() {
    var searchSerie = $('.input-search').val().trim();
    console.log(searchSerie);
    resetInput();
    if (searchSerie != ''){
        $.ajax({
            'url': 'https://api.themoviedb.org/3/search/tv',
            'method': 'GET',
            'data': {
                'api_key':'239041d19fa5a16a25dff0efb29a6dec',
                'query': searchSerie ,
            },
            'success': function(serie){
                var series = serie.results
                console.log(series);
                //con il ciclo for recupero gli oggetti dentro l'array
                for (var i = 0; i < series.length; i++) {
                    var seriesResults = series[i]
                    console.log(seriesResults);
                    //dall'OGGETTO prendo le informazioni che mi servono
                    var nameSerie = seriesResults.name;
                    var originalNameSerie = seriesResults.original_name;
                    var originalLg = seriesResults.original_language;
                    var averageVote = seriesResults.vote_average;
                    console.log(nameSerie);
                    console.log(originalNameSerie);
                    console.log(originalLg);
                    console.log(averageVote);
                    var context = {
                        'title': nameSerie,
                        'title-original': originalNameSerie,
                        'original-language': originalLg ,
                        'average-vote': averageVote
                    };
                    var html = template(context);
                    //appendo con Handlebars
                    $('.container').append(html)
                } //ciclo for
            },
            'error': function(){
                alert('error')
            }
        }) //ajax
    } else {
        alert('prob parte serie')
    }// fine if
}// fine funzione ricerca serie

//funzione per trovare il film
function searchMovie() {
    var search = $('.input-search').val().trim()
    console.log(search);
    resetInput(); //richiamo la funzione per resettare l'input
    //controllo che l'utente abbia digitato qualcosa
    if (search.length > 0) {
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
                    // ----- Stelle di ranking
                    averageVote = Math.round( averageVote / 2 );
                    //Handlebars
                    var context = {
                        'title': nameMovie,
                        'title-original': originalName,
                        'original-language': originalLg ,
                        'average-vote': averageVote + rating(averageVote)
                    };
                    //-----LINGUA e bandiere
                    if (originalLg == 'en') {
                        $('.flag-country').attr('src', '<img  src="img/en.svg" />')
                    } else if (originalLg =='fr') {
                        $('.flag-country').attr('<img  src="img/fr.svg" />')
                    } else if (originalLg == 'it') {
                        $('.flag-country').attr('<img  src="img/it.svg" />')
                    } else {
                        originalLg
                    }
                    //append handlebars
                    var html    = template(context);
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
}; // fine funzione ricerca film

function resetInput(){
    //svuoto l'input
    $('.input-search').val('');
    //svuoto il html per la prossima ricerca
    $('.card').empty();
}

//genera stelle ranking
function rating(vote){
    var vote = '';
    var starSolide = '';
    for (var i = 0; i < vote; i++) {
        starSolide += '<i class="fas fa-star"></i>'
    }

    var star = '';
    for (var i = 0; i < (5 - vote); i++) {
        star += '<i class="far fa-star"></i>'
    }
    return starSolide + star
}

function flags(){
    var languages = ['en', 'fr' , 'it']
    if(languages.includes(originalLg)){
        return
    }
}
