

//ajax获取广告（轮播图）
var oUi = document.getElementById('imagesss');
//ajax第一次请求获取广告位，并判断是否获取到
myajax.get("http://h6.duchengjiu.top/shop/api_position.php",{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	if(json["code"] === 0){
		var position_id = data[0].position_id;
		//ajax第二次请求，请求获取的广告
		myajax.get("http://h6.duchengjiu.top/shop/api_ad.php?position_id="+position_id,{},function(error,responseText){
			var json = JSON.parse(responseText);
			var data = json.data;
			var ban_img1 = data[0]["url"];
			var ban_thumb1 = data[0].thumb;
			oUi.innerHTML += `<li class="first">
				<a href="${ban_thumb1}">
					<img src=${ban_img1} />	
				</a>
			</li>`;
			for(var i=1;i<6;i++){
				var ban_img = data[i]["url"];
				var ban_thumb = data[i].thumb;
				oUi.innerHTML += `<li>
					<a href="${ban_thumb}">
						<img src=${ban_img} />
					</a>
				</li>`;
			}
			bannerRun();
		});
	}else{
		console.log("初始化信息错误");
	}
});


//ajax获取热门商品数据
var oHotGoods = document.getElementById('hotgoods');
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{},function(error,responseText){
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i=0;i<data.length;i++){
		var goods_name = data[i].goods_name;
		var star_num = data[i].star_number;
		var goods_id = data[i].goods_id;
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
})

function bannerRun(){
	//得到carousel
	var carousel = document.getElementById("carousel");
	//得到li
	var lis = document.getElementById("imageslist").getElementsByTagName("li");
	//得到按钮
	var leftBtn = document.getElementById("leftBtn");
	var rightBtn = document.getElementById("rightBtn");
	//得到小圆点
	var circlesLi = document.getElementById("circles").getElementsByTagName("li");
	//图片数量
	var imgLength = lis.length;
	//图片宽度
	var width = 560;
	//滚动速度
	var animatetime = 300;
	//缓冲描述
	var tween = "Linear";
	//间隔时间
	var interval = 2000;
	 
	var idx = 0;
	
	//自动轮播
	var timer = setInterval(rightBtnHandler,interval);
	//鼠标进入停止
	carousel.onmouseover = function(){
		clearInterval(timer);
	}
	//鼠标离开开始
	carousel.onmouseout = function(){
		timer = setInterval(rightBtnHandler,interval);
	}
	
	//右按钮的监听
	rightBtn.onclick = rightBtnHandler;
	
	function rightBtnHandler(){
		//函数截流
		if(lis[idx].isanimated) return;
	
		//原来的信号量的图片淡出
		animate(lis[idx],{"opacity" : 0},1000);
		//信号量改变
		idx++;
		if(idx > imgLength - 1){
			idx = 0;
		}
		//新信号量的图片淡入
		animate(lis[idx],{"opacity" : 1},1000);
	
		changeCircle();
	}
	
	//左按钮的监听
	leftBtn.onclick = function(){
		//函数截流
		if(lis[idx].isanimated) return;
	
		//原来的信号量的图片淡出
		animate(lis[idx],{"opacity" : 0},1000);
		//信号量改变
		idx--;
		if(idx < 0){
			idx = imgLength - 1;
		}
		//新信号量的图片淡入
		animate(lis[idx],{"opacity" : 1},1000);
	
		changeCircle();
	}
	
	//批量添加小圆点的监听
	for(var i = 0 ; i <= imgLength - 1 ; i++){
		circlesLi[i].index = i;	//先编号
		circlesLi[i].onclick = function(){
			//截流
			if(lis[idx].isanimated) return;
			
			//原来的信号量的图片淡出
			animate(lis[idx],{"opacity" : 0},1000);
			//信号量改变
			idx = this.index;
			//新信号量的图片淡入
			animate(lis[idx],{"opacity" : 1},1000);
	
			changeCircle();
		}
	}
	
	
	//更换小圆点函数
	function changeCircle(){
		//去掉所有小圆点的cur
		for (var i = 0; i < circlesLi.length; i++) {
			circlesLi[i].className = "";
		}
		//第信号量这个小圆点加cur
		circlesLi[idx].className = "cur";
	}
}