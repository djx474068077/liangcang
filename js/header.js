

//菜单导航栏

var oMenu = document.getElementById("menu");
myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i = 0;i<data.length-3;i++){
		var cat_name = data[i].cat_name;
		var cat_id = data[i].cat_id;
		oMenu.innerHTML += `<li><a href="GoodsList.html?cat_id=${cat_id}">${cat_name}</a></li>`
	}
});

window.onload = function(){
	//搜索框弹出弹入
	var oSearchBtn = document.getElementById("search");
	var oSearchBox = document.getElementById("search-box");
	var oSearchInput = document.getElementById("search-input");
	console.log(oSearchBtn);
	oSearchBtn.addEventListener("click",function(){
		alert("dasfs");
		animate(oSearchBox,{"right":"0px"},400,"linear",function(){
			oSearchInput.focus();
		});
	});
	oSearchInput.onfocus = function(){
		oSearchBtn.onclick = Search();
		document.onkeydown = function(event){
			event = event || window.event;
			if(event.keyCode === 13){
				Search();
			}
		}
	}
	
}
function Search(){
	myajax.get("",{},function(error,responseText){
		var json = JSON.parse(responseText);
		var data = json.data;
		
	});
}
