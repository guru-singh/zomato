/**
 * [APIKey description]
 * @type {String}
 */
 APIKey = 'e6773c46c9ff362ed63679ca11393f20';
 Mumbai = 3;
 NewYork = 0;
 Nottingham = 0;

/**
 * @param  {[type]}
 * @return {[type]}
 */
function globalAjax(API){

	let url = 'https://developers.zomato.com/api/v2.1/'+API+"?q=NewYork&count=20"
	$.ajax({
  		type: "GET",
  		headers: {
        	'user-key': APIKey,
        	'Content-Type':'application/json'
    	},
  		url: url,
  		data: "json=somedata",
  		processData: false,
  		success: function(msg) {
  			parseResponse(API, msg);
  		},
  		failure:function(msg) {
			alert('failure')
  		}
	});
}


$( document ).ready(function() {
    listCities();
});


function listCities(){
	let me = this;
	globalAjax('cities');
	

}
/**
 * [parseResponse description]
 * @param  {[type]} API         [description]
 * @param  {[type]} responseMsg [description]
 * @return {[type]}             [description]
 */
function parseResponse(API, responseMsg){
	let response = responseMsg,
		locations  =response.location_suggestions
	;
	switch(API){
		case 'cities':
			//console.log('call list cities');
			listCitiesToPage(locations);
		break;
		default:
			console.log('call default');
		break;
	}
	if(response.status === 'success') {
		$.each(locations, function(i, location) {
    		//console.log(location.name);
    		
		})
	}

}


function listCitiesToPage(lists)
{
	let ul = $('#cityList');

	$.each(lists,function(i,list) {
		//a = $('<a>', {href: '/'+list.name}).appendTo(ul);
		//
		let a = $('<a >', {onClick: 'listCuisines('+ list.id +', "'+ list.name +'", cityList)'}).appendTo(ul);
		$('<li>',{text:list.name, class:"text"}).appendTo(a);
		
    	//
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
}



/**
 * set the window title
 * @param {string} title update the window title with give params
 */
function setDocumentTitle(title){
	$(document).prop('title', title);
}


