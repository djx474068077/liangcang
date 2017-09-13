var oUseName = document.querySelector("#usename") ;
var oPassWord = document.querySelector("#password");
var oBtn = document.querySelector("#button");
var oUseError = document.querySelector("#use_error");
var oPassError = document.querySelector("#pass_error");
oBtn.onclick = function () {
	myajax.post("http://h6.duchengjiu.top/shop/api_user.php",
	{
		status:"login",
		username:oUseName.value,
		password:oPassWord.value
	},function(error,responseText){
		oUseError.style.display = "block";
		oPassError.style.display = "block";
		var json = JSON.parse(responseText);
		if (json.code === 0) {
			alert("登陆成功");
			localStorage.username = json.data.username;
			localStorage.token = json.data.token;
			location.href = "index.html";
		}else if(json.code === 2002||json.code===1000){
			oUseError.style.display = "block";
			oUseError.innerHTML = json.message;
		}else{
			oPassError.innerHTML = json.message;
		}
	});
}
