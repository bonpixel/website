<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8"/>
        <title>Bonpixel :: <?=$title ?> </title>
		<meta name="description" content="Bonpixel Creative: a creative agency specializing in the virtual domain. <?=$description?>" />
		<meta name="keywords" content="Bonpixel, Web Design, Web Developement, Web Design Buckley, Web Design Seattle, Web Design Bellevue, Pierce County Web Design, Washington Web Design, South Sound Web Design, Buckley Creative Services <?=$keywords?>" />

        <!-- The 1140px Grid -->
        <!-- <link rel="stylesheet" href="http://www.bonpixel.com/css/1140.css" type="text/css" media="screen" /> -->


        <link href="http://www.bonpixel.com/css/reset.css" rel="stylesheet" type="text/css" />
        <link href="http://www.bonpixel.com/css/jquery-ui-1.8.11.custom.css" rel="stylesheet" type="text/css" />
        <link href="http://www.bonpixel.com/css/style.css" rel="stylesheet" type="text/css" />

        <script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>

		<script src="https://www.google.com/jsapi?key=ABQIAAAAVrGgPC1mkcRr4_olPUV5shTMbq1HPUTvVsNYRHQg5LWPcakL8hTz4zJQn49IYo8b7yROPYE8gzWZsw" type="text/javascript"></script>
		<script language="Javascript" type="text/javascript">
		//<![CDATA[

		google.load("jquery", "1");
		google.load("jqueryui", "1");

		//]]>
		</script>

		<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>

        <!-- <script src="http://www.bonpixel.com/scripts/jquery.validate.min.js" type="text/javascript"></script> -->
		<!-- <script src="http://www.bonpixel.com/scripts/jquery.prettyphoto.js" type="text/javascript"></script> -->
        <!-- <script src="http://www.bonpixel.com/scripts/core.js" type="text/javascript"></script> -->
		<script src="http://www.bonpixel.com/scripts/core.js" type="text/javascript"></script>
        <script type="text/javascript" src="http://api.recaptcha.net/js/recaptcha_ajax.js"></script>

	<!--[if !IE 7]>
		<style type="text/css">
			#wrap {display:table;height:100%}
		</style>
	<![endif]-->

	<!--<script type="text/javascript">
		 var RecaptchaOptions = {
			theme : 'blackglass'
		 };
	</script>-->

    </head>


    <body>
    	<?php include_once("analyticstracking.php") ?>
        <div id="placeholder"></div> <!-- Used for storing the ajax content to get it's height for dynamic transitions. -->

        <div id="wrap" class="center">
            <div id="main">
                <div class="container">
                    <!-- Logo -->
                   	<div id="bonlogo" class="center">
                        <img src="http://www.bonpixel.com/images/bonpixellogo7.png" width="300" height="150" alt="">
                    </div>
                    <!-- END Logo -->

                    <!-- Header -->
                    <div id="header">
						<img id="toprip" alt=""  src="/images/top_rip2.png">
						<div id="navigation" class="center">
							<ul id="navlist">
								<li><a class="navitem 	homenav" 		href="http://www.bonpixel.com/" onclick="_gaq.push(['_trackEvent', 'navigation', 'home']);return true;">Home</a></li>
								<li><a class="navitem 	portfolionav" 	href="http://www.bonpixel.com/projects" onclick="_gaq.push(['_trackEvent', 'navigation', 'projects']);return true;">Projects</a></li>
								<li><a class="navitem 	aboutnav" 		href="http://www.bonpixel.com/about" onclick="_gaq.push(['_trackEvent', 'navigation', 'about']);return true;">About</a></li>
								<li><a class="navitem 	" 				href="http://www.bonpixel.com/contact" onclick="_gaq.push(['_trackEvent', 'navigation', 'contact']);return true;">Contact / Quote</a></li>
								<li><a class="navitem	" id="blognav" 	href="http://blog.bonpixel.com/">Blog</a></li>
							</ul>
						</div>
                    </div>
                    <!-- END Header -->
