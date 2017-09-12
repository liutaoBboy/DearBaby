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
    //初始化每个对象需要存储的数据
    product={ 
    	
        id:0,
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
            var ShoppingCart = utils.getParam("ShoppingCart");  
            var jsonstr = JSON.parse(ShoppingCart.substr(1,ShoppingCart.length));  
            var productlist = jsonstr.productlist;  
              
            for(var i in productlist){  
                if(productlist[i].id==id){  
                    jsonstr.totalNumber=parseInt(jsonstr.totalNumber)+(parseInt(num)-parseInt(productlist[i].num));  
                    jsonstr.totalAmount=parseFloat(jsonstr.totalAmount)+((parseInt(num)*parseFloat(productlist[i].price))-parseInt(productlist[i].num)*parseFloat(productlist[i].price));  
                    productlist[i].num=parseInt(num);  
                      
                    orderdetail.totalNumber = jsonstr.totalNumber;  
                    orderdetail.totalAmount = jsonstr.totalAmount;  
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
    var shuju=window.localStorage.getItem("ShoppingCart");
    var newshuju=JSON.parse(shuju.substr(1,shuju.length));//在引用的时候必须json化
	var otbody=document.getElementsByTagName("tbody")[0];
	var otr=document.createElement("tr");
	var str="";
	var sum=newshuju.productlist[0].price*newshuju.productlist[0].num;
	
	console.log(newshuju);
	
	$.each(newshuju.productlist, function(index,val) {
		str+= "<tr><td><img src="+newshuju.productlist[index].lu+"><span>"+newshuju.productlist[index].ming+"</span></td>"
	+"<td>"+newshuju.productlist[index].name+"</td>"
	+"<td>"+newshuju.productlist[index].price+"</td>"+"<td>"+newshuju.productlist[index].num+"</td>"+"<td id='mo'>"+sum+"</td></tr>";
	});
	
   
    /*otr.innerHTML=str;
                
    otbody.appendChild(otr);*/
   $("tbody").append(str);
                
                
          /*      
             var shuju=window.localStorage.getItem("ShoppingCart");
              var newshuju=JSON.parse(shuju.substr(1,shuju.length));//在引用的时候必须json化
              console.log(newshuju);*/
      
      
      /*插入对应位置*/
     var qian1=document.getElementById("qian1");
     var qian2=document.getElementById("qian2");
     var mo=document.getElementById("mo");
     qian1.innerHTML=mo.innerHTML;
     qian2.innerHTML=mo.innerHTML;
				
				
   /*立即购买并清除缓存数据*/
    $("#su").on("click",function(){
    	cart.deleteproduct("01");
    	localStorage.clear();
    	console.log(1)
    })
}


