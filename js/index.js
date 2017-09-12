$(function() {

	var len = $("#show li").length;
	var onewidth = 237;
	$("#show").width(onewidth * len);
	var timer = null;
	var index = 1;
	//设置自动播放
	timer = setInterval(function() {
		move();
	}, 2000)

	//当鼠标移动上去时
	$("#nav-list dl").on("mouseenter", function() {
			clearInterval(timer);
			var index = $(this).index();

			var _left = -onewidth * index;
			$("#show").animate({
				left: _left
			});
			$("#nav-list dl").eq(index).children("dt").addClass("ac").end().siblings().children("dt").removeClass("ac");
			$("#nav-list dl").eq(index).children("dd").children("h3").addClass("ad").end().end().siblings().children("dd").children("h3").removeClass("ad");
			$("#nav-list dl").eq(index).children("dd").children("p").addClass("ad").end().end().siblings().children("dd").children("p").removeClass("ad");

		})
		//鼠标离开时自动播放
	$("#nav-list dl").on("mouseleave", function() {
		timer = setInterval(function() {
			move();
		}, 2000)
	})

	//运动函数
	function move() {
		$.each(function() {
			$("#show  li img").hide();
		})
		$("#show  li img").eq(index).show();
		var _left = -onewidth * index;
		$("#show").animate({
			left: _left
		});
		$("#nav-list dl").eq(index).children("dt").addClass("ac").end().siblings().children("dt").removeClass("ac");
		$("#nav-list dl").eq(index).children("dd").children("h3").addClass("ad").end().end().siblings().children("dd").children("h3").removeClass("ad");
		$("#nav-list dl").eq(index).children("dd").children("p").addClass("ad").end().end().siblings().children("dd").children("p").removeClass("ad");

		index++;
		if(index > 5) {
			index = 0;
		}
	}
})

/*友情连接部分*/
$(function() {
	var fir_left = $("#link-1 a").first().position().left;

	function scroll() {
		$("#link-1").animate({
			left: -fir_left
		}, function() {
			$("#link-1 a:eq(0)").appendTo($("#link-1"));
			//$("#link-1 a:eq(0)").remove();
		})
	}
	setInterval(scroll, 500)

	//显示客服
	$(window).on("scroll", function() {
		var top = $(window).scrollTop();
		if(top <= 400) {
			$("#server").fadeOut(1000);
		}
		if(top > 400) {
			$("#server").fadeIn(1000);
		}
	})

})

/*弹出对应对话框*/
$(function() {
	$("#vv").click(function() {
		$(this).fadeOut(500);
		$("#v").fadeIn(1000);
	})
	$("#shou").click(function() {
		$("#v").fadeOut(500);
		$("#vv").fadeIn(1000);
	})
})

//对应用户信息显示
$(function() {
	var localMsg;
	//检查是否有历史存储记录
	if(window.localStorage.getItem("formHistory")) {
		localMsg = JSON.parse(window.localStorage.getItem("formHistory")); //json化历史数据

	}
	if(localMsg) {
		$("#hello").html(localMsg[0].id);
		$("#hello").attr("title","重新登录").on("click",function(){
			window.open("log.html","_self");
		});
		
		$("#or").css({
			display: "none"
		})
	}

})
//跨域
$(function() {
	var iValue = '';
	$('#text').on('input', function() {
		//输入框内容变化时获取数据
		iValue = $("#text").val();

		console.log(iValue)
		$.getJSON(
			"https://suggest.taobao.com/sug?code=utf-8&q=" + iValue + "&_ksTS=1473162695743_464&callback=?&k=1&area=c2c&bucketid=0",
			//"http://dd-search.jd.com/?ver=2&zip=1&key=1&pvid=1alkqfsi.kiv7lmmc&t=1472456613994&curr_url=www.jd.com%2F&callback=?",
			function(data) {
				//console.log(data)
				$("#cross-domain ul li").remove();
				var html = "";
				var oArry = data.result;
				//console.log(oArry);
				for (var i in oArry) {
					//console.log(oArry[i][0]);
					html += "<li>" + oArry[i][0] + "</li>"
				}
				console.log(html)
				$('#cross-domain').css('display','block').children('ul').append(html)
				$("#cross-domain ul li:first").on('click',function(){
					if($(this).text() === '宝宝玩具'){
						window.open('list.html');
					}
				});
				/*点击搜索按钮*/
				$("#sub").on("click",function(){
					if(iValue == "宝宝" || iValue == "宝宝玩" ||iValue == "宝宝玩具"){
						window.open('list.html');
					}
				})
			}
		)
	});
});
