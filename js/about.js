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
					$(".item").each(function(index, element){
						// 获取当前遍历到的楼层在文档中的距离顶部的绝对定位位置
						var _top = $(this).offset().top;
						
						// 判断是否该切换显示导航中楼层样式
						if (_top-winHeight/2-65< scrollTop) {
							$("#introheader ul li").eq(index).addClass("ac").siblings().removeClass("ac");
						}
					});
				}
			});

			// 点击楼层导航
			$("#introheader ul li,#nav ul li").on("click", function(){
				isClick = true;
				// 切换显示当前点击的 li 上的样式
				$(this).addClass("ac").siblings().removeClass("ac");

				// 获取当前点击的 li 在其同辈元素中的索引
				var index = $(this).index();
				// 获取对应楼层在文档中绝对定位位置 top
				var _top = $(".item").eq(index).offset().top;
				// 运动动画
				$("html,body").stop(true).animate({scrollTop : _top-winHeight/2-60}, 1000, function(){
					isClick = false;
				
				});
			});

		
		});

