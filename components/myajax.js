(function(){
  //唯一向外暴露一个顶层变量
  var myajax = window.myajax = {};
  //作者、版本号信息
  myajax.author = "maxwelldu";
  myajax.version = "1.0.0";

  //这个对象有两个方法，一个get,一个post
  myajax.get = function(URL, queryJSON, callback) {
    //创建xhr对象，解决兼容性问题
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //结果返回之后要做的事情
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          callback && callback(null, xhr.responseText);
        } else {
          callback && callback(new Error("没有要请求的文件"), undefined);
        }
      }
    };
    //拼接字符串
    var queryString = myajax._queryjson2querystring(queryJSON);
    //配置
    xhr.open('GET', URL + "?" + queryString, true);
    //发送
    xhr.send(null);
  }

  myajax.post = function(URL, queryJSON, callback) {
    //创建xhr对象，解决兼容性问题
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //结果返回之后要做的事情
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          callback && callback(null, xhr.responseText);
        } else {
          callback && callback(new Error("没有要请求的文件"), undefined);
        }
      }
    };
    //拼接字符串
    var queryString = myajax._queryjson2querystring(queryJSON);
    //配置
    xhr.open('POST', URL, true);
    //发送
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.send(queryString);
  }



  //内部函数，查询json变成查询字符串
  //输入一个{"name":"max", "age":18, "sex":"男"}
  //返回一个name=max&age=18&sex=%E8%C6%B6
  myajax._queryjson2querystring = function(json) {
    var arr = [];
    for (var k in json) {
      arr.push(k + '=' + encodeURIComponent(json[k]));
    }
    return arr.join('&');
  }
})();


//获取页面地址的参数值
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//获取页面地址的参数值
function getQueryString(name) {
  var search = location.search.substr(1);
  //abc=123&a=&ccc=abc
  //(^|&)   (&|$)
  //abc=([^&]*)
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = search.match(reg);
  // if (result === null) return null;
  // return decodeURIComponent(result[2]);
  return result === null ? null : decodeURIComponent(result[2]);
}