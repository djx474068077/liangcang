
//创建一个Request对象
//var request = new Object();
//request = GetRequest();
var goods_id = getQueryString("goods_id");
var oImg = document.querySelector("#goods_img");
var oTitle = document.querySelector("#goods_title");
var oDetail = document.querySelector("#goods_detail");
var oPrice = document.querySelector("#price");
var oAddCart = document.getElementById("add_cart");
var token = sessionStorage.token;

myajax.get("http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+goods_id,{},
function(err,responseText){
	var json = JSON.parse(responseText);
	var data = json.data[0];
	oImg.src = data.goods_thumb;
	oTitle.innerText = data.goods_name;
	oDetail.innerText = data.goods_desc;
	oPrice.innerText = data.price;
});
var oRightBtn = document.querySelector("#rightBtn");
var oLeftBtn = document.querySelector("#leftBtn");
var oInput = document.querySelector("#numInput")
var index = 1;
oRightBtn.onclick = function () {
	index ++;
	oInput.value = index;
	click();
	
}
oLeftBtn.onclick = function () {
	index --;
	oInput.value = index;
	click();
}
function click () {
	if(index <= 0) {
		index = 1;	
		oInput.value = 1;
	}else if (index > 5) {
		index = 5;
		oInput.value = 5;
	}
}
oAddCart.onclick = function(){
	if(token){
		myajax.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+token,{
		"goods_id" : goods_id,
		"number" : oInput.value
		},function(){
			alert("添加购物车成功");
		});
	}else{
		alert("请先登录");
		location.href = "Login.html?isOther=1";
	}
}

