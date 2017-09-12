window.onload=function(){
	
	
	//设置和获取本地localstorage
	utils = {  
        setParam : function (name,value){  
            localStorage.setItem(name,value)  
        },  
        getParam : function(name){  
            return localStorage.getItem(name)  
        }  
    } 
    wareID = JSON.parse($.cookie("wareInfo")).wareID;
    //初始化每个对象需要存储的数据
    product={ 
    	
        id:wareID,
        ming:"",
        name:"",  
        num:0,  
        price:0.00,
        lu:"",
    };  
    //存储临时变动数据
    orderdetail={  
        username:"",  
        phone:"",  
        address:"",  
        zipcode:"",  
        totalNumber:0,  
        totalAmount:0.00      
    }  
    cart = {  
        //向购物车中添加商品  
        addproduct:function(product){  
            var ShoppingCart = utils.getParam("ShoppingCart");  //获取名为ShoppingCart的localstorage
            if(ShoppingCart==null||ShoppingCart==""){  
                //第一次加入商品  
                var jsonstr = {"productlist":[{"id":product.id,"name":product.name,"ming":product.ming,"num":product.num,"lu":product.lu,"price":product.price}],"totalNumber":product.num,"totalAmount":(product.price*product.num)};  
                utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));  //写入一个这样的localstorage
            }else{  
                var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  //对象化所获取到的数据
                var productlist = jsonstr.productlist;  //获取对象中的对象列表
                var result=false;  
                //查找购物车中是否有该商品  
                for(var i in productlist){  
                    if(productlist[i].id==product.id){  /*如果商品的id值相同则数目加*/
                        productlist[i].num=parseInt(productlist[i].num)+parseInt(product.num);  
                        result = true;  
                    }  
                }  
                if(!result){  
                    //没有该商品就直接加进去  
                    productlist.push({"id":product.id,"name":product.name,"ming":product.ming,"num":product.num,"lu":product.lu,"price":product.price});  
                }  
                //重新计算总价  
                //原先的总数量加现有的数量
                jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+parseInt(product.num); 
                /*现在总的价格为原先价格加现在数量和价格和*/jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+(parseInt(product.num)*parseFloat(product.price));
                //更新数目与总价
                orderdetail.totalNumber = jsonstr.totalNumber;  
                orderdetail.totalAmount = jsonstr.totalAmount;  
                //保存购物车  
                utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));  /*在改变之后所有重新写入*/
            }  
        },  
        //修改给买商品数量  
        updateproductnum:function(id,num){  
        	//alert("傻逼！");
            var ShoppingCart = utils.getParam("ShoppingCart");  
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  
            var productlist = jsonstr.productlist;  
              
            for(var i in productlist){  
                if(productlist[i].id==id){  
                    jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+(parseInt(num)-parseInt(productlist[i].num));  
                    jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+((parseInt(num)*parseFloat(productlist[i].price))-parseInt(productlist[i].num)*parseFloat(productlist[i].price));  
                    productlist[i].num=parseInt(num);  
                    // console.log(productlist[0].num);
                    orderdetail.totalNumber = jsonstr.totalNumber;  
                    orderdetail.totalAmount = jsonstr.totalAmount;  
                   // console.log(JSON.stringify(jsonstr));
                    utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));  
                    return;  
                }  
            }  
        },  
        //获取购物车中的所有商品  
        getproductlist:function(){  
            var ShoppingCart = utils.getParam("ShoppingCart");  
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  
            var productlist = jsonstr.productlist;  
            orderdetail.totalNumber = jsonstr.totalNumber;  
            orderdetail.totalAmount = jsonstr.totalAmount;  
            return productlist;  
        },  
        //判断购物车中是否存在商品  
        existproduct:function(id){  
            var ShoppingCart = utils.getParam("ShoppingCart");  
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  
            var productlist = jsonstr.productlist;  
            var result=false;  
            for(var i in productlist){  
                if(productlist[i].id==product.id){  
                    result = true;  
                }  
            }  
            return result;  
        },  
        //删除购物车中商品  
        deleteproduct:function(id){  
            var ShoppingCart = utils.getParam("ShoppingCart");  
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  
            var productlist = jsonstr.productlist;  
            var list=[];  
            for(var i in productlist){  
                if(productlist[i].id==id){  
                    jsonstr.totalNumber=parseInt(jsonstr.totalNumber)-parseInt(productlist[i].num);  
                    jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)-parseInt(productlist[i].num)*parseFloat(productlist[i].price);  
                }else{  
                    list.push(productlist[i]);  
                }  
            }  
            jsonstr.productlist = list;  
            orderdetail.totalNumber = jsonstr.totalNumber;  
            orderdetail.totalAmount = jsonstr.totalAmount;  
            utils.setParam("ShoppingCart","'"+JSON.stringify(jsonstr));  
        }  
    };  
    
    //页面初始化布局
    var shuju=window.localStorage.getItem("ShoppingCart");
     
    var newshuju=JSON.parse(shuju.substr(1,shuju.length));//在引用的时候必须json化
	var otbody=document.getElementsByTagName("tbody")[0];
	var pin=document.getElementById("pin");
    var zong=document.getElementById("zong");
    var lenn=newshuju.productlist.length;
             	for(var i=0;i<lenn;i++){
             		var otr=document.createElement("tr");
             		var str="";
             		var sum=newshuju.productlist[i].price*newshuju.productlist[i].num;
				 str+="<td><input type='checkbox' class='pro'/></td><td ><img src='"+newshuju.productlist[i].lu+"' class='picture' id='"+newshuju.productlist[i].id+"'/></td>"+
				 "<td>"+newshuju.productlist[i].ming+"<br/>"+newshuju.productlist[i].name+"</td> <td>"+newshuju.productlist[i].price+"</td><td class='chang'><span class='chang-left'>-</span><b class='ch'>"+newshuju.productlist[i].num
				 +
				 "</b><span class='chang-right'>+</span></td><td class='sum1'>"+sum+"</td><td><a href='#' class='del'>"+"删除"+"</a></td>";
                otr.innerHTML=str;
                
                otbody.appendChild(otr);
               }
                
         //点击删除，从页面和localstorage中删除数据
        
         	$(".del").each(function(index,ele){
         	$(this).click(function(){
         		var ev=ev||event;
         	    var target=ev.target||ev.srcElement;
         	    var id = $(this).parents("td").siblings("td").find(".picture").attr("id");
         	   	
         		$(this).parents("tr").remove();
         		cart.deleteproduct(id);
         		})
         	})
     
          //数量的增加和减少
            var ch=document.getElementsByClassName("ch");
           
            $(".chang-left").each(function(index,ele){
            	
          	      $(this).click(function(){
          	      
          	      	var nchang=parseInt($(this).parent().children(".ch").text());
          	      	if(nchang>1){
	             	nchang--;
	             	}else{
	             		nchang=1;
	             	}
	             	$(this).parent().children(".ch").html(nchang);
	             	sum=newshuju.productlist[index].price*nchang;
	             	$(".sum1").eq(index).html(sum);
	             	if(index==0){
	             		cart.updateproductnum("01",nchang);
	             	}else if(index==1){
	             		cart.updateproductnum("02",nchang);
	             	}
          	      })
          })
            $(".chang-right").each(function(index,ele){
            	
          	    $(this).click(function(){
          	      
          	      	var nchang=parseInt($(this).parent().children(".ch").text());
	             	nchang++;
	             	$(this).parent().children(".ch").html(nchang);
	             	sum=newshuju.productlist[index].price*nchang;
	             	$(".sum1").eq(index).html(sum);
	             	if(index==0){
	             		cart.updateproductnum("01",nchang);
	             	}else if(index==1){
	             		cart.updateproductnum("02",nchang);
	             	}
          	    })
          })
            
             
             //手动更改数目
             $(".ch").each(function(index,ele){
             	//当点击的时候
             	
             	$(this).click(function(){
             	
             		if($(".ch").has("input").length>0){
             			return;
             		}else{
	             	var inp="<input type='text' style='width:30px;height:18px;outline:none'/>"
	             	$(this).html(inp);
	             	}
             	})
               
             	$(this).on("blur","input",function(){
             		
             	    $(this).parents(".ch").html($(this).val());
	             	var ninp = parseInt($(this).val());
	             	sum=newshuju.productlist[index].price*ninp;
	             	$(".sum1").eq(index).html(sum);
	             	if(index==0){
	             		cart.updateproductnum("01",ninp);
	             	}else if(index==1){
	             		cart.updateproductnum("02",ninp);
	             	}
	             
             	})
             })
				//console.log(newshuju);
				/*实现全选功能*/
				$(".allcheck").click(function(){
					
					var m1=0;
					$(".pro").prop("checked", $(this).prop("checked"));
					if($(this).is(':checked')){
				    $(".sum1").each(function(index,ele){
				    	m1+=parseFloat($(this).text());
				    })
				     pin.innerHTML=m1;
				     zong.innerHTML=m1;
					
					}else{
						pin.innerHTML=0.00;
					    zong.innerHTML=0.00;
					}
					
				})
				//分别选择
				var m2=0;
				$(".pro").click(function(){
					if($(this).is(':checked')){
					var con=$(this).parents("tr").children(".sum1").text();
					  var con1=parseFloat(con);
					  m2+=con1;
					 pin.innerHTML=m2;
				     zong.innerHTML=m2;
					}else{
					var con=$(this).parents("tr").children(".sum1").text();
					  var con1=parseFloat(con);
					  m2-=con1;
					  pin.innerHTML=m2;
				     zong.innerHTML=m2;
					}
				})
    
     
    
    
    
}
