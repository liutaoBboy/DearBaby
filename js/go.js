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
   //点击时候存储对应数据
	var mai=document.getElementsByClassName("mai")[0];
	mai.onclick=function(){
	    //使用
	   var zhi=document.getElementsByClassName("dan")[0].innerText;//名称
		  
		var jian=document.getElementsByClassName("jian")[0].innerText;//类型
		var show=document.getElementsByClassName("show")[0].innerText;//数量
		var pp=document.getElementsByClassName("pri1")[0].innerText.substring(1);//价格
		var pric1=parseFloat(pp);
		var mid=document.getElementsByClassName("mid")[0];
		var midd=mid.getAttribute("src");
		var wareID = $(".mid").attr("id");
		console.log(wareID);
		
		var product =  
	    {  
	    'id': wareID, 
	    //属性名用引号括起来，属性间由逗号隔开
	    'name': jian,  
	    'num':show,  
	    'price': pric1,
	    'ming':zhi,
	    'lu':midd
	    
	  }  
		//商品加入到购物车  
		       cart.addproduct(product);  
				var productlist=cart.getproductlist();//取出购物车商品  
			/*	alert('商品:'+productlist[0].id+' '+productlist[0].name+' '+productlist[0].num+'   '+productlist[0].price, '确定');  
				         */
	
}

	  var gou=document.getElementsByClassName("gou")[0];
	  gou.onclick=function(){
	  	  //使用
		   var zhi=document.getElementsByClassName("dan")[0].innerText;//名称
			  
			var jian=document.getElementsByClassName("jian")[0].innerText;//类型
			var show=document.getElementsByClassName("show")[0].innerText;//数量
			var pp=document.getElementsByClassName("pri1")[0].innerText.substring(1);//价格
			var pric1=parseFloat(pp);
			var mid=document.getElementsByClassName("mid")[0];
		    var midd=mid.getAttribute("src");
		    var wareID = $(".mid").attr("id");
			console.log(wareID);
		
			var product =  
		    {  
		    'id': wareID,        //属性名用引号括起来，属性间由逗号隔开  
		    'name': jian,  
		    'num':show,  
		    'price': pric1,
		    'ming':zhi,
		    'lu':midd
		    
		  };  
		   cart.addproduct(product);  
		   var productlist=cart.getproductlist();//取出购物车商品  
	  }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
