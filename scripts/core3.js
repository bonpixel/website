///////////////////////////
// Function Declarations //
///////////////////////////

//Function to initialize the quoteObj
function quoteObj(text,cname,ccompany,url,height) {
		this.text=text;
		this.cname=cname;
		this.ccompany=ccompany;
		this.url=url;
		this.height=height;
	}
	
//tabObj: a functoin that initializes each tab object defined
function tabObj(url,cache,t_height,anchorSelector,section) {
		this.url=url;
		this.cache=cache;
		this.t_height=t_height;
		this.section=section;
	}
		
//Function used for animating the trasition between heights. 
function adjustHeight(baseHeight, currentHeight, divToAnimate){
	$(divToAnimate).css({'overflow' : 'hidden'});
	if(currentHeight > baseHeight){
		$(divToAnimate).stop().animate({height: currentHeight+'px'},500,"easeOutCubic");
		}
	if(currentHeight < baseHeight && ($(divToAnimate).height()) > baseHeight){
		$(divToAnimate).stop().animate({height: baseHeight+'px'},500,"easeOutCubic");
		}
	}

//showRecaptcha: a function to show the recaptcha div		
function showRecaptcha(recaptchadiv) {
		Recaptcha.create('6LcCSb0SAAAAAEPIUOyfjDHnbwu_hKM2cayj477_', recaptchadiv, {
			theme: "blackglass" 
			//callback: Recaptcha.focus_response_field
		});
	}

//Google Maps
//Latitude: 47.1613746 - Longitude: -122.01991
function initialize() {
		var latlng = new google.maps.LatLng(47.161, -122.019);
		var myOptions = {zoom: 12, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP};
		var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	}


	



	
///////////////////////////
//    Document Ready     //
///////////////////////////

$(document).ready(function() {

var randomnumber = 1;
var rotationArray = [];
var v = 0;
var lastnumber = -1;
var cHeight = 0;
//var zcounter = 0;
		
function rotateQuotes(quoteHolderArray){	
	if(quoteHolderArray.length <= 1){
		return false;
	}
	else{
		randomnumber = Math.floor(Math.random() * (quoteHolderArray.length));
		if(v === (quoteHolderArray.length)){
			rotationArray.length = 0;
			v = 0;
		}
		while(randomnumber === rotationArray[randomnumber] || randomnumber === lastnumber){
			randomnumber = Math.floor(Math.random() * (quoteHolderArray.length));
		}	
		
		lastnumber = randomnumber;
		rotationArray[randomnumber] = randomnumber;
		++v;

		animateQuotes(randomnumber);
	}
}

function animateQuotes(rnum){
	$('#ctext, #cname, #ccompany').stop().animate({'opacity':'0'},2000, function(){
		$('#ctext').html(quoteArray[rnum].text);
		$('#cname').html('- ' + quoteArray[rnum].cname);
		$('#ccompany').html(quoteArray[rnum].ccompany);
		
		cHeight = $('#customerquotes').height();
		adjustHeight(bHeight,cHeight,divtoanim);
		
		$('#ctext')
		.stop()
		.delay(500)
		.animate({'opacity':'1'},500);
		
		$('#cname, #ccompany')
		.stop()
		.delay(1500)
		.animate({'opacity':'1'},500);
		
		//console.log("break");
		//$(').delay(1500).animate({'opacity':'1'},500);
	});
}





//fades in the main Bonpixel Logo
	$('#bonlogo').hide().fadeIn(2000);
	$('#ajaxtarget').css({'opacity':'0'});
		
//Navigaton Animations
	$("#navlist li a").hover(
		function() {
			$(this).parent().stop().animate({
			borderTopColor: '#999999' ,
			borderLeftColor: '#999999' ,
			borderRightColor: '#999999' ,
			borderBottomColor: '#999999' ,
			backgroundColor: '#d3d3d3', color: '#000000'}, 125);
			$(this).stop().animate({color: '#000000'}, 125);
		},
		function() {
			$(this).parent().stop().animate({
			borderTopColor: '#474747' ,
			borderLeftColor: '#474747' ,
			borderRightColor: '#474747' ,
			borderBottomColor: '#474747' ,
			backgroundColor: '#535353', color: '#dfdfdf'}, 1000);
			$(this).stop().animate({color: '#dfdfdf'}, 1000);
		}
		);
		
// Closes all of the project sections except the first.	
	$('.innerpcontainer:not(:first)').hide();
	
	
//Creates Highlight over each project header on mouseOver	
	$('.titlebar').hover(
	function() {
		$(this).stop().animate({backgroundColor: '#888888'}, 125);
		$('a', this).stop().animate({color: '#fffffa'}, 125);
	},
	function() {
		$(this).stop().animate({backgroundColor: '#fffffa'}, 250);
		$('a', this).stop().animate({color: '#000000'}, 250);		
	}
	);
	

// Project accordian
	$('.titlebar').live('click' , function() {
		if($(this).parent().next().children().is(":hidden")){
			$(this).parent().next().children().slideDown(1000, 'easeOutBounce');
			//$(this).animate({backgroundColor: '#888888', color: '#fffffa'}, 500);
			return false;
		} 
		else{
			$(this).parent().next().children().slideUp(1000,'easeOutBounce');
			//$(this).animate({backgroundColor: '#fffffa', color: '#797979'}, 500);
			return false;
		}
	});

//Checks to see if customerquotes exsists. 
// Populate my quotes Object with the quotation information from the XML sheet.	
if ($("#customerquotes").length > 0) { 

	var qObj = new quoteObj('','','','');
	var quoteArray = [];
	var counter = 0;

	$.ajax({
		type: "GET",
		url: "quotes.xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find('quote').each(function(){
				quoteArray[counter] = new quoteObj('','','','');
				console.log(quoteArray[counter]);
				quoteArray[counter].text = $(this).find('text').text();
				quoteArray[counter].cname = $(this).find('customer_name').text();
				quoteArray[counter].ccompany = $(this).find('customer_company').text();
				quoteArray[counter].url = $(this).find('project').text();
				++counter;
			});
		}
	});
}	


var divtoanim = $('#customerquotes').parent();
 
// Determines the largest bottom box to set the base height for the animation transitions. 
if($('#rightbox').height() > $('#customerquotes').height()){
		bHeight = $('#rightbox').height();
	}
	else {
		bHeight = $('#customerquotes').height();
	}
	

// Give the innershadow a height so that overflow hidden works with the quotations. 
$(divtoanim).css({'height' : bHeight});

// Checks to see if #customerquotes exsists and executes code accordingly
if ($("#customerquotes").length > 0){
	setInterval(function(){rotateQuotes(quoteArray);},15000);
	}

	
	});