$(function() {

	var localMsg = "";
	var that = 0;
	//检查是否有历史存储记录 从localstorage中获取用户信息
	if(window.localStorage.getItem("formHistory")) {
		localMsg = JSON.parse(window.localStorage.getItem("formHistory")); //json化历史数据
	}
	var pa1 = false;
	var pa2 = false;
	var newID = "";
	var newPass="";
	//判断账号（电话号码）是否在本地存储中存在     	
	$("#te1").blur(function() {
		for(var i = 0; i < localMsg.length; i++) {

			if(($("#te1").val()) == localMsg[i].id) { //先在所有有存储记录的id中查找值
				that = i; //账户和密码对应的索引

				$(".tishi").css({
					display: "none"
				})
				pa1 = true;
				newID = $("#te1").val();
				return;
			} else {
				$(".tishi").css({
					display: "block"
				})
				pa1 = false
			}
		}
	})
	//只要输入框获得焦点，提示框则影藏
	$("#te1").focus(function() {
		$(".tishi").css({
			display: "none"
		})
	})

	//登录框根据账号判断密码是否与账户对应  
	$("#lo").blur(function() {
			console.log($("#lo").val(), localMsg[that].pass);
			if(($("#lo").val()) != (localMsg[that].pass)) {
				$(".ti").css({
					display: "none"
				})
				pa2 = false;
			} else {
				$(".ti").css({
					display: "none"
				})
				pa2 = true;
				newPass = $("#lo").val();
			}
		})
	//密码框获得焦点时提示框影藏
	$("#lo").focus(function() {
		$(".ti").css({
			display: "none"
		})
	})
	//登录条件判断
	$("#log").click(function() {
		console.log(newID)
		if(pa1 && pa2) {
			localMsg.splice(that,1);
			var obj={
             	"id":newID,
             	"pass":newPass
             };
			localMsg.unshift(obj)
			console.log(localMsg)
			window.localStorage.setItem("formHistory",JSON.stringify(localMsg))
			window.location.href = "index.html";
		} else {
			alert("密码错误，请重新输入!")
		}
	})

	//是否记住用户名
	$("#rem").click(function() {
		console.log(localMsg[that].id);
		if($("input[type='radio']").eq(0).is(':checked')) {
			$("#te1").val(localMsg[that].id);
		} else {
			return false;
		}
	})

})