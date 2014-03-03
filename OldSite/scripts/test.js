$(document).ready(function() {

	 

//fades in the main Bonpixel Logo
	$('#bonlogo').hide().fadeIn(2000);
	$('#ajaxtarget').css({'opacity':'0'});

//Navigaton Animations
	$("#navlist li a").hover(
		function() {
			$(this).stop().animate({
			borderTopColor: '#999999' ,
			borderLeftColor: '#999999' ,
			borderRightColor: '#999999' ,
			borderBottomColor: '#999999' ,
			backgroundColor: '#d3d3d3', color: '#000000'}, 125);
		},
		function() {
			$(this).stop().animate({
			borderTopColor: '#474747' ,
			borderLeftColor: '#474747' ,
			borderRightColor: '#474747' ,
			borderBottomColor: '#474747' ,
			backgroundColor: '#535353', color: '#dfdfdf'}, 1000);
		}
		);
		
//Switch Button	
	$('a.switch_thumb').live('click' , function() {
		if($('a.switch_thumb').hasClass('swap'))
		{
			$(this).removeClass('swap');
			$('ul.display').fadeOut('fast', function() {
				$(this).fadeIn('fast').removeClass('thumb_view');
			return false;
		})}
		else
		{
			$(this).addClass('swap');
			$('ul.display').fadeOut('fast', function() {
			$(this).fadeIn('fast').addClass('thumb_view');
			return false;
		})};
		
	});
	
// ajax text
	
//tabObj(url,cache,t_height,anchorSelector,section)
//342
//1062*
//240
//857
var homeObj = new tabObj('http://www.bonpixel.com/index_content.php','','','','#home');
var portfolioObj = new tabObj('http://www.bonpixel.com/portfolio/index_content.php','','','','#portfolio');
var aboutObj = new tabObj('http://www.bonpixel.com/about/index_content.php','','','','#about');
var contactObj = new tabObj('http://www.bonpixel.com/contact/index_content.php','','','','#contact');

var myArray = new Array();
myArray['#home'] = homeObj;
myArray['#portfolio'] = portfolioObj;
myArray['#about'] = aboutObj;
myArray['#contact'] = contactObj;

$.ajax({async:false});
//get the cache and height...
	/*$.get('/index_content.php', function(data) {
		homeObj.cache = data;
		$('#placeholder').html(homeObj.cache);
		homeObj.t_height = $('#placeholder').css('height');
	});
	$.get('/portfolio/index_content.php', function(data) {
		portfolioObj.cache = data;
		$('#placeholder').html(portfolioObj.cache);
		portfolioObj.t_height = $('#placeholder').css('height');
	});
	$.get('/about/index_content.php', function(data) {
		aboutObj.cache = data;
		$('#placeholder').html(aboutObj.cache);
		aboutObj.t_height = $('#placeholder').css('height');
	});
	$.get('/contact/index_content.php', function(data) {
		contactObj.cache = data;
		$('#placeholder').html(contactObj.cache);
		contactObj.t_height = $('#placeholder').height()+129+'px';
	});*/
	
	
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
					
					initialiseStateFromURL();
					
				});
				
			});

		});

	});
	
	
	
	
	
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
	/*$('#blognav').click(function() {
		if(section == "blog"){
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
	});	*/	

var ajax_load = "<img class='loading' src='../imgages/load.gif' alt='loading...' />";
var section;
var intTab;
var tabheight;

//	tabObj: a functin that initializes each tab object defined
	function tabObj(url,cache,t_height,anchorSelector,section) {
			this.url=url;
			this.cache=cache;
			this.t_height=t_height;
			this.section=section;
		}

//	initialiseStateFromURL: function to take the initial window.location.hash and bring up the desired ajax tab   
	function initialiseStateFromURL() {
			intTab = window.location.hash;
			var recentHash = "";
			function pollHash() {
				if (window.location.hash==recentHash) {
					return; // Nothing's changed since last polled.
				}
				recentHash = window.location.hash;
				// URL has changed, update the UI accordingly.
				openTab(intTab);
			}
			
			if(window.location.hash == ''){
				intTab = '#home';
				window.location.hash = 'home';
				}
			//section = intTab;
			openTab(intTab);
		}
		
//	openTab: function for opening each tab. used with initializeStateFromUrl		
	function openTab(intTab) {
			loadTabFromObj(myArray[intTab]);
		}		
		
//	loadTabFromObj: loads the tab based upon the object it is given
	function loadTabFromObj(myTabObj) {
			if(section == myTabObj.section){
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
						if(myTabObj.section == '#contact'){
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
		


//	showRecaptcha: a function to show the recaptcha div		
	function showRecaptcha(recaptchadiv) {
			Recaptcha.create('6LcCSb0SAAAAAEPIUOyfjDHnbwu_hKM2cayj477_', recaptchadiv, {
				theme: "blackglass" 
				//callback: Recaptcha.focus_response_field
			});
		}
		
		
	
	
	//setInterval(initialiseStateFromURL, 1000);
	
	
	
});