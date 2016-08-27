//window.onload=function(){
//var bas=new Base();
//bas.getId('div1').css('backgroundColor','#ccc').css('color','red');
//$().getId('div1').css('backgroundColor','#ccc').css('color','green');
//alert();
//alert(bas.getId('div1').html());
//$().getId('div1').css('backgroundColor','#ccc');
//$().getTagName('p').css('color','green').html('标题').click(function(){alert('b');});
//alert($().getId('div1').css('fontSize'));
//$().getId('div1').addClass('a').addClass('b').addClass('a').addClass('c');

	$(function(){
		$('#header .memer').hover(function(){
	//$().getClass('memer').css('background','url(images/arrow2.png) no-repeat 70px center');
	$(this).css('background','url(images/arrow2.png) no-repeat 70px center');
	$('#header .memer_ul').show().animation({
		mul:{
			o:1,
			h:110
		}
	});
	
},function(){
	//$().getClass('memer').css('background','url(images/arrow.png) no-repeat 70px center');
	$(this).css('background','url(images/arrow.png) no-repeat 70px center');
	$('#header .memer_ul').animation({
	mul:{
			o:0,
			h:0
		},
		fn:function(){
			$('#header .memer_ul').hide();
		}
	});
})
                var logo=$('#logo');
				var screen=$('#screen');
				addEvent(window,'scroll',function(){
				$('#screen').lock();});
			logo.center(350,250).resize(function(){
	              if(logo.css('display')=='block')	screen.lock();
				  
             });
                   $('#logo .close').click(function(){
					     
	                logo.hide();
					
	                     screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
                     });
                     $('#header .logoin').click(function(){
	                   logo.center(350,250);
					   logo.show();
					   
	                    screen.show().lock().animation({
					 attr:'o',
					 target:0.3
				 });
              });
$('#logo').drag();
//var oDiv=document.getElementById('logo');

//登陆
$('form').eq(1).form('sub').click(function(){
	var _this=this;
	   
	if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(1).form('user').value()))&&$('form').eq(1).form('pass').value().length>=6){
		    _this.disabled=true;
		 $(_this).css('backgroundPosition','right');
	$('#logo .info').html('');
	$('#loading').show().center(200,40);
	$('#loading p').html('正在尝试登陆...');
		ajax({
	     model:'post',
	    url:'is_logo.php',
	syn:true,
	data:$('form').eq(1).seriation(),
	succ:function(text){
		 
	          if(text==1){//登陆失败
				  $('#logo .info').html('登陆失败：用户名或密码不正确！');
				  
			  }else{//登陆成功
			   $('#succ').show().center(200,40);
			      $('#succ p').html('登陆成功！请稍后...');
				   setCookie('user',trim($('form').eq(1).form('user').value()));
				  setTimeout(function(){	               
						 $('#succ').hide();
						 $('#logo form').first().reset();
						 $('#logo').hide();
						
						    screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
						 $('#header .logoin').hide();
						 $('#header .reg').hide();
						 $('#header .login_info').show().html(getCookie('user')+',您好！').css('color','maroon');
						  },1500);
			  }
			  $('#loading').hide();
			  _this.disabled=false;
			  $(_this).css('backgroundPosition','left');
	}
});
	}else{
		$('#logo .info').html('登陆失败：用户名或密码不正确！');
	}
})
//初始化表单
$('form').eq(0).first().reset();
   
	
	  var reg=$('#reg');		
				addEvent(window,'scroll',function(){
				$('#screen').lock();});
            
			reg.center(600,550).resize(function(){
	            reg.center(600,550);
				 screen.lock();
				
             });
                   $('#reg .close').click(function(){
	                reg.hide();
					   $('#reg .submit').first().disabled=false;
		                $('#reg .submit').css('backgroundPosition','left');
						$('#reg .succ').hide();
				      $('#reg .info').hide();
				     $('#reg .error').hide();
	                     screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
                     });
                     $('#header .reg').click(function(){
	                   reg.show();
	                    screen.show().lock().animation({
					 attr:'o',
					 target:0.3
				 });
              });
//拖拽
  $('#reg').drag();
	$('form').eq(0).form('user').bind('focus',function(){
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
	}).bind('blur',function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').hide();
				$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
		}else if(!check_user()){
			$('#reg .error_user').show();
				$('#reg .info_user').hide();
		$('#reg .succ_user').hide();
		}else{
			//alert($(this).value());
			//alert(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(0).form('user').value())));
			//alert(trim($('form').eq(0).form('user').value()));
			$('#reg .succ_user').show();
				$('#reg .info_user').hide();
				$('#reg .error_user').hide();
		
		}
		
	});
	function check_user(){
		var flag=true;
		if(!/[a-zA-Z0-9_]{2,20}/.test(trim($('form').eq(0).form('user').value()))&&!/\s/.test(trim($('form').eq(0).form('user').value()))){
			$('#reg .error_user').html('输入不合法，请重新输入！');
			return false;
		}else{
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			ajax({
	     model:'post',
	    url:'is_user.php',
	syn:false,
	data:$('form').eq(0).seriation(),
	succ:function(text){
		if(text==1){
			$('#reg .error_user').html('用户名已被注册!');
				flag=false;					  
		}else{
			flag=true;
		}
$('#reg .loading').hide();
		
	}
});
		}
	return flag;
	};
	
	//输入密码
	$('form').eq(0).form('pass').bind('focus',function(){
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_pass').hide();
	}else{
		if(check_pass()){
		$('#reg .info_pass').hide();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').show();
		}else{
			$('#reg .info_pass').hide();
		$('#reg .error_pass').show();
		$('#reg .succ_pass').hide();
		
		}
	}
	});
	//密码确认
			$('form').eq(0).form('nopass').bind('focus',function(){
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').hide();
	}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_notpass').hide();
	}else if(check_nopass()){
		$('#reg .info_notpass').hide();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').show();
	}else{
		$('#reg .info_notpass').hide();
		$('#reg .error_notpass').show();
		$('#reg .succ_notpass').hide();
	}
	});
function check_nopass(){
	if(trim($('form').eq(0).form('nopass').value())==trim($('form').eq(0).form('pass').value()))return true;
	return false;
}
		//回答
		$('form').eq(0).form('ans').bind('focus',function(){
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur',function(){
	if(trim($(this).value())==''){
		$('#reg .info_ans').hide();
	}else if(check_ans()){
		$('#reg .info_ans').hide();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').show();
	}else{
		$('#reg .info_ans').hide();
		$('#reg .error_ans').show();
		$('#reg .succ_ans').hide();
	}
	});
	//回答检查
	function check_ans(){
		if(trim($('form').eq(0).form('ans').value()).length>=2&&trim($('form').eq(0).form('ans').value()).length<=32)return true;
	};
	//电子邮件
	$('form').eq(0).form('mesg').bind('focus',function(){
		$('#reg .ul_email').show();
		$('#reg .info_email').show();
		$('#reg .error_email').hide();
		$('#reg .succ_email').hide();
	}).bind('blur',function(){
		$('#reg .ul_email').hide();
	if(trim($(this).value())==''){
		$('#reg .info_email').hide();
	}else if(check_email()){
		$('#reg .info_email').hide();
		$('#reg .error_email').hide();
		$('#reg .succ_email').show();
	}else{
		$('#reg .info_email').hide();
		$('#reg .error_email').show();
		$('#reg .succ_email').hide();
	}
	});
	//电子邮件检测
	function check_email(){
		if(/^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('mesg').value())))return true;
	}
	//电子邮件补全系统移入移出效果
	$('#reg dl .ul_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('color','#369');
	},function(){
		$(this).css('background','none');
		$(this).css('color','#666');
	});
	//电子邮件补全系统
	$('form').eq(0).form('mesg').bind('keyup',function(ev){
		if($(this).value().indexOf('@')==-1){
			
		$('#reg .ul_email li span').html(trim($('form').eq(0).form('mesg').value()));
		$('#reg .ul_email').show();
		}else{
			//$('#reg .ul_email').hide();
		}
		var oEv=ev||event;
		if(oEv.keyCode==40){
			if(this.index==undefined||($('#reg .ul_email li').aboutLength()-1)<=this.index){
				this.index=0;
				}else{
					this.index++;
				}
			$('#reg .ul_email li').css('background','none');
		   $('#reg .ul_email li').css('color','#666');
		   $('#reg .ul_email li').eq(this.index).css('background','#e5edf2');
		 $('#reg .ul_email li').eq(this.index).css('color','#369');
		}
				if(oEv.keyCode==38){
			if(this.index==undefined||this.index<=0){
				this.index=$('#reg .ul_email li').aboutLength()-1;
				}else{
					this.index--;
				}
			$('#reg .ul_email li').css('background','none');
		   $('#reg .ul_email li').css('color','#666');
		   $('#reg .ul_email li').eq(this.index).css('background','#e5edf2');
		 $('#reg .ul_email li').eq(this.index).css('color','#369');
		}
		if(oEv.keyCode==13){
			
			$(this).value($('#reg .ul_email li').eq(this.index).Text());
			$('#reg dl dd .ul_email').hide();
			this.index=undefined;
		}
	});
	//电子邮件补全系统点击添加
	$('#reg .ul_email li').bind('mousedown',function(){
		$('form').eq(0).form('mesg').value($(this).Text());
		//alert($('form').eq(0).form('mesg').value);
		//alert($(this).)
	});
		//密码验证
		$('form').eq(0).form('pass').bind('keyup',function(){
			check_pass();
		});
		function check_pass(){
			var code_length=0;
			var value=trim($('form').eq(0).form('pass').value());
			var value_length=value.length;
			var flag=false;
			if(value_length>=6&&value_length<=20){
				$('#reg .info_pass .q1').html('●').css('color','green');
			}else{
				$('#reg .info_pass .q1').html('○').css('color','#666');
				//alert(' ');
			}
			if(value_length>0&&!/\s/.test(value)){
				$('#reg .info_pass .q2').html('●').css('color','green');
			}else{
				$('#reg .info_pass .q2').html('○').css('color','#666');
			}
			if(/[0-9]/.test(value)){code_length++;}
			if(/[a-z]/.test(value)){code_length++;}
			if(/[A-Z]/.test(value)){code_length++;}
			if(/[^0-9a-zA-Z]/.test(value)){code_length++;}
			if(code_length>=2){
				$('#reg .info_pass .q3').html('●').css('color','green');
			}else{
				$('#reg .info_pass .q3').html('○').css('color','#666');
			}
			if(value_length>=10&&code_length>=3){
				$('#reg .info_pass .s1').css('color','green');
				$('#reg .info_pass .s2').css('color','green');
				$('#reg .info_pass .s3').css('color','green');
				$('#reg .info_pass .s4').html('高').css('color','green');			
			}else if(value_length>=8&&code_length>=2){
				$('#reg .info_pass .s1').css('color','#f60');
				$('#reg .info_pass .s2').css('color','#f60');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('中').css('color','#f60');	
			}else if(value_length>=1){
				$('#reg .info_pass .s1').css('color','maroon');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('低').css('color','maroon');	
			}else if(value_length==0){
				$('#reg .info_pass .s1').css('color','#ccc');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');
				$('#reg .info_pass .s4').html('');	
			}
			if(value_length>=6&&value_length<=20&&!/\s/.test(value)&&code_length>=2){
				return true;	
				}
				return false;
		}
		
		//生日日期注入
		var year=$('form').eq(0).form('year');
		var month=$('form').eq(0).form('month');
		var day=$('form').eq(0).form('day');
		var day30=[4,6,9,11];
		var day31=[1,3,5,7,8,10,12];
         for(var i=1940;i<=new Date().getFullYear();i++){
	                      year.first().add(new Option(i,i),undefined);
             }
		for(var i=1;i<=12;i++){
			month.first().add(new Option(i,i),undefined);
			
		}
		//alert(typeof parseInt('五'));
		year.bind('change',selct_day);
		month.bind('change',selct_day);
		day.bind('change',function(){
			if(check_birthday())$('#reg .error_birthday').hide();
		});
		
			function check_birthday(){
			if(year.value()!=0&&month.value()!=0&&day.value()!=0)return true;
		}
		function selct_day(){		
			if(year.value()!=0&&month.value()!=0){
				day.first().options.length=1;//将日重新归一
			if(inArray(day30,parseInt(month.value()))){
				for(var i=1;i<=30;i++){
					day.first().add(new Option(i,i),undefined);
				}
			}else if(inArray(day31,parseInt(month.value()))){
				for(var i=1;i<=31;i++){
					day.first().add(new Option(i,i),undefined);
				}
			}else{
				if(parseInt(year.value())%4==0&&parseInt(year.value())%100!=0||parseInt(year.value())%400==0){
					for(var i=1;i<=29;i++){
						day.first().add(new Option(i,i),undefined);
					}
				}else{
					for(var i=1;i<=28;i++){
						day.first().add(new Option(i,i),undefined);
					}
				}
			}
			}else{
				day.first().options.length=1;
		}
		};
		//检测生日
	
		//提问
		$('form').eq(0).form('quest').bind('change',function(){
			if($(this).value()==0){
				$('#reg .error_quest').show();
				//alert('');
			}else{
				$('#reg .error_quest').hide();
			}
		});
		//文字超出
		$('form').eq(0).form('ps').bind('keyup',check_text).bind('paste',function(){
			setTimeout(check_text,10);//加延时是因为paste事件先执行
		});
		//文字清尾
		$('#reg .clear').click(function(){
			$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
			check_text();
		});
		function check_text(){
			var last_num=200-$('form').eq(0).form('ps').value().length;
			if(last_num>=0){
			$('#reg .num').eq(0).html(last_num);
			$('#reg .ps').eq(0).show();
			$('#reg .ps').eq(1).hide();
			return true;
			}else{
				$('#reg .num').eq(1).html(Math.abs(last_num)).css('color','red');
			$('#reg .ps').eq(0).hide();
			$('#reg .ps').eq(1).show();
			return false;
			}
		};
			//表单提交
	$('form').eq(0).form('sub').click(function(){
		var _this=this;
		var flag=true;
		if(!check_user()){
			flag=false;
			$('#reg .error_user').show();
		}
			if(!check_pass()){
			flag=false;
			$('#reg .error_pass').show();
		}
		if($('form').eq(0).form('quest').value()==0){
			flag=false;
			$('#reg .error_quest').show();
		}
		if(!check_nopass()){
			flag=false;
			$('#reg .error_notpass').show();
		}
		if(!check_birthday()){
			flag=false;
			$('#reg .error_birthday').show();
		}
		if(!check_text()){
			flag=false;
			alert('备注已超过200字！请重新输入！');
		}
		if(!check_email()){
			flag=false;
			$('#reg .error_email').show();
		}
		if(!check_ans()){
			flag=false;
			$('#reg .error_ans').show();
		}
		
		if(flag){
			_this.disabled=true;
		$(_this).css('backgroundPosition','right');
			$('#loading').center(200,40).show();
	ajax({
	model:'post',
	url:'demo.php',
	syn:true,
	data:$('form').eq(0).seriation(),
	succ:function(text){
		if(text){
						 $('#loading').center(200,40).hide();
						 $('#succ').center(200,40).show();
						  $('#succ p').html('注册成功，请登录...');
						  
				setTimeout(function(){	               
						 $('#succ').hide();
						 $('#reg .succ').hide()
						 $('#reg form').first().reset();
						 $('#reg').hide();
						 _this.disabled=false;
		                $(_this).css('backgroundPosition','left');
						    screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
						  },1500);
		}

		
	}
});
		}
		//alert(seriation($('form').eq(0).first()));
		
	});
	//表单系列化

	/*
	//普通轮播器
	//轮播器初始化
	$('#banner img').hide();
	$('#banner img').eq(0).show();
	$('#banner strong').eq(0).html($('#banner img').eq(0).attr('alt'));
	$('#banner ul li').css('color','#999');
	$('#banner ul li').eq(0).css('color','#333');
	//鼠标滑过li时播放图片
	$('#banner ul li').hover(function(){
		banner(this);
	   clearInterval(atime);
	},function(){
		atime=setInterval(banner_fn,1500);
		auto=$(this).index()+1;
	});
	//自动轮播
	var auto=1;
    var atime=setInterval(banner_fn,1500);
	function banner(obj){
		$('#banner img').hide();
		$('#banner img').eq($(obj).index()).show();
		$('#banner strong').eq(0).html($('#banner img').eq($(obj).index()).attr('alt'));
	    $('#banner ul li').css('color','#999');
	   $(obj).css('color','#333');
	};
	function banner_fn(){
		if(auto>=$('#banner img').aboutLength())auto=0;
		banner($('#banner ul li').eq(auto).first());
		   auto++;
	};
	*/
	//透明度变化的轮播器
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner strong').eq(0).html($('#banner img').eq(0).attr('alt'));
	$('#banner ul li').css('color','#999');
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner ul li').hover(function(){
		if($(this).css('color')!='rgb(51, 51, 51)'&&$(this).css('color')!='#333'){
		banner(this,auto==0 ? $('#banner ul li').aboutLength()-1 :auto-1);
		}
	   clearInterval(atime);
	},function(){
		atime=setInterval(banner_fn,3000);
		auto=$(this).index()+1;
	});
	//自动轮播计数auto
	var auto=1;
	//轮播器的轮播方式1表示透明度正常轮播2表示上下滚动轮播
	var banner_type=2;
    var atime=setInterval(banner_fn,3000);
	function banner(obj,prev){
		$('#banner strong').eq(0).html($('#banner img').eq($(obj).index()).attr('alt'));
	    $('#banner ul li').css('color','#999');
	   $(obj).css('color','#333');
		//$('#banner img').opacity(0);
		if(banner_type==1){
			$('#banner img').eq(prev).animation({
			attr:'o',
			target:0,
			step:10,
			time:110
		}).css('zIndex',1);
		$('#banner img').eq($(obj).index()).animation({
			attr:'o',
			target:1,
			step:10,
			time:110
		}).css('zIndex',2);
		}else if(banner_type==2){
			$('#banner img').eq(prev).animation({
			attr:'y',
			target:150,
			step:10,
			time:30
		}).css('zIndex',1).opacity(100);
		$('#banner img').eq($(obj).index()).animation({
			attr:'y',
			target:0,
			step:10,
			time:30
		}).css('zIndex',2).opacity(100).css('top','-150px');
		}
		
	};
	function banner_fn(){
		if(auto>=$('#banner img').aboutLength())auto=0;
		banner($('#banner ul li').eq(auto).first(),auto==0 ? $('#banner ul li').aboutLength()-1 :auto-1);
		   auto++;
	};
	//延迟加载
	//$('#photo .wait_load').attr('src',$('#photo .wait_load').attr('xsrc'));
	//alert($('#photo .wait_load').attr('xsrc'));
	//alert($('#photo .wait_load').eq(0).offsetTop($('#photo .wait_load').first()));
	//alert(getInner()+getScroll());
	var wait_load=$('.wait_load');
	wait_load.opacity(0);
	addEvent(window,'scroll',_wait_load);
	$(window).bind('resize',_wait_load);
	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.aboutLength();i++){
				var _this=wait_load.ge(i);
	if(getInner().height+getScroll().top>=offsetTop(_this)){
		$(_this).attr('src',$(_this).attr('xsrc')).animation({
			attr:'o',
			target:1,
			time:60,
			step:10
		});
	}else if(getInner().height+getScroll().top<=offsetTop(_this)){
			$(_this).animation({
			attr:'o',
			target:0,
			time:60,
			step:10
		});
	}
			
		}},100);
	}
	
	//
	$('#share').hover(function(){
		$(this).animation(
		{
			'attr':'x',
			'target':0
		});
		
	},function(){
		$(this).animation(
		{
			'attr':'x',
			'target':-212
		});
	});
	
	
//图片预加载
	  var photo_big=$('#photo_big');		
				addEvent(window,'scroll',function(){
				$('#screen').lock();});
				
			 photo_big.center(620,511).resize(function(){
	            photo_big.center(620,511);
				 screen.lock();
				
             });
                   $('#photo_big .close').click(function(){
					 
	                photo_big.hide();
	                     screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
						 //预加载关闭窗口是恢复原始的loading图片
					$('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
                     });
                     $('#photo img').click(function(){
						  photo_big.center(620,511);
	                   photo_big.show();
	                    screen.show().lock().animation({
					 attr:'o',
					 target:0.3
				 });
				 //预加载大图
				 var temp_img=new Image();
				
				 //加载成功onload 加载失败onerror
				 $(temp_img).bind('load',function(){
					 $('#photo_big .big img').attr('src',temp_img.src).animation({
					 attr:'o',
					 target:1
				 }).css('width','600px').css('height','450px').css('top',0).opacity(0);
				 
				
				 });
				 
				   temp_img.src=$(this).attr('bigsrc');
				   var children=this.parentNode.parentNode;
				  prev_next_img(children);
				 
              });
  $('#photo_big').drag();
  
  
  $('#photo_big .big .left').hover(function(){
	  $('#photo_big .big .sl').animation({
		  attr:'o',
		  time:30,
		  step:10,
		  target:0.5
	  });
  },function(){
	   $('#photo_big .big .sl').animation({
		  attr:'o',
		  time:30,
		  step:10,
		  target:0
	  });
  });
    $('#photo_big .big .right').hover(function(){
	  $('#photo_big .big .sr').animation({
		  attr:'o',
		  time:30,
		  step:10,
		  target:0.5
	  });
  },function(){
	   $('#photo_big .big .sr').animation({
		  attr:'o',
		  time:30,
		  step:10,
		  target:0
	  });
  });
  
  //上一张图
  $('#photo_big .big .left').click(function(){
	  $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	  var current_img=new Image();
	  $(current_img).bind('load',function(){
	  $('#photo_big .big img').attr('src',current_img.src).animation({
		  attr:'o',
		  target:1,
		   time:60,
		  step:10
	  }).css('width','600px').css('height','450px').css('top',0).opacity(0);
	  });
	  current_img.src=$(this).attr('src');
	  var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	  prev_next_img(children);
	  
  });
  
  //下一张图
  $('#photo_big .big .right').click(function(){
	   $('#photo_big .big img').attr('src','images/loading.gif').css('width','32px').css('height','32px').css('top','190px');
	  var current_img=new Image();
	  $(current_img).bind('load',function(){
	  $('#photo_big .big img').attr('src',current_img.src).animation({
		  attr:'o',
		  target:1,
		  time:60,
		  step:10
	  }).css('width','600px').css('height','450px').css('top',0).opacity(0);
	  });
	  current_img.src=$(this).attr('src');
	             var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	              prev_next_img(children);
				
  });
  
  
  function prev_next_img(children){
	  var prev_img=new Image();
				   var next_img=new Image();
				   var prev=prevIndex($(children).index(),children.parentNode);
				    var next=nextIndex($(children).index(),children.parentNode);
					prev_img.src=$('#photo_big dl dt img').eq(prev).attr('bigsrc');
					next_img.src=$('#photo_big dl dt img').eq(next).attr('bigsrc');
					$('#photo_big .big .left').attr('src',prev_img.src);
					$('#photo_big .big .right').attr('src',next_img.src);
					$('#photo_big .big img').attr('index',$(children).index());
					$('#photo_big .big .btom_text').html($(children).index()+1+'/'+$('#photo dl dt img').aboutLength());
  }
	/*window.onscroll=function(){
		var top=document.documentElement.scrollTop || document.body.scrollTop;
		//alert('a');
		$('#share').css('top',top+'px');
	};*/
	$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');
	addEvent(window,'scroll',function(){
		$('#share').animation({
			attr:'y',
			target: getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		});
	});
	/*$('#box2').click(function(){
		$(this).animation({
			mul:{
			  
				h:400,
				w:120,
		         o:0.8
			}
		});
	})*/
	$('#nav .about li').hover(function(){
	     var targt=$(this).first().offsetLeft;
		
		 $('#nav .nav_bg').animation({
			 attr:'x',
			 target:targt+20,
			 time:30,
			 step:10,
	      fn:function(){
		  $('#nav .white').animation({
			attr:'x',
			target:0-targt,
			time:30,
			 step:10,
		});
		 }
		 });
		 },function(){
		 $('#nav .nav_bg').animation({
			 attr:'x',
			 target:20,
			 time:30,
			 step:10,
			 	fn:function(){
		$('#nav .white').animation({
			attr:'x',
			target:0
		});
		 }
		 });
	});
$('#sidebar h2').toggle(function(){
	$(this).next().animation({
		mul:{
			o:0,
			h:0
		}
	});
},function(){
	$(this).next().animation({
		mul:{
			o:1,
			h:150
		}
	});
});
//发表博文1
$('#blog').center(580,320).resize(function(){
	              if($('#blog').css('display')=='block')	screen.lock();
				  
             });

$('#header .memer_ul a').eq(0).click(function(){
	$('#blog').show().center(580,320);
	screen.show().lock().animation({
		attr:'o',
		target:0.3
	});
});
$('#blog .close').click(function(){
	$('#blog').hide();
	screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
});
//拖拽
$('#blog').drag();
$('#blog .submit').click(function(){
       var _this=this;
	if(trim($('form').eq(3).form('title').value()).length<=0||trim($('form').eq(3).form('content').value()).length<=0){
		$('#blog .info').html('发表失败：标题或者内容为空！');
		
	}else{
		_this.disabled=true;
			  $(_this).css('backgroundPosition','right');
		$('#blog .info').html('');
		$('#loading').show().center(200,40);
		$('#loading p').html('正在发表博文...');
		ajax({
	     model:'post',
	    url:'add_blog.php',
	syn:true,
	data:$('form').eq(3).seriation(),
	succ:function(text){
	          if(text){
			   $('#succ').show().center(200,40);
			      $('#succ p').html('博文发表成功!');
				 
				  setTimeout(function(){	               
						 $('#succ').hide();
						 $('#blog form').first().reset();
						 $('#blog').hide();
						
						    screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
						$('#loading').hide();
			  _this.disabled=false;
			  $(_this).css('backgroundPosition','left');
			   $('#index .out').html('<span class="loading"></span>');
                $('#index .loading').show();
				ajax({
					model:'post',
						url:'get_blog.php',
					syn:true,
					data:{},
					succ:function(text){
					 var json=JSON.parse(text);
					 var html='';
					 for(var i=0;i<json.length;i++){
							html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
					}
					$('#index .loading').hide();
					 $('#index .out').html(html);
					  for(var i=0;i<json.length;i++){
					 $('#index .content').eq(i).animation({
						 attr:'o',
						 target:1
					 });
					}
					}
				});
						  },1500);
			  }
			  
	}
});
	}
});
//第二种发表博文

$('#nowblog .submit').click(function(){
       var _this=this;
	if(trim($('form').eq(2).form('title').value()).length<=0||trim($('form').eq(2).form('content').value()).length<=0){
		if(trim($('form').eq(2).form('title').value()).length<=0){
			$('#nowblog dl dd span').eq(0).html('标题不能为空').css('color','red');
			$('#nowblog dl dd span').eq(1).html('');
		}else if(trim($('form').eq(2).form('content').value()).length<=0){
			$('#nowblog dl dd span').eq(1).html('内容不能为空').css('color','red');
			$('#nowblog dl dd span').eq(0).html('');
		}else if(trim($('form').eq(2).form('title').value()).length<=0&&trim($('form').eq(2).form('content').value()).length<=0){
			$('#nowblog dl dd span').eq(0).html('标题不能为空').css('color','red');
			$('#nowblog dl dd span').eq(1).html('内容不能为空').css('color','red');
		}
		
	}else{
		_this.disabled=true;
			  $(_this).css('backgroundPosition','right');
		$('#loading').show().center(200,40);
		$('#loading p').html('正在发表博文...');
		ajax({
	     model:'post',
	    url:'add_blog.php',
	syn:true,
	data:$('form').eq(2).seriation(),
	succ:function(text){
	          if(text){
			   $('#succ').show().center(200,40);
			      $('#succ p').html('博文发表成功!');
				 
				  setTimeout(function(){	               
						 $('#succ').hide();
						 $('#nowblog form').first().reset();
						    screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
						$('#loading').hide();
			  _this.disabled=false;
			  $(_this).css('backgroundPosition','left');
			   $('#index .out').html('<span class="loading"></span>');
                $('#index .loading').show();
				ajax({
					model:'post',
						url:'get_blog.php',
					syn:true,
					data:{},
					succ:function(text){
					 var json=JSON.parse(text);
					 var html='';
					 for(var i=0;i<json.length;i++){
							html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
					}
					$('#index .loading').hide();
					 $('#index .out').html(html);
					  for(var i=0;i<json.length;i++){
					 $('#index .content').eq(i).animation({
						 attr:'o',
						 target:1
					 });
					}
					}
				});
						  },1500);
			  }
			  
	}
});
	}
});
//获取博文
//$('#index').html('<span class="loading"></span>');
//$('#index .loading').show();
ajax({
	model:'post',
	    url:'get_blog.php',
	syn:true,
	data:{},
	succ:function(text){
	 var json=JSON.parse(text);
	 var html='';
	 for(var i=0;i<json.length;i++){
	        html+='<div class="content"><h2><em>'+json[i].date+'</em>'+json[i].title+'</h2><p>'+json[i].content+'</p></div>';
	}
	//$('#index .loading').hide();
	 $('#index .out').html(html);
	  for(var i=0;i<json.length;i++){
	 $('#index .content').eq(i).animation({
		 attr:'o',
		 target:1
	 });
	}
	}
});
//换肤
$('#skin').center(650,360).resize(function(){
	              if($('#skin').css('display')=='block')	screen.lock();
				  
             });

$('#header .memer_ul a').eq(1).click(function(){
	$('#skin').show().center(650,360);
	screen.show().lock().animation({
		attr:'o',
		target:0.3
	});
	$('#skin .skin_bg').html('<span></span>');
	  ajax({
	model:'post',
	    url:'get_skin.php',
	syn:true,
	data:{
		'type':'all'
	},
	succ:function(text){
	 var json=JSON.parse(text);
	 var html='';
	 for(var i=0;i<json.length;i++){
	        html+='<dl><dt><img src="images/'+json[i].small_bg+'" big_bg="'+json[i].big_bg+'" bg_color="'+json[i].bg_color+'"/></dt>'+'<dd>'+json[i].bg_text+'</dd></dl>';
	}
	 $('#skin .skin_bg').html(html).opacity(0).animation({
		 attr:'o',
		 target:1
	 });
	 
     $('#skin dl dt img').click(function(){
        $('body').css('background',$(this).attr('bg_color')+' url(images/'+$(this).attr('big_bg')+') repeat-x');
		     ajax({
				model:'post',
					url:'get_skin.php',
				syn:true,
				data:{
					'type':'set',
					'big_bg':$(this).attr('big_bg')
				},
				succ:function(text){
				$('#succ').show().center(200,40);
				$('#succ p').html('皮肤更换成功...');
				setTimeout(function(){
					$('#succ').hide();
				},1500);
				}
				});
	 });
	}
});
});
$('#skin .close').click(function(){
	$('#skin').hide();
	screen.animation({
							 attr:'o',
							 target:0,
							 fn:function(){
								 screen.hide();
							 }
						 });
});
		//拖拽
		$('#skin').drag();
			ajax({
				model:'post',
					url:'get_skin.php',
				syn:true,
				data:{
					'type':'main'
				},
				succ:function(text){
					var json=JSON.parse(text);
					$('body').css('background',json.bg_color+' url(images/'+json.big_bg+') repeat-x');
				}
				});
	
	});








