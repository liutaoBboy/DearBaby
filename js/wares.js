$(function() {
	/*获取数据加载*/
	var $html = "";
	$.get()
	$.get(
		"../json/wares.json",
		function(data) {
			/*
			  <li class="fi">
					<a href="shopping.html">
						<div class="pic">
								<img src="../img/d1.jpg" /><span></span>
								<p class="descr"><span>宝宝</span>蛋 儿童图书小小艺术家 简笔0-6岁早教启蒙书籍</p>
								<p class="price"><b>￥15.00</b><span>(5.4折)</span><em>￥27.60</em></p>
						</div>
						<div class="pic1">
								<img src="../img/d2.jpg" /><span></span>
								<p class="descr"><span>宝宝</span>蛋 儿童图书小小艺术家 简笔0-6岁早教启蒙书籍</p>
								<p class="price"><b>￥15.00</b><span>(5.4折)</span><em>￥27.60</em></p>
						</div>
					
					</a>
				</li>
			 **/
			$.each(data.img, function(index, val) {
				$html += '<li class="fi" id="'+ val.id +'"><a><div class="pic"><img src="' + val.url1 + '" /><span></span><p class="descr"><span>' + val.redName + '</span>' + val.name + '</p><p class="price"><b>¥' + val.unitPrice + '</b><span>(' + val.sale + '折)</span><em>¥' + val.primeCost + '</em></p></div><div class="pic1"><img src="' + val.url2 + '" /><span></span><p class="descr"><span>' + val.redName + '</span>' + val.name + '</p><p class="price"><b>¥' + val.unitPrice + '</b><span>(' + val.sale + '折)</span><em>¥' + val.primeCost + '</em></p></div></a></li>'
			});
			
			$("#sh").append($html);
			
			
			/*list1.js内容 作用 鼠标移上图片变化*/
			$('.pic').on('mouseenter', function() {
				$(this).hide();
				$(this).next().show();
			})
			$('.pic1').on("mouseleave", function() {
				$(this).hide();
				$(this).prev().show();
			})

			$(".xian").on("click", function() {
				$(this).parent("dl").css({height: "88px"});
				$(this).css({display: "none"})
				$(this).next().css({display: "block"});
			})
			//点击影藏对应的变化
			$(".yin").on("click", function() {
				$(this).parent("dl").css({height:"58px"});
				$(this).css({display: "none"})
				$(this).prev().css({display: "block"});
			})
			
			
			/*添加点击事件*/
			var lis = $(".fi");
			var wareUrl = "";
			var wareName = "";
			var warePrice = "";
			var wareID = "";
			var wareInfo = {};
			$.each(lis, function(index,val) {
				$(this).on("click",function(){
					wareUrl = $(this).find(".pic img").attr("src");
					wareName = $(this).find(".descr").eq(0).text();
					warePrice = $(this).find(".price b").eq(0).text();
					wareID = $(this).attr("id");
					wareInfo = {
						"wareUrl":wareUrl,
						"wareName":wareName,
						"warePrice":warePrice,
						"wareID":wareID
					}
					$.cookie("wareInfo","");
					$.cookie("wareInfo",JSON.stringify(wareInfo));
					window.location.href = "shopping.html";
				})
				
			});
		}
	)
	
	
	
})