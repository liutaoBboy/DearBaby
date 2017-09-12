var wareInfo;
if($.cookie("wareInfo")){
	wareInfo = JSON.parse($.cookie("wareInfo"));
}
else{
	window.history.go(-1);
}
$(function(){
	
	/*放大镜部分代码
	 <div class="middle">
		   		<img src="../img/b1.jpg" class="mid" />
		   		<div class="pop"></div>
		   </div>
		   <div id="small">
		   	 <ul>
		   	 	<li class="sm curr"><img src="../img/x3.jpg"/><span></span></li>
		   	 	<li class="sm"><img src="../img/x1.jpg"/><span></span></li>
		   	 	<li class="sm"><img src="../img/x2.jpg"/><span></span></li>
		   	 	<li class="sm"><img src="../img/x4.jpg"/><span></span></li>
		   	 	<li class="sm"><img src="../img/x5.jpg"/><span></span></li>
		   	 </ul>
		   	</div>
		  	<div class="big">
		   		<img src="../img/b1.jpg" />
		   	</div>
		   	<span class="pri1"></span>
	 * */
	var middleImg =  '<img src="'+wareInfo.wareUrl+'" class="mid" id="'+wareInfo.wareID+'"/>';
	var bigImg =  '<img src="'+wareInfo.wareUrl+'" class="mid" />';
	var pri1 = '<span class="pri1">'+wareInfo.warePrice+'</span>'
	var smallImg = '<ul><li class="sm curr"><img src="../img/x3.jpg"/><span></span></li><li class="sm"><img src="../img/x1.jpg"/><span></span></li><li class="sm"><img src="../img/x2.jpg"/><span></span></li><li class="sm"><img src="../img/x4.jpg"/><span></span></li><li class="sm"><img src="../img/x5.jpg"/><span></span></li></ul>'
	$(".middle").prepend(middleImg);
	$(".big").prepend(bigImg);
	$(".dan").text(wareInfo.wareName);
	$(".pri").prepend(pri1);
})
$(function(){
			var popWidth = $(".pop").width(),
				popHeight = $(".pop").height(),
				middleWidth = $(".middle").width(),
				middleHeight = $(".middle").height(),
				bigWidth = $(".big").width(),
				bigHeight = $(".big").height(),
				rateX = bigWidth / popWidth,
				rateY = bigHeight / popHeight;
			// 鼠标移入 .middle 盒子范围，显示 .pop 的遮罩和 .big 的大图，移出则隐藏
			$(".middle").hover(function(){
				$(".pop,.big").show();
			}, function(){
				$(".pop,.big").hide();
			}).on("mousemove", function(event){
				// 设置 .pop 遮罩在文档中的绝对定位位置，将鼠标指针放置在遮罩居中的位置上
				$(".pop").offset({
					top:event.pageY - popHeight / 2,
					left:event.pageX - popWidth / 2
				});
				// 获取 .pop 相对有定位的父元素 .middle 的相对定位位置
				var position = $(".pop").position(),
					_top = position.top,
					_left = position.left;
				// 判断 _top, _left 的取值
				if (_top < 0)
					_top = 0;
				else if (_top > middleHeight - popHeight)
					_top = middleHeight - popHeight;
				if (_left < 0)
					_left = 0;
				else if (_left > middleWidth - popWidth)
					_left = middleWidth - popWidth;
				// 重新设置 .pop 的相对定位位置
				$(".pop").css({
					top:_top,
					left:_left
				});

				// 设置放大镜 .big 框中的图片定位位置
				$(".big img").css({
					top: -rateY * _top,
					left: -rateX * _left
				});
			});

			// 点击 .small 小图切换显示图
		
		});
		
	/*实现数目的加减*/
	$(function(){
		var num=parseInt($(".show").html());
		 $(".left").on("click",function(){
		 	console.log(num);
			num--;
			if(num<=1){
				num=1;
			}
			$(".show").html(num);
		})
		 $(".right").on("click",function(){
		 	num++
		 	$(".show").html(num);
		 })
	})




/*商品信息下面的小方块滑动栏*/
/*$(function(){
	var speed = 15;
	var onewidth=$("#small ul li").outerWidth();
	var len=$("#small ul li").size();
	var lon=$("#small ul").width(onewidth*len+20);
    $("#sm-left").on("click",function(){
    	var s_left=$("#small ul").position().left;
    	if(s_left<=10){
    		s_left=speed;
    	}
    	$("#small ul").css({
    		left:s_left-speed
    	})
    })
     $("#sm-right").on("click",function(){
    	var s_left=$("#small ul").position().left;
    	if(s_left<=-90){
    		s_left=-speed;
    	}
    	$("#small ul").css({
    		left:s_left-speed
    	})
    })
     
})*/

/*导航栏固定，跳转到指定部分*/
   $(function(){

			var winHeight = $(window).height(), // 窗口的高度
				headerHeight = $("#zhu").height(), // 头部的高度
				isClick = false; // 是否点击的滚动操作

			$(window).on("scroll", function(){
				if (!isClick){
					// 获取滚动距离
					var scrollTop = $(this).scrollTop();
					// 判断导航的显示与隐藏
					if (scrollTop > headerHeight+20) {
						$("#introheader").stop(true).fadeIn();
						
					} else {
						$("#introheader").stop(true).fadeOut();
						return;
					}

					// 切换显示导航样式
					$(".shang").each(function(index, element){
						// 获取当前遍历到的楼层在文档中的距离顶部的绝对定位位置
						var _top = $(this).offset().top;
						
						// 判断是否该切换显示导航中楼层样式
						if (_top-winHeight/2-65< scrollTop) {
							$("#introheader ul li").eq(index).addClass("now").siblings().removeClass("now");
						}
					});
				}
			});

			// 点击楼层导航
			$("#introheader ul li,#intro ul li").on("click", function(){
				isClick = true;
				// 切换显示当前点击的 li 上的样式
				$(this).addClass("now").siblings().removeClass("now");

				// 获取当前点击的 li 在其同辈元素中的索引
				var index = $(this).index();
				// 获取对应楼层在文档中绝对定位位置 top
				var _top = $(".shang").eq(index).offset().top;
				// 运动动画
				$("html,body").stop(true).animate({scrollTop : _top-winHeight/2-60}, 1000, function(){
					isClick = false;
				
				});
			});

		
		});



$(function(){
	$("#intro ul li").click(function(){
		$(this).addClass("now").siblings().removeClass("now");
	})
})

$(function(){
	var $div = "";
	for(var i=0;i<4;i++){
		if(i == 1){
			$div += '<div class="swiper-slide sm curr"><img src="'+wareInfo.wareUrl+'"/><span></span></div>' 
		}
		$div += '<div class = "swiper-slide"><img src="'+wareInfo.wareUrl+'"/><span></span></div>' 
	}
	$("#small .swiper-wrapper").append($div);
	
	/*$.each($("#small .swiper-slide"), function() {
		$(this).on("click",function(){
			console.log(1)
			$(this).addClass("sm curr").siblings(".swiper-slide").removeClass("curr");
			$("#middle .mid").attr("src","");
			
		})
	});*/
	
	var mySwiper = new Swiper(".swiper-container",{
		prevButton:'.swiper-button-prev',
		nextButton:'.swiper-button-next',
		effect : 'coverflow',
		initialSlide: 1,
		slidesPerView: 3,
		centeredSlides: true,
		onSlideChangeEnd:function(swiper){
			$(".swiper-slide").eq(swiper.activeIndex).addClass("curr").siblings(".swiper-slide").removeClass("curr");
		}
	})
})













