var head = new Vue({
	el:'#head',
	data:{
		address:['金翰林','琴湖','北苑','南苑','逸夫楼','一教','三教'],
		imgUrl:'./img/head.png',
		nickname:'',
		Class:'',
		phone:'',
		qq:'',
		weixin:'',
		avatar:''
	},
	methods:{
		upload:function(c,d){
		    "use strict";
		    var $c = document.querySelector(c),
		        $d = document.querySelector(d),
		        file = $c.files[0],
		        reader = new FileReader();
		    reader.readAsDataURL(file);
		    reader.onload = function(e){
		        $d.setAttribute("src", e.target.result);
		    };
		    var head = document.querySelector('#head')
			var data = new FormData(head);
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var result = JSON.parse(ajax.responseText);
					console.log(result);
				}
			}
			ajax.withCredentials = true;
			ajax.open("POST", "https://found.acver.xyz/user/avatar", true);//false同步    true异步
			//ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(data);
     	},
     	JsonToString:function(FormData){
			var data = "";
			Object.keys(FormData).forEach(function(key){
		     	//console.log(key,FormData[key]);
		     	data += key + '=' + FormData[key] + '&';
		     	//console.log(data);
			});
			data = data.substr(0,data.length-1);
			return data;
		},
		judge:function(FormData){
			var patt = /^[^\s]{2,16}$/;
			if(FormData.phone == "" && FormData.qq == "" && FormData.wx == "")
			{
				mui.alert("联系方式至少填一个哦~");
				return false;
			}
			if(patt.test(FormData.nickname) == false)
			{
				mui.alert("昵称长度在2-16个字符，不含空格");
				return false;
			}
			patt = /^[^\s]{5,30}$/;
			if(FormData['class'] != "" && patt.test(FormData['class']) == false)
			{
				mui.alert("班级长度在5-30个字符，不含空格");
				return false;
			}
			patt = /^1[0-9]{10}$/;
			if(FormData.phone != "" && patt.test(FormData.phone) == false)
			{
				mui.alert("手机号格式错误");
				return false;
			}
			patt = /^[0-9]{5,13}$/;
			if(FormData.qq != "" && patt.test(FormData.qq) == false)
			{
				mui.alert("qq长度在5-13个字符，不含空格");
				return false;
			}
			patt = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
			if(FormData.wx != "" && patt.test(FormData.wx) == false)
			{
				mui.alert("班级长度在5-30个字符，不含空格");
				return false;
			}
			return true;
		},
     	submit:function(){
     		
			var FormData = {
				nickname:this.nickname,
				'class':this.Class,
				phone:this.phone,
				qq:this.qq,
				wx:this.weixin
			};
			if(this.judge(FormData)==true)
				this.Ajax(FormData);
			
     	},
     	Ajax:function(FormData){
     		var ajax = new XMLHttpRequest();
     		var data = this.JsonToString(FormData);
			//console.log(data);
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var result = JSON.parse(ajax.responseText);
					console.log(result);
					if(result.code == 0)
					{
						mui.alert("提交成功");
						window.location.href = '../user/user.html'
					}
					else
					{
						mui.alert("未知错误，请联系拱拱管理员")
					}
					
				}
			}
			ajax.withCredentials = true;
			ajax.open("POST", "https://found.acver.xyz/user/update", true);//false同步    true异步
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(data);
     	}
	}
})
window.onload = function(){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log(ajax.responseText);
			var result = JSON.parse(ajax.responseText);
			
			if(result.code == 6)
			{
				mui.alert("请先登录");
				window.location.href = "../login/login.html"
			}
			else{
				result = result.data;
				head.imgUrl = 'https://found.acver.xyz/upload/avatar/' + result.avatar;
				head.nickname = result.nickname;
				head.Class = result['class'];
				head.qq = result.qq;
				head.phone = result.phone;
				head.weixin = result.wx;
			}
		}
	}
	ajax.withCredentials = true;
	ajax.open("GET", "https://found.acver.xyz/user/info", true);//false同步    true异步
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
}
