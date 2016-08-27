/*//document.cookie='user=张三';
//document.cookie='user=张四';
document.cookie='user='+encodeURIComponent('王五');
alert(decodeURIComponent(document.cookie));*/
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
	setCookie('user','lee',setCookieday(7));
	setCookie('url','jnjcikdc',setCookieday(7));
	setCookie('email','dnfjcknd',setCookieday(7));
	//alert(document.cookie);
	
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

	
	
	
	
	