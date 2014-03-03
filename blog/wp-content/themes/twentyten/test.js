jQuery(document).ready(function() {
	jQuery('#bonlogo').hide().fadeIn(2000); //fades in the main Bonpixel Logo

	jQuery("#menu-bonpixel-nav li").hover(
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
		
	jQuery("a.switch_thumb").toggle(function(){
        jQuery(this).addClass("swap");
        	jQuery("ul.display").fadeOut("fast", function() {
            	jQuery(this).fadeIn("fast").addClass("thumb_view");
        });
    	}, function () {
        jQuery(this).removeClass("swap");
        	jQuery("ul.display").fadeOut("fast", function() {
            	jQuery(this).fadeIn("fast").removeClass("thumb_view");
        });
    }); 
	
	jQuery('#contactme').hide(); //hides the contact div
	jQuery('#contacttab').toggle(  // animates the contact tab??
			function() {
			jQuery('#contactme').stop().animate({
				width: '200px'}, 1000);
			},
			function() {
			jQuery('#contactme').stop().animate({
				width: '0px',
				visibility: 'none',
				overflow: 'hidden'}, 1000);
			});
		
		
	/*jQuery(contactme).css("left","800px");
	jQuery(contactme).animate({"left": "0"}, 2000,*/
	

});
