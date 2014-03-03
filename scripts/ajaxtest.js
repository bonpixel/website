$.ajaxSetup ({
		cache: false
	});
	var ajax_load = "<img class='loading' src='img/load.gif' alt='loading...' />";
	
//	load() functions
	var loadUrl = "http://www.bonpixel.com/portfolio/index.php";
	$("a #portfolionav").click(function(){
		$("#result")
			.html(ajax_load)
			.load(loadUrl);
	});