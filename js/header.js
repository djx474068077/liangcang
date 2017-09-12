

//菜单导航栏

var oMenu = document.getElementById("menu");
myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i = 0;i<data.length-3;i++){
		var cat_name = data[i].cat_name;
		oMenu.innerHTML += `<li><a href="#">${cat_name}</a></li>`
	}
});
