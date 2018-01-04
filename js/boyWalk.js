function boyWalk(){
	var container = $("#content");

	var visualWidth = container.width();
	var visualHeight = container.height();
	
	var swipe = swiper(container);
	
	var width=container.width();
	// 获取数据
	var getValue = function(className) {
	    var $elem = $('' + className + '');
	        // 走路的路线坐标
	    return {
	        height: $elem.height(),
	        top: $elem.position().top
	    };
	};
	
	// 路的Y轴
	var pathY = function() {
	    var data = getValue('.a_background_middle');
	    return data.top + data.height / 2;
	}();
	
	var $boy = $("#boy");
	var boyHeight = $boy.height();
	
	$boy.css({
		top: pathY - boyHeight + 25
	});
	
	
	
	function restoreWalk() {
		$boy.removeClass('pauseWalk');
	}
	
	// css3的动作变化
	function slowWalk() {
	    $boy.addClass('slowWalk');
	}
	
	// 计算移动距离
	function calculateDist(direction, proportion) {
	    return (direction == "x" ?
	        visualWidth : visualHeight) * proportion;
	}
	
	
	// 用animate做运动
	function startRun(options, runTime) {
	    var dfdPlay = $.Deferred();
	    // 恢复走路
	    restoreWalk();
	    // 运动的属性
	    
	    $boy.animate(options,runTime,'linear',function(){
	    	dfdPlay.resolve();
	    });
	    
	    return dfdPlay;
	}
	
	
	// 开始走路
	function walkRun(time, distX, distY) {
	    time = time || 3000;
	    // 脚动作
	    slowWalk();
	    // 开始走路
	    var d1 = startRun({
	        'left': distX + 'px',
	        'top': (distY ? distY : $boy.position().top)+'px'
	    }, time);
	    return d1;
	}
	
	return {
		// 开始走路
        walkTo: function(time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX)
            var distY = calculateDist('y', proportionY)
            return walkRun(time, distX, distY);
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        setColor:function(value){
            $boy.css('background-color',value)
        }
	}
	 		
	//var startTime=0;
	//var endTime=0;
	//
	//var runTime=0;
	//
	//$('button:first').click(function(){
	//	var date=new Date();
	//	startTime=date.getTime();	
	//	$('#boy').addClass('slowWalk').removeClass('pauseWalk');
	//	$('.content-wrap').css({
	//		transform:'translateX(-'+(width)+'px)',
	//		transition:'all '+(10000-runTime)+'ms linear'
	//	})
	//});
	//
	//$('button:last').click(function(){
	//	var date=new Date();
	//	endTime=date.getTime();
	//	runTime=endTime-startTime;
	//	var left=$('.content-wrap').offset().left;
	//	$('#boy').addClass('pauseWalk');
	//	$('.content-wrap').css({
	//		transform:'translateX('+(left)+'px)',
	//		transition:'none'
	//	})
	//});
}
