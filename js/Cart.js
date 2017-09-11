/*
 * 关于购物车的js代码
 * 包括购物车中商品数量的加减、购物车的数据加载等
 */
var oTable = document.getElementById('cart-table');

myajax.get("http://h6.duchengjiu.top/shop/api_cart.php?token=11ccd2d1e107dfa97f5e20b629f6a552",{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0;i<data.length;i++){
		var goodsName = data[i].goods_name;
		var goodsImg = data[i].goods_thumb;
		var goodsNum = data[i].goods_number;
		var goodsPrice = data[i].goods_price;
		oTable.innerHTML += `<tr>
			<th><input type="checkbox"/>选择</th>
			<th><img src="${goodsImg}"/>${goodsName}</th>
			<th>${goodsNum}</th>
			<th>${goodsPrice}</th>
			<th>${goodsNum}*${goodsPrice}</th>
			<th><a href="">删除</a></th>
		</tr>`;
	}
});
