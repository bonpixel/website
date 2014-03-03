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
		
		console.log("break");
		//$(').delay(1500).animate({'opacity':'1'},500);
	});
}

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


if ($("#customerquotes").length > 0) {
	//window.setInterval(function(){rotateQuotes(quoteArray);},15000);
	setInterval(function(){rotateQuotes(quoteArray);},5000);
	//setInterval( "rotateQuotes(quoteArray)", 15000 );
	}


	//setInterval(function(){console.log("test");},5000);

	});