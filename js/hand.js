$(function(){
	$("#zoom").width($(window).width());
	$("#zoom").height($(window).height());
	$("#submit").on("mousedown",function(){
		var reg1=/^[\u4e00-\u9fa5]{2,}$/;
		var reg2=/^1[3|4|5|7|8]\d{9}$/;
		var reg3=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var timer1=null;
        var fa1=reg1.test($("#username").val());
        var fa2=reg2.test($("#mobile").val());
        var fa3=reg3.test($("#email").val());
		/*判断各种正则条件*/
		if($("#cooperate").val()==""){
			  $("#zoom").css({display:"block"});
			  $("#he").css({display:"block"});
		}
		else if($("#username").val()==""||!fa1 ){
			$("#zoom").css({display:"block"});
			$("#cname").css({display:"block"});
		}
		else if($("#mobile").val()==""|| !fa2){
			$("#zoom").css({display:"block" });
			$("#telphone").css({display:"block"});
		}
		else if($("#email").val()==""|| !fa3){
			$("#zoom").css({display:"block"});
			$("#email1").css({display:"block"});
		}else{
			return false;
		}
		timer1=setInterval(function(){
		$("#zoom").css({
			display:"none"
		})
		},1500)
	})
})