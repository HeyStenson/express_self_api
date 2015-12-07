console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	var baseUrl = '/api/profile';
	var favsUrl = '/api/favs';

	$.get(baseUrl, function(data){
		console.log(data.heather[0].days_old);
		$('.info').append('<p> Heather is ' + data.heather[0].days_old + ' days old.</p>')
	});

	$.get(favsUrl, function(data){
		data.favorite_things.forEach(function(fav){
			console.log(fav.thing);
			$('#favs').append('<li>' + fav.thing + '</li>')
		});
	});

});
