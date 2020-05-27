//api key e url tmdb per la chiamata ajax
var ajaxUrl = 'https://api.themoviedb.org/3/'
var apiKey = '239041d19fa5a16a25dff0efb29a6dec'

//ricerca cliccando sul pulsante search
$('.btn-search').click(function(){
    search();
});

//ricerca premendo tasto enter
$('.input-search').keyup(function(event){
    if (event.which == 13) {
        search();
    }
});

//handlebars
var source   = $("#results-template").html();
var template = Handlebars.compile(source)

//funzione per trovare i film e anche le serie
function search() {
    var search = $('.input-search').val().trim()
    resetInput(); //richiamo la funzione per resettare l'input e l html
    //controllo che l'utente abbia digitato qualcosa
    if (search.length > 1) {
        //faccio partire una chiamata ajax a tmdb
        $.ajax({
            'url': ajaxUrl + 'search/movie',
            'method': 'GET',
            'data': {
                'api_key': apiKey ,
                'query': search ,
                'language': 'en',
            },
            'success': function(data){
                var movies = data.results
                //con il ciclo for recupero gli oggetti dentro l'array
                for (var i = 0; i < movies.length; i++) {
                    var moviesResults = movies[i]
                    console.log(moviesResults);
                    //dall'OGGETTO prendo le informazioni che mi servono
                    var nameMovie = moviesResults.title;
                    var originalName = moviesResults.original_title;
                    var originalLg = moviesResults.original_language;
                    var averageVote = moviesResults.vote_average;
                    var posterMovie = moviesResults.poster_path
                    //Handlebars
                    var context = {
                        'poster': poster(posterMovie),
                        'title': movies[i].title,
                        'title-original': originalName,
                        'original-language': flags(originalLg),
                        'average-vote': rating(averageVote) ,
                        'overview': overview(moviesResults.overview) ,
                    };
                    //append handlebars
                    var html = template(context);
                    $('.container').append(html)
                } //ciclo for
            },
            'error': function(){
                alert('error')
            }
        }) //ajax film
        //chiamata ajax per le serie tv
        $.ajax({
            'url': ajaxUrl + 'search/tv',
            'method': 'GET',
            'data': {
                'api_key': apiKey ,
                'query': search ,
                'language': 'pt' ,
            },
            'success': function(serie){
                var series = serie.results
                //con il ciclo for recupero gli oggetti dentro l'array
                for (var i = 0; i < series.length; i++) {
                    var seriesResults = series[i]
                    //dall'OGGETTO prendo le informazioni che mi servono
                    var nameSerie = seriesResults.name;
                    var originalNameSerie = seriesResults.original_name;
                    var originalLg = seriesResults.original_language;
                    var averageVote = seriesResults.vote_average;
                    var posterSerie = seriesResults.poster_path
                    var context = {
                        'poster': poster(posterSerie) ,
                        'title': nameSerie,
                        'title-original': originalNameSerie,
                        'original-language': flags(originalLg) ,
                        'average-vote': rating(averageVote) ,
                        'overview': overview(seriesResults.overview)
                    };
                    var html = template(context);
                    //appendo con Handlebars
                    $('.container').append(html)
                } //ciclo for
            },
            'error': function(){
                alert('error')
            }
        }) //ajax series
    } else {
        alert('digita qualcosa')
    }// fine if che controlla l'input
}; // fine funzione ricerca film/serie

function resetInput(){
    //svuoto l'input
    $('.input-search').val('');
    //svuoto il html per la prossima ricerca
    $('.container').empty();
}

// function makeCard(){
//     var series = serie.results
//     //con il ciclo for recupero gli oggetti dentro l'array
//     for (var i = 0; i < series.length; i++) {
//         var seriesResults = series[i]
//         //dall'OGGETTO prendo le informazioni che mi servono
//         var nameSerie = seriesResults.name;
//         var originalNameSerie = seriesResults.original_name;
//         var originalLg = seriesResults.original_language;
//         var averageVote = seriesResults.vote_average;
//         var posterSerie = seriesResults.poster_path
//         var context = {
//             'poster': poster(posterSerie) ,
//             'title': nameSerie,
//             'title-original': originalNameSerie,
//             'original-language': flags(originalLg) ,
//             'average-vote': rating(averageVote) ,
//             'overview': overview(seriesResults.overview)
//         };
//         var html = template(context);
//         //appendo con Handlebars
//         $('.container').append(html)
//     } //ciclo for
// };

//genera stelle ranking
function rating(vote){
    var vote = Math.round( vote / 2 ) ;
    var starFull = '';
    for (var i = 1; i <= vote; i++) {
        starFull+= '<i class="fas fa-star"></i>'
    }

    var star = '';
    for (var i = 0; i < (5 - vote); i++) {
        star += '<i class="far fa-star"></i>'
    }
    return starFull + star
};

//funzione per aggiungere le bandiere disponibili
function flags(language){
    var flagsLanguage = ['en', 'fr' , 'it' , 'ru' , 'pt' , 'de' , 'es' , 'da' , 'ja']
    if(flagsLanguage.includes(language)){
        return '<img src="img/' + language + '.svg" alt="">';
    }
    return language.toUpperCase();
};

//funzione per i poster
function poster(urlposter) {
    var posterUrl = 'https://image.tmdb.org/t/p/'
    var posterSize = 'w342'
    if (urlposter !== null) {
        return  posterUrl + posterSize + urlposter;
    }
        return '<img src="img/poster_not_available.jpg" alt="">';
};

//Overview
function overview(text){
    if (text == '') {
        return 'is not available';
    }
    return text;
};
