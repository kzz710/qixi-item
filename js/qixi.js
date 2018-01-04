function doorAction(left,right,time){
	var $door=$('.door');
	var $doorLeft=$('.door-left');
	var $doorRight=$('.door-right');
	var defer=$.Deferred();
	var count=2;
	var complete=function  () {
		if(count==1){
			defer.resolve();
			return
		}
		count--;
	}
	$doorLeft.animate({
		left:left
	},time,'linear',complete);
	
	$doorRight.animate({
		left:right
	},time,'linear',complete);
	
	return defer;
}
    	
function openDoor () {
	return doorAction('-50%','100%',2000);
}

function closeDoor () {
	return doorAction('0%','50%',2000);
}

///////////
// 灯动画 //
///////////
var lamp = {
    elem: $('.b_background'),
    bright: function() {
        this.elem.addClass('lamp-bright');
    },
    dark: function() {
        this.elem.removeClass('lamp-bright');
    }
};

var instanceX;
var container=$('#content');
var swipe=swiper(container);
var visualWidth=container.width();
var visualHeight=container.height();

/////////
//右边飞鸟 //
/////////
var bird = {
    elem: $(".bird"),
    fly: function() {
        this.elem.addClass('birdFly')
        this.elem.transition({
            right: container.width()
        }, 15000, 'linear');
    }
};

function scrollTo(time,proportionx){
	var distX=container.width()*proportionx;
	swipe.scrollTo(distX,time);
}


var getValue=function(className){
	var $elem=$(''+className+'');
	return {
		height:$elem.height(),
		top:$elem.position().top
	}
}

//桥的Y轴
var bridgeY=function(){
	var data=getValue('.c_background_middle');
	return data.top;
}();


//小女孩
var girl={
	elem:$('.girl'),
	getHeight:function(){
		return this.elem.height();
	},
	setOffset:function(){
		this.elem.css({
			left:visualWidth/2,
			top:bridgeY-this.getHeight()
		});
	},
	getLeft:function(){
		return this.elem.offset().left;
	},
	getWidth:function(){
		return this.elem.width();
	},
	getTop:function(){
		return this.elem.position().top;
	},
	rotate:function(){
		this.elem.addClass('girlRotate');
	}
}

//修正小女孩位置
girl.setOffset();


var snowFlakeURL=[
	'./img/snowflake/snowflake1.png',
	'./img/snowflake/snowflake2.png',
	'./img/snowflake/snowflake3.png',
	'./img/snowflake/snowflake4.png',
	'./img/snowflake/snowflake5.png',
	'./img/snowflake/snowflake6.png'
]

function snowFlake(){
	var $flakeContainer=$('#snowflake');
	
	function getImageName(){
		return snowFlakeURL[Math.floor(Math.random()*6)];
	}
	
	function createSnowBox(){
		var url=getImageName();
		return $('<div class="snowbox"></div>').css({
			backgroundImage:'url('+url+')'
		}).addClass('snowRoll');
	}
	
	setInterval(function(){
		//运动的轨迹
		var startPositionLeft=Math.random()*visualWidth-100,
			startOpacity=1,
			endPositionTop=visualHeight-40,
			endPositionLeft=startPositionLeft-100+Math.random()*500,
			duration=visualHeight*10+Math.random()*5000;
		
		//随机透明度，不小于0.5
		var randomStart=Math.random();
		randomStart=randomStart<0.5?startOpacity:randomStart;
		
		//创建一个雪花
		var $flake=createSnowBox();
		
		//设计起点位置
		$flake.css({
			left:startPositionLeft,
			opacity:randomStart
		});
		
		//加入到容器
		$flakeContainer.append($flake);
		
		//开始执行动画
		$flake.transition({
			top:endPositionTop,
			left:endPositionLeft,
			opacity:0.7
		},duration,'ease-out',function(){
			$(this).remove();//结束后删除
		});
		
	},200)
}

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
	var boyWidth = $boy.width();
	
	$boy.css({
		top: pathY - boyHeight + 25
	});
	
	function pauseWalk(){
		$boy.addClass('pauseWalk');
	}
	
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
	
	//用translate做运动
	function startRunT(options,runTime){
		var dfdPlay = $.Deferred();
        // 恢复走路
        restoreWalk();
        // 运动的属性
        $boy.transition(
            options,
            runTime,
            'linear',
            function() {
                dfdPlay.resolve(); // 动画完成
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
	
	//走进商店
	function walkToShop (runTime) {
		var $door=$('.door');
		var doorOffsetLeft=$door.offset().left;
		var boyOffsetLeft=$boy.offset().left;
		instanceX=(doorOffsetLeft + $door.width() / 2) - (boyOffsetLeft + $boy.width() / 2);
				
		var walkPlay=startRunT({
			transform:'translateX('+instanceX+'px) scale(0.3)',
			opacity:0
		},runTime);
		
		return walkPlay;
	}
	
	//走出商店
	function walkOutShop(runTime) {
		var walkPlay=startRunT({
			transform:'translateX('+instanceX+'px) scale(1)',
			opacity:1
		},runTime);
		
		return walkPlay;
	}
	
	//取花
	function takeFlower(){
		var defer=$.Deferred();
		setTimeout(function() {
			$boy.removeClass('slowWalk').addClass('slowFlowerWalk');
			defer.resolve();
		},1000);
		return defer;
	}
	
	function rotate(callback){
		$boy.addClass('boyRotate');
		$boy.on('animationend',function(){
			callback();
			$(this).off();
		})
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
        },
        toShop:function(runTime){
        	return walkToShop(runTime);
        },
        outShop:function(runTime){
        	return walkOutShop(runTime);
        },
        takeFlower:function(){
        	return takeFlower();
        },
        getWidth:function(){
        	return $boy.width();
        },
        resetOriginal:function(){
        	this.stopWalk();
        	$boy.removeClass('slowFlowerWalk slowWalk').addClass('restoreOrigin');
        },
        rotate:function(callback){
        	rotate(callback);
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
