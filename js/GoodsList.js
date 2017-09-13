

var cat_id = getQueryString("cat_id");
console.log(cat_id);
var oHotGoods = document.getElementById("hotgoods");
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php?page=5&pagesize=10&cat_id="+cat_id,{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0;i<data.length;i++){
		var goods_id = data[i].goods_id;
		var goods_name = data[i].goods_name;
		var star_num = data[i].star_number;
		var price = data[i].price;
		var goods_desc = data[i].goods_desc;
		var goods_img = data[i].goods_thumb;
		oHotGoods.innerHTML += `<div class="hot-goods">
				<a href="Detail.html?goods_id=${goods_id}">
					<img src="${goods_img}"/>
					<div class="down-msg">
						<p>${goods_name}</p>
						<span>${star_num}<i></i></span>
					</div>
					<div class="miss-box">
						<span>￥${price}</span>
						<p>${goods_desc}</p>
					</div>
				</a>				
			</div>`
	}
});
