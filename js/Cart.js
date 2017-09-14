/*
 * 关于购物车的js代码
 * 包括购物车中商品数量的加减、购物车的数据加载等
 */
var oTable = document.getElementById('cart-table');
var token = sessionStorage.token;
console.log(token);
myajax.get("http://h6.duchengjiu.top/shop/api_cart.php?token=" + token,{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0;i<data.length;i++){
		var goodsName = data[i].goods_name;
		var goodsImg = data[i].goods_thumb;
		var goodsNum = data[i].goods_number;
		var goodsPrice = data[i].goods_price;
		oTable.innerHTML += `<tr class="product">
			<td><img src="${goodsImg}"/>${goodsName}</td>
			<td>${goodsNum}</td>
			<td>${goodsPrice}</td>
			<td>${goodsNum}*${goodsPrice}</td>
			<td><a href="">删除</a></td>
		</tr>`;
	}
});
