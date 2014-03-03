jQuery(document).ready(function() {
	
//fades in the main Bonpixel Logo
	jQuery('#bonlogo').hide().fadeIn(2000); 

//Navigaton Animations
	jQuery("#navlist li a").hover(
		function() {
			jQuery(this).stop().animate({
			borderTopColor: '#999999' ,
			borderLeftColor: '#999999' ,
			borderRightColor: '#999999' ,
			borderBottomColor: '#999999' ,
			backgroundColor: '#d3d3d3', color: '#000000'}, 125);
		},
		function() {
			jQuery(this).stop().animate({
			borderTopColor: '#474747' ,
			borderLeftColor: '#474747' ,
			borderRightColor: '#474747' ,
			borderBottomColor: '#474747' ,
			backgroundColor: '#535353', color: '#dfdfdf'}, 1000);
		}
		);
		
//Switch Button	
	jQuery('a.switch_thumb').live('click' , function(){
		if(jQuery('a.switch_thumb').hasClass('swap'))
		{
			jQuery(this).removeClass('swap');
			jQuery('ul.display').fadeOut('fast', function() {
				jQuery(this).fadeIn('fast').removeClass('thumb_view');
			return false;
		})}
		else
		{
			jQuery(this).addClass('swap');
			jQuery('ul.display').fadeOut('fast', function() {
			jQuery(this).fadeIn('fast').addClass('thumb_view');
			return false;
		})};
		
	});
		
		
		
		
// ajax text
	
	
	

	




//declare new objects for tabs
	//function tabObj(url,cache,t_height,anchorSelector,section)
	var homeObj = new tabObj('http://www.bonpixel.com/index_content.php','','','','home');
	var portfolioObj = new tabObj('http://www.bonpixel.com/portfolio/index_content.php','','','','portfolio');
	var aboutObj = new tabObj('http://www.bonpixel.com/about/index_content.php','','','','about');
	var contactObj = new tabObj('http://www.bonpixel.com/contact/index_content.php','','','','contact');
		
//get the cache...
	jQuery.get('http://www.bonpixel.com/index_content.php', function(data){
		homeObj.cache = data;
	});
	jQuery.get('http://www.bonpixel.com/portfolio/index_content.php', function(data){
		portfolioObj.cache = data;
	});
	jQuery.get('http://www.bonpixel.com/about/index_content.php', function(data){
		aboutObj.cache = data;
	});
	jQuery.get('http://www.bonpixel.com/contact/index_content.php', function(data){
		contactObj.cache = data;
	});
	
	
	
	//cache.blog = jQuery.get('http://www.bonpixel.com/blog/index_content.php');
	
	
	/*jQuery.get('http://www.bonpixel.com/index_content.php', function(data){
		cache.home = data;
	});
	jQuery.get('http://www.bonpixel.com/portfolio/index_content.php', function(data){
		cache.portfolio = data;
	});
	jQuery.get('http://www.bonpixel.com/about/index_content.php', function(data){
		cache.about = data;
	});
	jQuery.get('http://www.bonpixel.com/contact/index_content.php', function(data){
		cache.contact = data;
	});
	//cache.blog = jQuery.get('http://www.bonpixel.com/blog/index_content.php');*/
	
		
//	Home load() functions

	jQuery('#homenav').click(function(){
		loadTabFromObj(homeObj);
		return false;
		});
	
	/*var homeUrl = "http://www.bonpixel.com";
	jQuery('#homenav').click(function(){
		if(section == null || section == "#"){
			return false;
		}
		else{
			window.location.hash ="";
			jQuery('#ajaxtarget')
				.html(ajax_load)
				.html(homeObj.cache)
				height = $('#ajaxtarget').height();
				$('#ajaxtarget').hide();
				jQuery('#ajaxtarget').css({'width': '100%'});
			animateTab('#actualcontent', '#ajaxtarget', height);			
			section = "";
			return false;		
		}
	});*/
	
//	load() Portfolio functions

	jQuery('#portfolionav').click(function(){
		loadTabFromObj(portfolioObj);
		return false;
		});
		
	/*var portfolioUrl = "../portfolio/index.php";
	jQuery('#portfolionav').click(function(){
		if(section == "portfolio"){
			return false;
		}
		else{
			window.location.hash = "portfolio";
			jQuery('#ajaxtarget')
				.html(ajax_load)			
				.html(portfolioObj.cache)
				height = $('#ajaxtarget').height();
				$('#ajaxtarget').hide();
				jQuery('#ajaxtarget').css({'width': '100%'});
			animateTab('#actualcontent', '#ajaxtarget', height);
			section = "portfolio";
			return false;
		}
	});*/
	
	
	
//	About load() functions

	jQuery('#aboutnav').click(function(){
		loadTabFromObj(aboutObj);
		return false;
		});
		
	/*var aboutUrl = "../about/index.php";
	jQuery('#aboutnav').click(function(){
		if(section == "about"){
			return false;
		}
		else{
			window.location.hash = "about";
			jQuery('#ajaxtarget')
				.html(ajax_load)
				.html(aboutObj.cache)
				height = $('#ajaxtarget').height();
				$('#ajaxtarget').hide();
				jQuery('#ajaxtarget').css({'width': '100%'});
			animateTab('#actualcontent', '#ajaxtarget', height);
			section = "about";
			return false;
		}
	});*/
	
//	Contact load() functions
	var contactUrl = "../contact/index.php";
	jQuery('#contactnav').click(function(){
		if(section == "contact"){
			return false;
		}
		else{
			window.location.hash = "contact";
			jQuery('#ajaxtarget')
				.html(ajax_load)
				.load(contactUrl + ' #ajaxtarget', function(){
					showRecaptcha('recaptchadiv');
				}).hide();
				jQuery('#ajaxtarget').css({'width': '100%'});
			animateTab('#actualcontent', '#ajaxtarget', '986px');
			section = "contact";
			return false;
			//}			
		}
	});
	
	
//	Blog load() functions
	var blogUrl = "http://www.bonpixel.com/blog/";
	jQuery('#blognav').click(function(){
		if(section == "blog"){
			return false;
		}
		else{
			window.location.hash = "blog";
			jQuery('#ajaxtarget')
				.html(ajax_load)
				.load(blogUrl + ' #container').hide();
			//#primary
			jQuery('#ajaxtarget').css({'width': '70%'});
			animateTab('#actualcontent', '#ajaxtarget', '1536px');
			section = "blog";
			return false;
			//}			
		}
	});		
	
	
	/*
	var cache = new Object();
	
	function doSomethingWithData(data) {
		cache.portfolio = data;
		//alert(cache.portfolio);
		document.getElementById('ajaxtarget').innerHTML = cache.portfolio;
		
	}
	
	//getting page
	$.get('http://www.bonpixel.com/portfolio/index.php', doSomethingWithData);
	//$('#ajaxtarget').load('../portfolio/index.php'+ ' #ajaxtarget', doSomethingWithData);
	
	//$.('#ajaxtarget').html(cache.portfolio);
	
	*/
	
	
	

});

var ajax_load = "<img class='loading' src='../imgages/load.gif' alt='loading...' />";
var section;

function tabObj(url,cache,t_height,anchorSelector,section)
	{
		this.url=url;
		this.cache=cache;
		this.t_height=t_height;
		this.section=section;
		
	}

function loadTabFromObj(myTabObj)
	{
		if(section == myTabObj.section){
			return false;
		}
		else{
			//window.location.hash ="";
			jQuery('#ajaxtarget')
				//.html(ajax_load)
				.html(myTabObj.cache);
				height = $('#ajaxtarget').height();
				jQuery('#ajaxtarget').hide();
				jQuery('#ajaxtarget').css({'width': '100%'});
			animateTab('#actualcontent', '#ajaxtarget', height);			
			section = myTabObj.section;
			return false;		
		}
		return false;
	}
	


//function that animates the transitions between tabs
function animateTab(containingTab, contentToLoad, tabHeight){
		jQuery(containingTab).stop().animate({height: tabHeight},500,"easeOutCubic");
		jQuery(contentToLoad).delay(500).fadeIn('slow');
	}

	
	
	
function calcHeight(){
	window.tabheight = jQuery('#ajaxtarget').css("height");
	//alert("inside of the function "+ window.tabheight);
	}
	
	
	
window.onload = function() {
     initialiseStateFromURL();
   }
   var intTab;
   var tabheight;
   
   function initialiseStateFromURL() {
		var initialTab = window.location.hash;
		var len = initialTab.length;
		intTab = initialTab.substring(1,len);
		section = intTab;
		openTab(intTab);
   }
   function openTab(intTab){
		
		jQuery('#ajaxtarget')
			.load('../'+ intTab + '/' + ' #ajaxtarget', calcHeight
				//window.tabheight = jQuery('#ajaxtarget').css("height");
				//alert("inside of the function "+ window.tabheight);
				//window.tabheight = tabheight;
				).hide();
			//alert("outside of the function "+ window.tabheight);	
		//contab = '#actualcontent';
		//con = '#ajaxtarget'; 
		animateTab('#actualcontent', '#ajaxtarget', tabheight);
		//section = intTab;
		
		return false;
		
	}
	
	
	/*
	function CustomTabLoader
	{
		getTab()
		//assign to cache
		getHeight()
		//get height of element
		
		.hide
		//hide the tab
		.animate
		//bring the tab into view via sleek animation
	}
	
	function getTab()
	{
		//get tab and assign to cache
		$.get("../"+specifiedtab+"/index.php", function(){
			//can i specify the element here??
		})
		
	}
	function getheight()
	{
		cache.specifiedTab.height = tabheight;
	}
	
	
	*/
	
	
	
	