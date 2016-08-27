//获取浏览器的可视窗口
	function getInner(){
			 if(window.innerWidth){
				 return{
					 width:window.innerWidth,
					 height:window.innerHeight
				 };
				 
			 }else{
				 return{
					 width:document.documentElement.clientWidth,
					 height:document.documentElement.clientHeight
				 };
			 }
		
	}
	//获得某一个节点的上一个节点
	function prevIndex(current,parent){
		var length=parent.children.length;
		if(current==0)return length-1;
		return parseInt(current)-1;
	}
		//获得某一个节点的下一个节点
	function nextIndex(current,parent){
		var length=parent.children.length;
		if(current==length-1)return 0;
		return parseInt(current)+1;
	}
	//获得某个元素到顶点的距离
function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;
	while(parent !=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
};
	function getScroll(){
		return{
			top:document.documentElement.scrollTop || document.body.scrollTop,
			left:document.documentElement.scrollLeft || document.body.scrollLeft
		}
	}
	//删除左后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//获取getinnerText方法
function getInnerText(element){
	return (typeof element.textContent=='string') ? element.textContent : element.innerText;
}
//设置getinnerText方法
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
}
//获取CSS样式
function getStyle(element,atr){
	    if(arguments.length==2){
								         if(element.currentStyle){
										     return element.currentStyle[atr];
										 }else{
										     return window.getComputedStyle(element,null)[atr];
										 }
								}
}

function addEvent(obj,type,fn){

	    if(obj.addEventListener)
		{
			obj.addEventListener(type,fn,false);
			
		}else{
			//obj.attachEventListener('on'+type,fn);
		     if(!obj.events) obj.events={};
			 if(!obj.events[type]) 
			 {obj.events[type]=[];
			 if(obj['on'+type]) obj.events[type][0]=fn;
			 }
			 obj.events[type][addEvent.ID++]=fn;
			 obj['on'+type]=addEvent.exec();
		}
	
}
     	 addEvent.ID=1;
	  addEvent.exec=function(e){
		var e=e||event;
		  for(var i in this.events[e.type]){
					 this.events[e.type][i].call(this);
					 
				 }
		
	};
	
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	}else{
		obj.detachEvent('on'+type,fn);
	}
	
}
//判断元素是否在数组里面
function inArray(arr,value){
	for(var i in arr){
		if(arr[i]===value)return true;
	}
	return false;
};
function addDomLoad(fn){
	var timer=null;
	var temp=false;
	function doReady(){
		if(timer)claerInterval(timer);
		if(temp)return
		temp=true;
		fn();
	}
	 if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (document.addEventListener=='undefined'){
		//var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}
//设置cookie
function setCookie(name,value,expire,path,domain,secure){
	var cookeName=encodeURIComponent(name)+'='+encodeURIComponent(value);
	if(expire instanceof Date){
		cookeName+=';expires='+expire;
	}
	if(path){
		cookeName+=';path='+path;
	}
	if(domain){
		cookeName+=';path='+domain;
	}
	if(secure){
		cookeName+=';secure=';
	}
	document.cookie=cookeName;
}
function setCookieday(day){
	var date=new Date();
	if(typeof day=='number'&&day>0){
	date.setDate(date.getDate()+day);
	}else{
		throw new Error('你输入的天数不合法要是数字类型且大于0');
	}	return date;
}

	//获取cookie 
	function getCookie(name){
		var temp=document.cookie.split(';');
		var cookVaule=null;
		for(var i=0;i<temp.length;i++){
			var arr=temp[i].split('=');
			if(name==trim(arr[0])){
				cookVaule=arr[1];
				break;
			}
		}
		return decodeURIComponent(cookVaule);//解码
	}
//移出cookie
function removeCookie(name) {
	document.cookie = name + "= ; expires=" + new Date(0);
}










