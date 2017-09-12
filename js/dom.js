$(function(){
	
	var json={
		src:[
		'../img/4.jpg',
		'../img/5.jpg',
		'../img/6.jpg',
		'../img/7.jpg',
		'../img/8.jpg',
		'../img/9.jpg',
		'../img/10.jpg',
		'../img/11.jpg',
		'../img/12.jpg',
		'../img/13.jpg',
		'../img/14.jpg',
		'../img/15.jpg',
		'../img/16.jpg',
		'../img/17.jpg',
		'../img/18.jpg',
		'../img/19.jpg',
		'../img/20.jpg',
		'../img/21.jpg',
		'../img/22.jpg',
		'../img/23.jpg',
		'../img/24.jpg',
		'../img/25.jpg',
		'../img/26.jpg',
		'../img/27.jpg',
		'../img/28.jpg',
		'../img/29.jpg',
		'../img/30.jpg',
		'../img/31.jpg',
		'../img/32.jpg',
		'../img/21.jpg',
		'../img/22.jpg',
		'../img/28.jpg',
		'../img/25.jpg',
		
		
		]
		
	}
	 /* for(var m=0;m<json.src.length;m++){
	  	 var fi=$("#fi").clone(true);
	   	  fi.children(".pic").children("img").attr({
	   	  	src:json.src[8]
	   	  })
	   	  fi.children(".pic1").children("img").attr({
	   	  	src:json.src[9]
	   	  })
   	      $("#sh").append(fi);
   	    
	  }*/
	/* var fi="";
	 var fg="";
	 for(var i=0;i<30;i++){
    fi+="<li><div class='pic'><img src="+json.src[i]+"/><p class='descr'><span>宝宝</span>蛋 儿童图书小小艺术家 简笔0-6岁早教启蒙书籍</p><p class='price'><b>￥15.00</b><span>(5.4折)</span><em>￥27.60</em></p></div></li>";
	 	
	    $("li").append(fg);
	 	
	 }
	$("#sh").append(fi);
	*/
	
	
	var ren=true;
	var xiao=true;
	var jia=true;
	var zhe=true;
	var ren1="";
	var xiao1="";
	var jia1="";
	var zhe1="";
	$("#ren").click(function(){
		if(!ren){
		
			$("ul").remove("#sh");
			//$("#con").html(obj);
			ren1.appendTo($("#con"));
		}
		//第一次点击人气的时候
	    if(ren){
	    	$(".pic img").each(function(index,ele){
	    	$(this).attr({
	    		src:json.src[Math.floor(Math.random()*29)]
	    	})
	    })
	    	 ren1=$("#con ul").clone(true);
	    	 ren=false;
	    }
	})
	
	$("#xiao").click(function(){
		if(!xiao){
		
			$("ul").remove("#sh");
			//$("#con").html(obj);
			xiao1.appendTo($("#con"));
		}
		//第一次点击人气的时候
	    if(xiao){
	    	$(".pic img").each(function(index,ele){
	    	$(this).attr({
	    		src:json.src[Math.floor(Math.random()*29)]
	    	})
	    })
	    	 xiao1=$("#con ul").clone(true);
	    	 xiao=false;
	    }
	})
	
	$("#jia").click(function(){
		if(!jia){
		
			$("ul").remove("#sh");
			//$("#con").html(obj);
			jia1.appendTo($("#con"));
		}
		//第一次点击人气的时候
	    if(jia){
	    	$(".pic img").each(function(index,ele){
	    	$(this).attr({
	    		src:json.src[Math.floor(Math.random()*29)]
	    	})
	    })
	    	 jia1=$("#con ul").clone(true);
	    	 jia=false;
	    }
	})
	
	
	$("#zhe").click(function(){
		if(!zhe){
		
			$("ul").remove("#sh");
			//$("#con").html(obj);
			zhe1.appendTo($("#con"));
		}
		//第一次点击人气的时候
	    if(zhe){
	    	$(".pic img").each(function(index,ele){
	    	$(this).attr({
	    		src:json.src[Math.floor(Math.random()*29)]
	    	})
	    })
	    	 zhe1=$("#con ul").clone(true);
	    	 zhe=false;
	    }
	})
	var wrap=true;
	var wrap1="";
	
	//只显示有货商品
	$("#wrap-center").click(function(){
		$(this).css({
			color:"#14b3c9",
			border:"1px solid #14b3c9"
		})
		if(!wrap){
		
			$("ul").remove("#sh");
			//$("#con").html(obj);
			wrap1.appendTo($("#con"));
		}
		//第一次点击人气的时候
	    if(wrap){
	    	$(".pic img").each(function(index,ele){
	    	$(this).attr({
	    		src:json.src[Math.floor(Math.random()*29)]
	    	})
	    })
	    	 wrap1=$("#con ul").clone(true);
	    	 wrap=false;
	    }
	   var timer=setInterval(function(){
	   	 $("#wrap-center").css({
			color:"black",
			border:"1px solid #ccc"
		})
	   },1000)
	})
	
	/*分页点击的时候*/
	
	$(window).on("load",function(){
	
		 $("#wrap-right").on("click",function(){
		   $(".pic img").each(function(index,ele){
		    	$(this).attr({
		    		src:json.src[Math.floor(Math.random()*29)]
		    	})
	    })
		 })
	
	
	})
	
	
	
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})