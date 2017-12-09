/**
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
		//a = $('<a>', {href: '/'+list.name}).appendTo(ul);
		//
		let a = $('<a >', {onClick: 'listCuisines('+ list.id +', "'+ list.name +'", cityList)'}).appendTo(ul);
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
