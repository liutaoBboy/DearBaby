$(function(){
	// 后台获取地区数据
	var $province = $('#provice');
	var $city = $("#city");
	var $locality = $("#addr");
	$.get("../json/address.json", function ( data ) {
		//console.log(data.length);
		//向省级地区添加元素
		for ( var i = 0, len = data.length; i < len; i++) {
			var op1=$("<option></option>");
			op1.html(data[i].name);
			op1.appendTo($province);
		}
		var provinceIndex = 0;
		//console.log($province.find('option').length);
		//根据省所在的索引确认城市
		$province.on('change', function () {
			$(this).children(".chose").remove();
			provinceIndex = $(this).children('option:selected').index();
			$("#city").children().remove();
			var se1=$('<option >选择市</option>')
			se1.addClass("chose");
			 se1.appendTo($city);
			for ( var j = 0, len2 = data[provinceIndex].city.length; j < len2; j++) {
				var op2=$("<option></option>");
				op2.html(data[provinceIndex].city[j].name);
			    op2.appendTo($city);
			}
		})
            //根据城市所在的索引找出对应地区
			var cityIndex = 0;
	      $city.on('change', function () {
	      	    $(this).children(".chose").remove();
				cityIndex = $(this).children('option:selected').index();
				$locality.children().remove();
				var se1=$('<option >选择县/区</option>')
			    se1.addClass("chose");
				
		   for ( var k = 0, len3 = data[provinceIndex].city[cityIndex].area.length; k < len3; k++)
		     {
				var op3=$("<option></option>");
				op3.html(data[provinceIndex].city[cityIndex].area[k]);
				
			    op3.appendTo($locality);
				}
			});

		});

	}, 'json');

/*})*/
