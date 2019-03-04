var nav = new Vue({
	el:'#nav',
	data:{
		imgUrl:"background:url('./user/img/qihoo.png')",
		login:true,
		user:false
	}
})
var searchForm = new Vue({
	el:'#searchForm',
	data:{
		search:'',
		hot:['校园卡','身份证','手机','耳机','水杯','金翰林','琴湖','逸夫楼','南苑','北苑','兴湘','坑里','联建','一教','三教','学活','二田']
	},
	methods:{
		addInSearch:function(e){
			this.search += e.target.innerHTML + " ";
		}
	}
})
var find = new Vue({
	el:'#find',
	data:{
		findTitle:[]
	},
	methods:{
		getId:function(e){
			localStorage.setItem("id", e.target.dataset.id);
			window.location.href="./findDetail/findDetail.html";
		},
		getType:function(e){
			localStorage.setItem("type", e.target.dataset.type);
			window.location.href="./list/list.html";
		}
	}
	
})
var get = new Vue({
	el:'#get',
	data:{
		getTitle:[]
	},
	methods:{
		getId:function(e){
			localStorage.setItem("id", e.target.dataset.id);
			
			window.location.href="./findDetail/findDetail.html";
		},
		getType:function(e){
			localStorage.setItem("type", e.target.dataset.type);
			window.location.href="./list/list.html";
		}
	}
})
function laf(){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log(ajax.responseText);
			var result = JSON.parse(ajax.responseText).data;
			console.log(result);
			for(var i=0;i<Math.min(result.length,8);i++)
			{
				//if(result.img != null)
				//result.img = "https://found.acver.xyz/upload/laf/" + result.lost[i].img;
				result[i].time = result[i].updated_at.substr(5,5);
				if(result[i].type==1)
					find.findTitle.push(result[i]);
				else
					get.getTitle.push(result[i]);
			}
			
		}
	}
	ajax.withCredentials = true;
	ajax.open("GET", "https://found.acver.xyz/laf", true);//false同步    true异步
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
}
function search(){
	var search = document.querySelector('#search');
	search.addEventListener('keypress',function(e){
		if(e.keyCode == 13)
		{
			var content = searchForm.search;
			strs=content.split(" "); //字符分割
			
			for (i=0;i<strs.length ;i++ ) 
			{ 
				if(strs[i]==" "||strs[i]=="")
					strs.splice(i,1);
				
			} 
			localStorage.setItem('keyword',strs);
			localStorage.setItem('type',2);
			window.location.href = "./list/list.html";
		}		
	})
}
window.onload = function(){
	search();
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log(ajax.responseText);
			var result = JSON.parse(ajax.responseText);
			
			if(result.code == 6)
			{
				mui.alert("请先登录");
			
			}
			else{
				var imgUrl = 'https://found.acver.xyz/upload/avatar/' + result.data.avatar;
				nav.login = false;
				nav.user = true;
				nav.imgUrl = "background-image:url(" + imgUrl + ")";
			}
		}
	}
	ajax.withCredentials = true;
	ajax.open("GET", "https://found.acver.xyz/user/info", true);//false同步    true异步
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send();
	laf();
}
