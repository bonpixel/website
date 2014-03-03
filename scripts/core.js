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
if ($("#customerquotes").length > 0) {
	//window.setInterval(function(){rotateQuotes(quoteArray);},15000);
	setInterval(function(){rotateQuotes(quoteArray);},15000);
	//setInterval( "rotateQuotes(quoteArray)", 15000 );
	}

	
	
//tabObj(url,cache,t_height,anchorSelector,section)
//342
//1062
//240
//857
var homeObj = new tabObj('http://www.bonpixel.com/index_content.php','','','',''); //#home
var portfolioObj = new tabObj('http://www.bonpixel.com/portfolio/index_content.php','','','',''); //#portfolio
var aboutObj = new tabObj('http://www.bonpixel.com/about/index_content.php','','','',''); //#about
var contactObj = new tabObj('http://www.bonpixel.com/contact/index_content.php','','','',''); //#contact

var myArray = [];
myArray['#home'] = homeObj;
myArray['#portfolio'] = portfolioObj;
myArray['#about'] = aboutObj;
myArray['#contact'] = contactObj;


/*

//get the cache and height...
	
	$.get('/index_content.php', function(data) {
		homeObj.cache = data;
		$('#placeholder').html(homeObj.cache);
		homeObj.t_height = $('#placeholder').css('height');
		
			$.get('/portfolio/index_content.php', function(data) {
			portfolioObj.cache = data;
			$('#placeholder').html(portfolioObj.cache);
			portfolioObj.t_height = $('#placeholder').css('height');
			
				$.get('/about/index_content.php', function(data) {
				aboutObj.cache = data;
				$('#placeholder').html(aboutObj.cache);
				aboutObj.t_height = $('#placeholder').css('height');
				
					$.get('/contact/index_content.php', function(data) {
					contactObj.cache = data;
					$('#placeholder').html(contactObj.cache);
					contactObj.t_height = $('#placeholder').height()+129+'px';
					$('#placeholder').html('');
					
					//initialiseStateFromURL();
					
				});
				
			});

		});

	});
*/
	
/*
	
//	Home loadTabFromObj function
	$('.homenav').live('click' , function() {
		loadTabFromObj(homeObj);
		return false;
		});
		
//	Portfolio loadTabFromObj function
	$('.portfolionav').live('click' , function() {
		loadTabFromObj(portfolioObj);
		return false;
		});
		
//	About loadTabFromObj function
	$('.aboutnav').live('click' , function() {
		loadTabFromObj(aboutObj);
		return false;
		});
	
//	Contact load() functions
	$('.contactnav').live('click' , function() {
		loadTabFromObj(contactObj);
		//showRecaptcha('recaptchadiv');
		return false;
		});
	
//	Blog load() functions
	var blogUrl = "http://www.bonpixel.com/blog/";
	
		$('#blognav').click(function() {
			if(section === "blog"){
				return false;
			}
			else{
				window.location.hash = "blog";
				$('#ajaxtarget')
					.html(ajax_load)
					.load(blogUrl + ' #container').hide();
				$('#ajaxtarget').css({'width': '70%'});
				animateTab('#actualcontent', '#ajaxtarget', '1536px');
				section = "blog";
				return false;
				//}			
			}
		});	
*/

var ajax_load = "<img class='loading' src='../imgages/load.gif' alt='loading...' />";
var section;
var intTab;
var tabheight;



/*
//	initialiseStateFromURL: function to take the initial window.location.hash and bring up the desired ajax tab   
	function initialiseStateFromURL() {
			intTab = window.location.hash;
			var recentHash = "";
			function pollHash() {
				if (window.location.hash===recentHash) {
					return; // Nothing's changed since last polled.
				}
				recentHash = window.location.hash;
				// URL has changed, update the UI accordingly.
				openTab(intTab);
			}
			
			if(window.location.hash === ''){
				intTab = '#home';
				window.location.hash = 'home';
				}
			//section = intTab;
			openTab(intTab);
		}
*/
		
		
/*	
//	openTab: function for opening each tab. used with initializeStateFromUrl		
//	function openTab(intTab) {
//			loadTabFromObj(myArray[intTab]);
//		}		
		
//	loadTabFromObj: loads the tab based upon the object it is given
//	function loadTabFromObj(myTabObj) {
			if(section === myTabObj.section){
				return false;
			}
			else{
				window.location.hash = myTabObj.section;
				$('#actualcontent #ajaxtarget').animate({'opacity':'0','width': '100%'},500).css({'display':'none'});
				$('#actualcontent').animate({height: myTabObj.t_height},500,"easeOutCubic",function(){
					$('#actualcontent #ajaxtarget')
						.html(myTabObj.cache)
						.css({'display':'block'})
						.delay(500)
						.stop()
						.animate({'opacity':'1'},500);
						if(myTabObj.section === '#contact'){
							showRecaptcha('recaptchadiv');
						}
				});
				//animateTab('#actualcontent', '#actualcontent #ajaxtarget', myTabObj.t_height);
				section = myTabObj.section;
				//$(document).pngFix();
			}
		}

//	animateTab: function that animates the transitions between tabs
	function animateTab(containingTab, contentToLoad, tabHeight) {
			$(containingTab).stop().animate({height: tabHeight},500,"easeOutCubic");
			$(contentToLoad).delay(500).fadeIn('slow');
		}
		
*/


// Check to see if the recaptcha div exsists in order to call the recaptcha function		
	if($('#recaptchadiv').length>0){
		showRecaptcha('recaptchadiv');
		}
					

	
	$('.focusbox').addClass('unactive');  
    $('.focusbox').focus(function() {  
        $(this).stop().animate({
			borderTopColor: '#73A6FF' ,
			borderLeftColor: '#73A6FF' ,
			borderRightColor: '#73A6FF' ,
			borderBottomColor: '#73A6FF' ,
			backgroundColor: '#EFF5FF'}, 250);
        if (this.value === this.defaultValue){  
            this.value = '';  
        }  
        if(this.value !== this.defaultValue){  
            this.select();  
        }  
    });  
    
    $('.focusbox').blur(function() {  
        $(this).stop().animate({
			borderTopColor: '#CCCCCC' ,
			borderLeftColor: '#CCCCCC' ,
			borderRightColor: '#CCCCCC' ,
			borderBottomColor: '#CCCCCC' ,
			backgroundColor: '#eeeeee'}, 250);
        if ($.trim(this.value) === ''){  
            this.value = (this.defaultValue ? this.defaultValue : '');  
        }  
    });


	
	if($('#map_canvas').length > 0){
		initialize();
		}
		

		
		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}
		
		$( "#modal-confirm" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Submit": function() {
					var bValid = true;
					//allFields.removeClass( "ui-state-error" );

					/*
					bValid = bValid && checkLength( name, "username", 3, 16 );
					bValid = bValid && checkLength( email, "email", 6, 80 );
					bValid = bValid && checkLength( password, "password", 5, 16 );

					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. john@bonpixel.com" );
					bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
					*/
					
					
					
					if ( bValid ) {
						/*
						$( "#users tbody" ).append( "<tr>" +
							"<td>" + name.val() + "</td>" + 
							"<td>" + email.val() + "</td>" + 
							"<td>" + password.val() + "</td>" +
						"</tr>" ); 
						*/
						//submitform();
						$('#recaptchaform').submit();
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#send-form" )
			.button()
			.click(function() {
				$( "#modal-confirm" ).dialog( "open" );
				return false;
				//$('#firstcontact').submit();
			});

	function submitform()
	{
		$('#firstcontact').submit();
	}
	
});