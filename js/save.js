$(function() {
	var his = []; //存放即将缓冲的数据
	var local;
	/*存储成二维数组形式获取*/
	$("#save").click(function() {
		//检查是否有历史存储记录,有历史记录则将原先的数据加载到数组中
		if(window.localStorage.getItem("person")) {
			//console.log(window.localStorage.getItem("formhis"));
			local = JSON.parse(window.localStorage.getItem("person")); //json化历史数据
			console.log(local)
			his = local;
			//  his.push(local);
			var obj = {
				"name": " ",
				"provice": "",
				"city": "",
				"local": "",
				"ema": "",
				"tel": ""
			};
			obj.name = $("#person").val();
			obj.provice = $("#provice").val();
			obj.city = $("#city").val();
			obj.local = $("#addr").val();
			obj.ema = $("#email2").val();
			obj.tel = $("#telphone2").val();
			his.push(obj);
			console.log(his);

		}
		//第一次存入时对象置为空，
		else {
			var obj = {
				"name": " ",
				"provice": "",
				"city": "",
				"local": "",
				"ema": "",
				"tel": ""
			};

			window.localStorage.setItem("person", ''); //无历史记录则为空

			obj.name = $("#person").val();
			obj.provice = $("#provice").val();
			obj.city = $("#city").val();
			obj.local = $("#addr").val();
			obj.ema = $("#email2").val();
			obj.tel = $("#telphone2").val();
			his.push(obj);

		}

		window.localStorage.setItem("person", JSON.stringify(his)); //将得到的数组转化为字符串
		//  console.log(his);

	})

	//验证邮编
	$("#email2").on("blur", function() {
		var reg1 = /^[1-9][0-9]{5}$/;
		if(reg1.test($("#email2").val())) {
			$(this).css({
				border: "1px solid #ccc",
				color: "#ccc"
			})
		} else {

			$(this).css({
				border: "1px solid red",
				color: "red"
			})

		}

	})
	$("#email2").on("focus", function() {
			$(this).val("");
		})
		//验证电话号码
	var reg2 = /^1[3|4|5|7|8]\d{9}$/;
	$("#telphone2").on("blur", function() {
		if(reg2.test($("#telphone2").val())) {
			$(this).css({
				border: "1px solid #ccc",
				color: "#ccc"
			})
		} else {
			$(this).css({
				border: "1px solid red",
				color: "red"
			})
			$(this).val("");
		}
	})
	$("#telphone2").on("focus", function() {
			$(this).val("");
		})
		//阻止事件冒泡
	$("#sure-5").on("click", function(ev) {
		location.href = "shopcar.html";
		ev.stopPropagation();

	})

	//支付方式更换
	$("#yin li").on("mouseenter", function() {
		var index = $(this).index();
		$(this).css({
			background: "#f7e1c1"
		})
		$(this).siblings().css({
			background: "#f9f9f9"
		});
	})
})

/*向页面中添加数据*/
$(function() {
	var address = JSON.parse(localStorage.getItem("person"));
	var $div = "";
	console.log(address)
	$.each(address, function(index, val) {
		$div += '<div class="box"><div>姓名：' + val.name + ' </div><div>，地址：' + val.provice + ',' + val.city + ',' + val.local + '</div><div>，邮编：' + val.ema + '</div><div>，电话：' + val.tel + '</div></div>';
	});

	$(".address").append($div);

	$(".address .box").on("click", function() {
		$(this).css("border-color", "red").siblings().css("border-color", "#ccc");
	})
})