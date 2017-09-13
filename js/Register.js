var oUserName = document.querySelector("#username");
var oPassWord = document.querySelector("#password");
var oReapt = document.querySelector("#reapet");
var oBtn = document.querySelector("#button");
var oUserror = document.querySelector("#user_error");
var oPaserror = document.querySelector("#pass_error");
var oAgain = document.querySelector("#error_again");
oBtn.onclick = function () {
	myajax.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"register",username:oUserName.value,password:oPassWord.value},
	function(error,responseText){
		oUserror.style.display = "block";
		oPaserror.style.display = "block";
		oAgain.style.display = "block";
		var json = JSON.parse(responseText);
		if(oPassWord.value!=oReapt.value){
			oAgain.style.display = "block";
			oAgain.innerHTML = "输入密码不合";
		}else if(json.code === 0){
			alert("注册成功");
			location.href = "Login.html?username="+oUserName.value;
		}else if (json.code === 2001||json.code ===1000) {
			oUserror.style.display = "block";
			oUserror.innerHTML = json.message;
		}else if (json.code === 1001){
			oPaserror.style.display = "block";
			oPaserror.innerHTML = json.message;
		} 
	})
}
