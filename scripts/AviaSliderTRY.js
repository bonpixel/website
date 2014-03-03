 eval document.documentElement.className+='js_active';(function($){	$.fn.aviaSlider=function(g){
	var h={
		slides:'li',
		animationSpeed:900,
		autorotation:true,
		autorotationSpeed:3,
		appendControlls:'',
		slideControlls:'items',
		blockSize:{height:'full',width:'full'},
		betweenBlockDelay:60,
		display:'topleft',
		switchMovement:false,
		showText:true,
		transition:'fade',
		backgroundOpacity:0.8,
		transitionOrder:['diagonaltop','diagonalbottom','topleft','bottomright','random']};	var j=	$.extend(h,g);
		return this.each(function(){
		var f= 
			$(this),
			slides=f.find(j.slides),
			slideImages=slides.find('img'),
			slideCount=slides.length,
			slideWidth=slides.width(),
			slideHeight=slides.height(),
			blockNumber=0,
			currentSlideNumber=0,
			reverseSwitch=false,
			currentTransition=0,
			current_class='active_item',
			controlls='',
			skipSwitch=true,interval='',
			blockSelection='',
			blockSelectionJQ='',
			blockOrder=[];		
		if(j.blockSize.height=='full'){j.blockSize.height=slideHeight}
		if(j.blockSize.width=='full'){j.blockSize.width=slideWidth}
		
		
		f.methods={init:function(){
			var a=0,posY=0,generateBlocks=true,bgOffset='';			slides.filter(':first').css({'z-index':'5',display:'block'});		
			while(generateBlocks){blockNumber++;		
			bgOffset="-"+a+"px -"+posY+"px";			$('<div class="kBlock"></div>').appendTo(f).css({
				zIndex:20,
				position:'absolute',
				display:'none',
				left:a,
				top:posY,
				height:j.blockSize.height,
				width:j.blockSize.width,
				backgroundPosition:bgOffset
				});
					a+=j.blockSize.width;
						if(a>=slideWidth){a=0; posY+=j.blockSize.height}
			if(posY>=slideHeight){generateBlocks=false}}blockSelection=f.find('.kBlock');			blockOrder['topleft']= blockSelection;			blockOrder['bottomright']= $(blockSelection.get().reverse());			blockOrder['diagonaltop']= f.methods.kcubit(blockSelection);			blockOrder['diagonalbottom']= f.methods.kcubit(blockOrder['bottomright']);			blockOrder['random']= f.methods.fyrandomize(blockSelection);	
			slides.each(function(){				$.data(this,"data",{img: $(this).find('img').attr('src')})
				});
							if(slideCount<=1){
				f.aviaSlider_preloadhelper({delay:200})
				}
			else{
				f.aviaSlider_preloadhelper({callback:f.methods.preloadingDone});
				f.methods.appendControlls().addDescription()
				}
		},
		
		appendControlls:function(){
			if(j.slideControlls=='items'){
				var b=j.appendControlls||f[0];
								controlls= $('<div></div>').addClass('slidecontrolls').insertAfter(b);				
				slides.each(function(i){
					var a= $('<a href="#" class="ie6fix '+current_class+'"></a>').appendTo(controlls);					a.bind('click',{currentSlideNumber:i},f.methods.switchSlide);					current_class=""}
					);
									controlls.width(controlls.width()).css('float','none')
			}
			return this
		},
	
		addDescription:function(){
			if(j.showText){
				slides.each(function(){
					var a= $(this),description=a.find('img').attr('alt'),splitdesc=description.split('::');					if(splitdesc[0]!=""){if(splitdesc[1]!=undefined){description="<strong>"+splitdesc[0]+"</strong>"+splitdesc[1]}else{description=splitdesc[0]}}if(description!=""){						$('<div></div>').addClass('feature_excerpt').html(description).css({display:'block','opacity':j.backgroundOpacity}).appendTo(a.find('a'))
					}
				})
			}
		},
		
		preloadingDone:function(){
			skipSwitch=false;			slides.css({'backgroundColor':'transparent','backgroundImage':'none'});			if(j.autorotation){
				f.methods.autorotate();				slideImages.bind("click",function(){clearInterval(interval)})
			}
		},
		
		autorotate:function(){
			interval=setInterval(function(){
				currentSlideNumber++;				if(currentSlideNumber==slideCount)currentSlideNumber=0;				f.methods.switchSlide()
			},
			(parseInt(j.autorotationSpeed)*1000)+(j.betweenBlockDelay*blockNumber)+j.animationSpeed)
		},
		
		switchSlide:function(c){
			var d=false;			if(c!=undefined&&!skipSwitch){
				if(currentSlideNumber!=c.data.currentSlideNumber){currentSlideNumber=c.data.currentSlideNumber}
				else{d=true}
			}
			if(c!=undefined)clearInterval(interval);			if(!skipSwitch&&d==false){
				skipSwitch=true;				var e=slides.filter(':visible'),nextSlide=slides.filter(':eq('+currentSlideNumber+')'),
				nextURL= $.data(nextSlide[0],"data").img,nextImageBG='url('+nextURL+')';			if(j.slideControlls){
				controlls.find('.active_item').removeClass('active_item');				controlls.find('a:eq('+currentSlideNumber+')').addClass('active_item')
				}
				blockSelectionJQ=blockOrder[j.display];				slides.find('>a>img').css({opacity:1,visibility:'visible'});
							if(j.switchMovement&&(j.display=="topleft"||j.display=="diagonaltop")){
				if(reverseSwitch==false){
					blockSelectionJQ=blockOrder[j.display];					reverseSwitch=true
					}
				else{
					if(j.display=="topleft")blockSelectionJQ=blockOrder['bottomright'];					if(j.display=="diagonaltop")blockSelectionJQ=blockOrder['diagonalbottom'];					reverseSwitch=false
					}
			}
			if(j.display=='random'){
				blockSelectionJQ=f.methods.fyrandomize(blockSelection)
				}
			if(j.display=='all'){				blockSelectionJQ=blockOrder[j.transitionOrder[currentTransition]];				currentTransition++;				if(currentTransition>=j.transitionOrder.length)currentTransition=0				}						blockSelectionJQ.css({backgroundImage:nextImageBG}).each(function(i){var b=$(this);
					setTimeout(function(){var a=new Array();			if(j.transition=='drop'){				a['css']={					height:1,					width:j.blockSize.width,					display:'block',					opacity:0};				a['anim']={					height:j.blockSize.height,width:j.blockSize.width,opacity:1}			}			else if(j.transition=='fade'){				a['css']={display:'block',opacity:0};				a['anim']={opacity:1}				}			else{a['css']={color:'black', background-color:'#ff9999'}						//{a['css']={display:'block',opacity:0};a['<b style="color:black;background-color:#ffff66">anim</b>']={<b style="color:black;background-color:#a0ffff">opacity:1</b>}}<b //style="color:black;background-color:#99ff99">else</b>{a['<b style="color:black;background-color:#ff9999">c</b>				