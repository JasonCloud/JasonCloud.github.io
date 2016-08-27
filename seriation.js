$().extend('seriation',function(){
      for(var k=0;k<this.elements.length;k++){
	  var form=this.elements[k];
	  var temp={};
		for(var i=0;i<form.elements.length;i++){
			var file=form.elements[i];
			switch(file.type){
				case 'reset':
				case 'submit':
				case undefined:
				case 'button':
				case 'file':
				break;
				case 'radio':
				case 'checkbox':
				if(!file.checked)break;
				case 'select-one':
				case 'select-multiple':
				for(var j=0;j<file.options.length;j++){
					var option=file.options[j];
					if(option.selected){
						var optionValue='';
						if(option.hasAttribute){
							optionValue=(option.hasAttribute('value')? option.value :option.text);
						}else{
							optionValue=(option.attributes('value').specified ? option.value :option.text);
						}
						temp[file.name]=optionValue;
					}
				}
				default:
				temp[file.name]=file.value;
			}
		}
		return temp;
	  
	  }
      return this;
});