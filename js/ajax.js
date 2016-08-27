
//封装ajax
function ajax(obj){
	var xhr=(function(){
		if(typeof XMLHttpRequest !='undefined'){
		  return new XMLHttpRequest();
	  }else if(typeof ActiveXObject !='undefined'){
		  var version=[
		             'MSXML2.XMLHttp.6.0',
					 'MSXML2.XMLHttp.3.0',
					 'MSXML2.XMLHttp'
		  ];
		  for(var i=0;i<version.length;i++){
			  
			  try{
				  return new ActiveXObject(version[i]);
			  }catch(e){
				  //跳过
			  }
			  
		  }
	  }else{
		  throw new Error('你的浏览器不支持XHR');
	  }
	})();
	obj.url=obj.url+'?random='+Math.random();//解决缓存
	obj.data=(function(data){
		        var temp=[];
             for(var i in data){
			   temp.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
		   }			  
		   return temp.join('&');
	})(obj.data)
	if(obj.model==='get')obj.url +=obj.url.indexOf('?') ==-1? '?'+obj.data: '&'+obj.data;
		xhr.open(obj.model,obj.url,obj.syn);
	if(obj.model==='post'){
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else{
		xhr.send();
	}
	if(obj.syn===true){
				xhr.onreadystatechange=function(){
			   if(xhr.readyState==4){				  
		             callback();	
			   }
				}
	}else{
			  callback();
	}

	function callback(){
		 if(xhr.status==200){
				   obj.succ(xhr.responseText);   
			   }else{
				   alert('打开错误，错误代码为：'+xhr.status+'错误信息是：'+xhr.statusText);
			   }
	};

}








		
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 
				 