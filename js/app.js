
/**new comments added by avi *//**
 * [APIKey description]
 * @type {String}
 */
 APIKey = 'e6773c46c9ff362ed63679ca11393f20';
 Mumbai = 3;
 NewYork = 0;
 Nottingham = 0;
 Blank  = 'blank';
 baseUrl = 'https://developers.zomato.com/api/v2.1/';


$( document ).ready(function() {
    listCities();
 // listCollections();
});



/**
 * set the window title
 * @param {string} title update the window title with give params
 * just added
 */
function setDocumentTitle(title){
	$(document).prop('title', title);
}



function listCities(){
	let me = this;
	let url = baseUrl + 'cities?q=NewYork&count=20'
	globalAjax(url, 'listCity');
	

}


function listCitiesToPage(lists)
{
	let ul = $('#cityList');

	$.each(lists,function(i,list) {
		//let a = $('<a >', {onClick: 'listCuisines('+ list.id +', "'+ list.name +'", cityList)'}).appendTo(ul);
		let a = $('<a >', {onClick: 'listCollections('+ list.id +', "'+ list.name +'")'}).appendTo(ul);
		$('<li>',{text:list.name, class:"text"}).appendTo(a);
   	
	});
}

/**
 * [listCuisinesToPage description]
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function listCuisinesToPage(lists) {
	let ul = $('#cuisinesList'),
	cuisine = ''
	;
	$.each(lists,function(i,list) {
	cuisine = list.cuisine;
			let a = $('<a >', {onClick: 'listCuisines('+ cuisine.cuisine_id +', "'+ cuisine.cuisine_name +'", cityList)'}).appendTo(ul);
		$('<li>',{text:cuisine.cuisine_name, class:"text"}).appendTo(a);
	});


}


function listCollectionToPage(lists){
	let ul = $('#cityCollection'),
	collection = '',
	collectionData = {}
	;

	$.each(lists,function(i,list) {
	collection = list.collection;
	if(i % 2 === 0 ) {
		div = $('<div class="container">').appendTo(ul);
	}
	// collectionData = {
	// 	text : collection.title,
	// 	class : 'text col-md-6'
	// } 
	//span = $('<span>',collectionData).appendTo(div);
	span = $('<span>', {class : 'text col-md-6 px-2'}).appendTo(div);
	$('<p>', {text: collection.title}).appendTo(span);
	$('<img>', {src: collection.image_url}).appendTo(span);
	$('<p>', {text: collection.description}).appendTo(span);
	


	//		let a = $('<a >', {onClick: 'listCuisines('+ collection.cuisine_id +', "'+ collection.cuisine_name +'", cityList)'}).appendTo(ul);
		//$('<span >',{text:collection.title, class:"text"}).appendTo(ul);
	});
}

/**
 * [listCuisines description]
 * @param  {[type]} cityID   [description]
 * @param  {[type]} cityName [description]
 * @param  {[type]} prevEl   [description]
 * @return {[type]}          [description]
 */
function listCuisines(cityID, cityName, prevEl) {
	$('#cityList').hide("slide");
	this.setDocumentTitle(cityName);
	let url = baseUrl + 'cuisines?city_id='+ cityID +'&lat=&lon=&count=20';
	globalAjax(url, 'listCuisines', cityID);

}





/**
 * @param  {[type]}
 * @return {[type]}
 */
function globalAjax(URL, event	){

	
	$.ajax({
  		type: "post",
  		headers: {
        	'user-key': APIKey,
        	'Content-Type':'application/json'
    	},
  		url: URL,
  		data: "json=somedata",
  		processData: false,
  		success: function(msg) {
  			parseResponse(event, msg);
  		},
  		failure:function(msg) {
			alert('failure')
  		}
	});
}


/**
 * [parseResponse description]
 * @param  {[type]} API         [description]
 * @param  {[type]} responseMsg [description]
 * @return {[type]}             [description]
 */
function parseResponse( event, responseMsg){
	let response = responseMsg,
	obj

	;
	switch(event){
		case 'listCity':
			//console.log('call list cities');
			obj = response.location_suggestions;
			listCitiesToPage(obj);
		break;
		case 'listCuisines':
			obj = response.cuisines;
			listCuisinesToPage(obj);
			console.log('call list Cuisines');
		break;
		case 'listCityCollections':
			obj = response.collections;
			console.log(response);
			listCollectionToPage(obj);
			console.log('call list City Collections');
		break;
		default:
			console.log('call default');
		break;
	}
	
	// if(response.status === 'success') {
	// 	$.each(locations, function(i, location) {
 //    		//console.log(location.name);
    		
	// 	})
	// }

}


function ListLocations(){

		let url = baseUrl + '/location_details?entity_id=36932&entity_type=group&count=20';
	globalAjax(url, 'listCuisines', cityID);

}

function listCollections(cityId, cityname, ){
	
	let url = baseUrl + 'collections?city_id='+ cityId;
	globalAjax(url, 'listCityCollections');

}


/*eof*/	