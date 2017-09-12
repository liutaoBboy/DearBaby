  $(function () {
       var history=[];//存放即将缓冲的数据
       var localMsg;
       /*存储成二维数组形式获取*/
       $("#sub").click(function(){
       	console.log($("#reg-2").val());
       	if($("#reg-2").val().length<6||$("#reg-4").val().length<3||$("#sure").val().length<3||$("#reg-6").val().length<3){
       		
       		alert("填写完整");
       		console.log($("#reg-2").val().length,$("#reg-4").val().length,$("#sure").val().length,$("#reg-6").val().length)
       		return false;
       	}
        //检查是否有历史存储记录,有历史记录则将原先的数据加载到数组中
        if( window.localStorage.getItem("formHistory")){
        	//console.log(window.localStorage.getItem("formHistory"));
        	 localMsg=JSON.parse(window.localStorage.getItem("formHistory"));//json化历史数据
        
         history=localMsg;
          for(var i=0;i<localMsg.length;i++){
          	
          	if(localMsg[i].id==$("#reg-2").val()){
          	alert("用户名已存在");
          	return false;
          	}
          }
         //  history.push(localMsg);
            var obj={
             	"id":" ",
             	"pass":""
             };
            if($($('#reg-con input')[0])[0].type=='text'){
             
                    obj.id=$($('#reg-con input')[0]).val();
               }
             if($($('#reg-con input')[3])[0].type=='password'){
             
                    obj.pass=$($('#reg-con input')[3]).val();
              }
          history.unshift(obj);
	        console.log(history);
	      
        }
        //第一次存入时对象置为空，
        else{
        	
          var obj={
             	id:" ",
             	pass:""
            };
       
       	  window.localStorage.setItem("formHistory",'');//无历史记录则为空
       	      if($($('#reg-con input')[0])[0].type=='text'){
                    obj.id=$($('#reg-con input')[0]).val();
                }
              if($($('#reg-con input')[3])[0].type=='password'){
             
                    obj.pass=$($('#reg-con input')[3]).val();
               }
              history.unshift(obj);
               
        }
             
          window.localStorage.setItem("formHistory",JSON.stringify(history));//将得到的数组转化为字符串
          console.log(history);
          
       })
       
       
     
       
    })
   
$(function(){
	var localMsg2=JSON.parse(window.localStorage.getItem("formHistory"));//json化历史数据
	console.log(localMsg2)
})