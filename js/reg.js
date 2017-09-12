window.onload=function(){
	var phon=document.getElementById("reg-2");
	 var tishi=document.getElementsByClassName("tishi")[0];
	 /*验证手机号*/
	 phon.onblur=function(){
	    var phone=phon.value;
	  
	     if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
	     	tishi.style.display="block";
	     }else{
	     	tishi.style.display="none";
	     }
	   }
	  
	phon.onfocus=function(){
		tishi.style.display="none";
		phon.value="";
	}
	/*判断密码是否符合规则*/
	var pa=document.getElementById("reg-4");
	pa.onblur=function(){
		var str=pa.value;
		if(!(/^[a-zA-Z]\w{5,17}$/.test(str))){
		   mi.style.display="block";
		}else{
			mi.style.display="none";
		}
	}
	pa.onfocus=function(){
		mi.style.display="none";
		pa.value="";
	}
	//
	
	/*判断前后密码是否一致*/
	var sure=document.getElementById("sure");
	var sure1=document.getElementById("sure1");
	sure.onblur=function(){
		var va=sure.value;
		if(va!=pa.value){
			sure1.style.display="block";
		}else{
			sure1.style.display="none";
		}
	}
	sure.onfocus=function(){
		sure.value="";
		sure1.style.display="none";
	}
	
	/*动态生成验证码*/
	
	
	 var code="" ; //在全局定义验证码   
     
     var ya=document.getElementById("ya");//提示栏
     var huan=document.getElementsByClassName("huan")[0];/*换验证码*/
     var ya1=document.getElementById("reg-6");//输入框
     var co=document.getElementById("code");
     //默认产生一个验证码  
   	var cheackcode=document.getElementById("code");//随机生成验证码的显示区
        createCode();
       
		function createCode(){
			var codelength=4;
	        cheackcode.innerHTML="";
			var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
		     'S','T','U','V','W','X','Y','Z');
		     for(var i=0;i<codelength;i++){
		     	var index=Math.floor(Math.random()*35);
		     	code+=random[index];
		     }
		     //初始化验证码的值
		     cheackcode.innerHTML=code;
		     
		}
		/*检验验证码*/
	     function validate(){  
		    var inputCode = document.getElementById("reg-6").value.toUpperCase();  //输入框中的值
		    var newl=cheackcode.innerText.toUpperCase();
		  
		    if(inputCode.length <= 0) { 
		        ya.style.display="block";
		    }  

		    else if(inputCode!= newl) {  
		    	alert("验证码错误！！");
		    	console.log(inputCode,newl)
		    	ya.style.display="block";
		        document.getElementById("reg-6").value = "";
		    }         
		    else { 
		       ya.style.display="none";
		    }             
	}  
   
	   huan.onclick=function(){
	  
	   	     code=" ";
	   	     createCode();//刷新验证码  
	   	   
	   	   
	   }
	   
	  ya1.onblur=function(){
	  	  validate();
	  }
	  ya1.onfocus=function(){
	  	 ya.style.display="none";
	  	 document.getElementById("reg-6").value = "";
	  }
	
}
/*获取短信验证码*/
$(function(){
	$(".messageBtn").css("cursor","pointer");
	
	$(".messageBtn").on("click",function(){
		alert("未实现");
	})
	$(".toLog").on("click",function(){
		window.open("log.html","_self");
	}).css("cursor","pointer");
})

