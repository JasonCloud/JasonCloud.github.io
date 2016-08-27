function $(targs){
      return new Base(targs);
}
//构造函数
function Base(targs){
      this.elements=[];
	  
	  if(typeof targs=='string'){
		  //alert(targs.indexOf(' '));
		    if(targs.indexOf(' ')!=-1){
				var tem=targs.split(' ');
				//alert(tem);
				
				var childelement=[];
				var node=[];
				for(var i=0;i<tem.length;i++){
					 if(node.length==0)node.push(document);
					 switch(tem[i].charAt(0)){
			  case '#':
			                    childelement=[];
			                   childelement.push(this.getId(tem[i].substring(1)));
			                node=childelement;
			  break;
			  case '.':
			    childelement=[];
				for(var j=0;j<node.length;j++){
					        var temp=this.getClass(tem[i].substring(1),node[j]);
							for(var k=0;k<temp.length;k++){
								     childelement.push(temp[k]);
								      
							}
					
				}
			    node=childelement;
			  break;
			  default:
			  //alert('p');
			     childelement=[];
			  	for(var j=0;j<node.length;j++){
					//alert(node[j]);
					        var temp=this.getTagName(tem[i],node[j]);
							for(var k=0;k<temp.length;k++){
								     childelement.push(temp[k]);
								      
							}
					
				}
				 node=childelement;
			  break;
		  }
			
       this.elements= childelement;
				}			
			}
			else{
		  switch(targs.charAt(0)){
			  case '#':
			   this.elements.push(this.getId(targs.substring(1)));
			  break;
			  case '.':
			   this.elements=this.getClass(targs.substring(1));
			  break;
			  default:
			 this.elements=this.getTagName(targs);
			  break;
		  }
			}
	  }
	  else if(typeof targs=='object'){
	  {this.elements[0]=targs;}}
	   else if(typeof targs=='function'){
		  // alert('a');
		   this.ready(targs);
	   }
}
Base.prototype.ready=function(fn){
	addDomLoad(fn);
	
}
Base.prototype.find=function(targ){
	var childelements=[];
	  for(var i=0;i<this.elements.length;i++){		 
		    switch(targ.charAt(0)){
			  case '#':
			 childelements.push(document.getElementById(targ.substring(1)));
			  break;
			  case '.':
		        var temeps=this.getClass(targ.substring(1),this.elements[i]);
				for(var j=0;j<temeps.length;j++){
							  childelements.push(temeps[j]);						  
				}		
			  break;
			  default:
			  var tag=this.elements[i].getElementsByTagName(targ);
			  for(var j=0;j<tag.length;j++){
				     childelements.push(tag[j]);	  
			  }
			  break;
		  }
	  }
	  this.elements=childelements;
	return this;
};
Base.prototype.first = function () {
	return this.elements[0];
};
//动画运动
//var timer=null;
Base.prototype.animation=function(obj){
	//alert('c');
	          
	         for(var i=0;i<this.elements.length;i++){
				                       var element=this.elements[i];
				                   var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':obj['attr']=='h'?'height':obj['attr']=='w'?'width':obj['attr']=='o'?'opacity':'left';
								   var start=obj['start']!=undefined?obj['start']:getStyle(element,attr);
								   var step=obj['step']!=undefined?obj['step']:5;
								  var t=obj['time']!=undefined?obj['time']:30;
								  //var targ=obj['alter']+parseFloat(start);
								    var speed=obj['speed']!=undefined?obj['speed']:6;
									var type=obj['type']==0?'yunshu':obj['type']==1?'buff':'buff';
									var alter=obj['alter'];
									var targ=obj['target'];
									var mul=obj['mul'];
									if(mul==undefined){
										mul={};
										mul[attr]=targ;
									}
									if(alter!=undefined&&targ==undefined){
										targ=obj['alter']+parseFloat(start);
										
									}else if(alter==undefined&&targ==undefined&&mul==undefined){
										
										throw new Error('alter 和target必须要有一个！');
									}
				                 

								 clearInterval(element.timer);
				              
								//var t=50;
								 //alert(targ);
								 
								 if(attr=='opacity'){						
								 element.style[attr]=parseFloat(start);		
                                     							 
								 }else{
								 element.style[attr]=start+'px';
								  	
								 }
								 //if(attr=='opacity')start=parseFloat(start)*100;
								 if(start>=targ)step=-step;
								//alert(step);
								
								  element.timer=setInterval(function(){
									  var flag=true;//用于判断动画是否执行结束
									  
									  for(var i in mul){
										  attr=i=='x'?'left':i=='y'?'top':i=='h'?'height':i=='w'?'width':i=='o'?'opacity':i!=undefined?i:'left';
										  targ=mul[i];
									 if(type=='buff'){
										 step=attr=='opacity'?(targ*100-parseFloat(getStyle(element,attr))*100)/speed:
										               (targ-parseFloat(getStyle(element,attr)))/speed;
										 step=step>0?Math.ceil(step):Math.floor(step);
										 //alert(step);
									 }	
									 if(attr=='opacity'){
										 
										 if(step>0&&Math.abs(parseFloat(getStyle(element,attr))*100-targ*100)<=step){
										           setOpacity();
									 }else if(step<0&&(parseFloat(getStyle(element,attr))*100-targ*100)<=Math.abs(step)){
										 
										 setOpacity();
									 }else{
										 var temp=parseInt(parseFloat(getStyle(element,attr))*100);
										 element.style[attr]=parseInt(temp+step)/100;
										
										 element.style.filter='alpha(opacity='+parseInt(temp+step)+')';
									 }
										 if(targ!=parseFloat(getStyle(element,attr)))flag=false;
									 }else{
									 if(step>0&&Math.abs(parseFloat(getStyle(element,attr))-targ)<=step){
										           setPostion();
									 }else if(step<0&&parseFloat(getStyle(element,attr))-targ<=Math.abs(step)){
										 setPostion();
									 }else{
										 element.style[attr]=parseFloat(getStyle(element,attr))+step+'px';
										 
									 }
									 }
									if(targ!=parseFloat(getStyle(element,attr)))flag=false;
									 }
								   if(flag)
								   {
									   clearInterval(element.timer);
										 if(obj.fn!=undefined)obj.fn();//队列动画
								   }
								 },t);
			 }
				              function setPostion(){
										  element.style[attr]=targ+'px';
										
			 }
			 function setOpacity(){
										  element.style[attr]=parseFloat(targ);
										 element.style.filter='alpha(opacity='+parseFloat(targ)+')';
										
			 }
	return this;
}
Base.prototype.bind=function(eve,fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],eve,fn);
		
	}
	//alert(' ');
	return this;
}
//form表单
Base.prototype.form=function(name){
	//alert(this.elements.length);
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
		//alert(this.elements[i]);
	}
	
	return this;
}
Base.prototype.value=function(comtent){
             if (arguments.length==0){
			      return this.elements[0].value;
			 }
			 for(var i=0;i<this.elements.length;i++){
			             this.elements[i].value=comtent;
}
return this
};
//获取元素的属性值
Base.prototype.attr=function(str,value){
	for(var i=0;i<this.elements.length;i++){
           if(arguments.length==1){
	                return this.elements[i].getAttribute(str);
		   }else if(arguments.length==2){
			        this.elements[i].setAttribute(str,value);
		   }
	}
	return this
};

//透明度的设置函数
Base.prototype.opacity=function(num){
	for(var i=0;i<=this.elements.length-1;i++){
		this.elements[i].style.opacity=num /100;
		this.elements[i].style.filter='alpha(opacity='+num+');'
	}
	return this;
};
//获得相应的索引值
Base.prototype.index=function(){
	var child=this.elements[0].parentNode.children;
	for(var i=0;i<child.length;i++){
		if(this.elements[0]==child[i])return i;
	}
};
//获取ID元素
Base.prototype.getId=function(id){
			          //this.elements.push(document.getElementById(id));
					  //return this;		 
					  return document.getElementById(id);
			   };
//获取元素
			    Base.prototype.getTagName=function(tag,parentNode){
				        /* var tags=document.getElementsByTagName(tag);
				       for(var i=0;i<tags.length;i++){
			                         this.elements.push(tags[i]);
					  }
					  //alert(this.elements.length);
					  return this;		*/
					  //alert('q');
                      var node=null;
					   var temps=[];
					   if(parentNode!=undefined){
					        node=parentNode;
					   }else{
					         node=document;
					   }
                    var all=node.getElementsByTagName(tag);
					//alert(all.length);
                      for(var i=0;i<all.length;i++){				          
							        temps.push(all[i]);				 
					      }	
             return temps;							  
			   };
//修改CSS样式
Base.prototype.css=function(atr,value){
                       for(var i=0;i<this.elements.length;i++){
						   if(arguments.length==1){
					            return getStyle(this.elements[i],atr);	
						   }								
                                 this.elements[i].style[atr]=value;
					  }
					  return this;
					  };
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		(function(element,arg){
			  var count=0;
			addEvent(element,'click',function(){
				arg[count++%arg.length].call(this);
			});
		})(this.elements[i],arguments);
		   
	}
	return this;
};
//获取类元素
Base.prototype.getClass=function(className,parentNode){
	                    //alert(className);
						//alert(parentNode);
                       var node=null;
					   var temps=[];
					   if(parentNode!=undefined){
					        node=parentNode;
					   }else{
					         node=document;
					   }
                    var all=node.getElementsByTagName('*');
                      for(var i=0;i<all.length;i++){
					           //if(all[i].className==className){
								   if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className)){
							        temps.push(all[i]);
									//alert('');
							   }
					      }	
             //return this;	
              //for(var i=0;i<trem.length;i++)	{alert(trem[i].tagName);} 
			  //alert(temps);
             return temps;		
     			 
};
//get element 
Base.prototype.getElement=function(num){
                      var element=this.elements[num-1];
					  this.elements=[];
					  this.elements[0]=element;
					  return this;

};
//添加类
Base.prototype.addClass=function(classname){
                          
                            for(var i=0;i<this.elements.length;i++){
							    if(!this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)')))
								{
							          this.elements[i].className+=' '+classname;
								}
							}
				return this;

};
//删除类元素
Base.prototype.removeClass=function(classname){
                          
                            for(var i=0;i<this.elements.length;i++){
							    if(this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)')))
								{
							         this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)'),' ');
								}
							}
				return this;

};
//鼠标移入移出事件
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
	//this.elements[i].onmouseover=over;
	//this.elements[i].onmouseout=out;
	addEvent(this.elements[i],'mouseover',over);
	addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
		
	}
	return this;
}
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		
	}
	return this;
}
//获取元素内容
Base.prototype.html=function(comtent){
             if (arguments.length==0){
			      return this.elements[0].innerHTML;
			 }
			 for(var i=0;i<this.elements.length;i++){
			             this.elements[i].innerHTML=comtent;
}
return this
};
//获取元素
Base.prototype.Text=function(comtent){
             if (arguments.length==0){
			      return getInnerText(this.elements[0]);
			 }
			 for(var i=0;i<this.elements.length;i++){
			            setInnerText(this.elements[i],comtent);
}
return this
};
//点击事件
Base.prototype.click=function(fn){
                  for(var i=0;i<this.elements.length;i++){
				        this.elements[i].onclick=fn;
				  }

};
//居中
Base.prototype.center=function(width,height){
	         var temp=getInner().height-height >0?(getInner().height-height)/2 :0;
	        var top=temp+getScroll().top;
			//var top=(getInner().height-height)/2+getScroll().top;
			var left=(getInner().width-width)/2+getScroll().left;
	      for(var i=0;i<this.elements.length;i++){
			     this.elements[i].style.top=top+'px';
				 this.elements[i].style.left=left+'px';
			 
		  }
		  return this;
};
//改变窗口时执行相应函数
Base.prototype.resize=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
                  addEvent(window, 'resize', function () {
			fn();
			if (element.offsetLeft > getInner().width + getScroll().left - element.offsetWidth) {
				element.style.left = getInner().width + getScroll().left - element.offsetWidth + 'px';
				if (element.offsetLeft <= 0 + getScroll().left) {
					element.style.left = 0 + getScroll().left + 'px';
				}
			}
			if(element.offsetTop > getInner().height + getScroll().top - element.offsetHeight) {
				element.style.top = getInner().height + getScroll().top - element.offsetHeight + 'px';
				if (element.offsetTop <= 0 + getScroll().top) {
					element.style.top = 0 + getScroll().top + 'px';
				}
			}
		});

	}
	  return this;
	
};
//查找下一个元素
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null)throw new Error('no find next node');
		if(this.elements[i].nodeType==3)this.next();
	}
	return this;
};
//查找上一个元素
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null)throw new Error('no find previous node');
		if(this.elements[i].nodeType==3)this.prev();
	}
	return this;
};
//遮罩
Base.prototype.lock=function(){
	       for(var i=0;i<this.elements.length;i++){
			   this.elements[i].style.width=getInner().width+getScroll().left+'px';
			   this.elements[i].style.height=getInner().height+getScroll().top+'px';
			  // this.elements[i].style.width=document.documentElement.clientWidth+'px';
			   //this.elements[i].style.height=document.documentElement.clientHeight+'px';
			  
		   }
	     return this;
};
//取得某个指定的元素
Base.prototype.eq=function(num){
	var element=this.elements[num];
           this.elements=[];
		   this.elements[0]=element;
	      return this;
};
//取得某个指定的元素
Base.prototype.ge=function(num){
	return this.elements[num];
};
//阻止默认行为
Base.prototype.preDef=function(ev){
	var e=ev||event;
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
};

//获取元素的个数
Base.prototype.aboutLength=function(){
	return this.elements.length;
};
//拖拽
Base.prototype.drag=function(){
	    for(var i=0;i<this.elements.length;i++){
			this.elements[i].onmousedown=function(ev){
		var _this=this;
		var oEvent=ev||event;
		var disX= oEvent.clientX-_this.offsetLeft;
		var disY= oEvent.clientY-_this.offsetTop;
		if(_this.setCapture){
			//_this.setCapture();在IE会造成弹框无法选中
			}else{
			window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
		}
			  	if (oEvent.target.tagName=='H2') {
						
				addEvent(document, 'mousemove', move);
				addEvent(document, 'mouseup', up);
			} else {
				removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
			}
		function move(ev){
			      var oEvent=ev||event;
				  var left=oEvent.clientX-disX;
				  var top=oEvent.clientY-disY;
				  if(left<0)
				  {left=0;}else if(left>getInner().width+getScroll().left-_this.offsetWidth){
					  left=getInner().width+getScroll().left-_this.offsetWidth;
				  }else if(top<0){top=0;}else if(top<getScroll().top){
					  top=getScroll().top;
					  }else if(top>getInner().height+getScroll().top-_this.offsetHeight){
					  top=getInner().height+getScroll().top-_this.offsetHeight;
				  }
	        	_this.style.left=left +'px';
				_this.style.top=top +'px';
			
		};
		function up(){
			   removeEvent(document, 'mousemove', move);
				removeEvent(document, 'mouseup', up);
			   if(_this.releaseCapture){
				   //_this.releaseCapture();
				   }else{
				   //window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
			   }
			
		};
	};
		}
		return this;
	
};
//插件入口
Base.prototype.extend = function (name, fn) {
	Base.prototype[name] = fn;
};











