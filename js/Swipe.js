function swiper(container){
	
	var element = container.find(":first");
	
	var swipe={};
        // li页面数量
        var slides = element.find(">");
        // 获取容器尺寸
        var width = container.width();
        var height = container.height();
        // 设置li页面总宽度
        element.css({
            width  : (slides.length * width) + 'px',
            height : height + 'px'
        });
        // 设置每一个页面li的宽度
        $.each(slides, function(index) {
            var slide = slides.eq(index); //获取到每一个li元素    
            // ？
            slide.css({
            	width:width+'px',
            	height:height+'px'
            });
        });
        
        swipe.scrollTo=function(x,speed){
        	element.css({
        		transform:'translateX('+(-x)+'px)',
        		transition:'all '+speed+'ms linear'
        	});
        }
        
        return swipe;
}
