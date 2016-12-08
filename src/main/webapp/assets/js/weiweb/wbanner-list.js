$(document).ready(function(){
	
//列表分页每页显示多少条记录
var global_limit = 10 ;
	//初始化微网站列表信息
	initTwwBannerListInfo();
	
	
	//新增微网站信息时，validate验证，验证通过后调用保存方法 
	$("#addTwwBannerForm").validate({
        submitHandler:function(form){
        	addTwwBanner();
        }    
    });
	
	//新增微网站信息
	$("#saveTwwBannerBtn").click(function(){
		var imagePath=$("#path").val();
		if(imagePath==null || imagePath.trim()==""){
			alert("图片链接不能为空!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		uploader.start();
//		var form = $("#addTwwBannerForm");
//		form.submit();
	});
	
	//选中微网站信息
	$("#twwBannerListTable").delegate("tr","click",function(){
		var path = $(this).find("td:eq(1)").html();
		var name = $(this).find("td:eq(2)").html();
		var bannerId = $(this).find("td:eq(3)").html();
		var createUser = $(this).find("td:eq(4)").html();
		var linkModuleId = $(this).find("td:eq(5)").html();
		var url = $(this).find("td:eq(6)").html();
		var linkType = $(this).find("td:eq(7)").html();
		if (linkType=="内部链接") {
			linkType="inner";
		}else if(linkType=="外部链接"){
			linkType="outer";
		}
		var url = contextPath + "/weiweb/twwbanner/getById";
		var params={"bannerId":bannerId}
		//异步请求贷款信息列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			$("#oldPath").val(data.object.imagePath);
			console.info($("#oldPath").val()+"哈哈哈哈");
		});
		
		$("#edit-path").val(path);
		$("#edit-name").val(name);
		$("#edit-bannerId").val(bannerId);
		$("#edit-createUser").val(createUser);
		$("#edit-linkModuleId").val(linkModuleId);
		$("#edit-url").val(url);
		$("#edit-linkType").val(linkType);
		
		$(this).css("background","#DFEBF2").siblings().css("background","#FFFFFF");
		return false;
	});
	
	
	//修改微网站信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editTwwBannerForm").validate({
        submitHandler:function(form){
        	editTwwBanner();
        }    
    });
	
	//保存编辑的微网站信息
	$("#edit-saveTwwBannerBtn").click(function(){
		var imagePath = $("#edit-path").val();
		var oldImagePath=$("#oldPath").val();
		console.info(oldImagePath);
		if(imagePath==null || imagePath.trim()==""){
			$("#edit-path").val(oldImagePath);
			var formdata=$("#editTwwBannerForm").serialize();
			var url=contextPath+"/weiweb/twwbanner/updateTwwBanner";
			Util.ajax.postJson(url, formdata, function(data, flag){
				  if(flag && data.returnCode=="0"){
					alert("网点信息更新成功!",$.scojs_message.TYPE_OK);
					initTwwBannerListInfo();
					$("#myModal1").modal('hide');
				  }
				});
		}
			editTwwBannerUploader.start();
		
		
		
		
//		var form = $("#editTwwBannerForm");
//		form.submit();
	});
	//编辑微网站信息
	$("#editTwwBannerBtn").click(function(){
		var bannerId = $("#edit-bannerId").val();
		if(bannerId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		$("#edit-path").val("");
		var imagePath = $("#oldPath").val();
		$('#edit-preview').html($( '<img src="/wxadminweb/viewImage/viewImage?imgPath='+imagePath+'" style="width:380px;height:200px;" alt="正在加载..." />'));
	});
	
	//删除微网站信息
	$("#delTwwBannerBtn").click(function(){
		//logicDelTwwBanner();//逻辑删除
		delTwwBanner()
	});
	
	//查询按钮
	$("#querySubmit").click(function(){
		initTwwBannerListInfo();
	});
	//局部绑定回车事件
	 $("#queryName").bind('keyup',function(event){
		    event=document.all?window.event:event;
		    if((event.keyCode || event.which)==13){
		    	document.getElementById("querySubmit").click();
		    }
		   }); 
	
	//初始化微网站列表信息
	function initTwwBannerListInfo(currentPage, limit){
		if(typeof currentPage == "undefined"){
			currentPage = 1;
		}
		if(typeof limit == "undefined"){
			limit = global_limit;
		}
		var url = contextPath + "/weiweb/twwbanner/getList";
		var params = $("#queryForm").serialize();
		params = params + "&pageNumber="+currentPage+"&limit="+limit;
		//异步请求微网站列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			for (var i = 0; i < data.beans.length; i++) {
				if (data.beans[i].linkType=="inner") {
					data.beans[i].linkType="内部链接";
				}else if (data.beans[i].linkType=="outer") {
					data.beans[i].linkType="外部链接";
				}
			}
			var source = $("#twwBanner-list-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#twwBannerListTable").html(htmlStr);
				//初始化分页数据(当前页码，总数，回调查询函数)
				initPaginator(currentPage, data.bean.count, initTwwBannerListInfo);
			}
		});
	}
	
	
	//新增微网站信息
	function addTwwBanner(){
		var url = contextPath + "/weiweb/twwbanner/insertTwwBanner";
		var params = $("#addTwwBannerForm").serialize();
		//异步请求新增微网站信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					//$("#alert-info-content").html("微网站新增成功!");
					//$("#alert-info").modal("show");
					alert("微网站新增成功!");
					$("#myModal").modal('hide');
					//重新请求列表数据
					initTwwBannerListInfo();
					//清空新增微网站的弹窗信息
					$("#addTwwBannerForm input").val("");
					$("#descn").val("");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微网站编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
	//修改微网站信息
	function editTwwBanner(){
		var bannerId = $("#edit-bannerId").val();
	
		if(bannerId==""){
		alert("请选择一条信息!");
		return false;
	}
	
		var url = contextPath + "/weiweb/twwbanner/updateTwwBanner";
		var params = $("#editTwwBannerForm").serialize();
		//异步请求修改微网站信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微网站信息修改成功!");
					//编辑微网站信息清空
					$("#editTwwBannerForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initTwwBannerListInfo();
					$("#myModal1").modal('hide');
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微网站编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	//删除微网站
	function delTwwBanner(){
		var bannerId = $("#edit-bannerId").val();
		if(bannerId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/weiweb/twwbanner/deleteTwwBanner";
			var params = $("#editTwwBannerForm").serialize();
			//异步请求逻辑删除微网站信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("微网站删除成功!");
						//编辑微网站信息清空
						$("#editTwwBannerForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initTwwBannerListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
	//逻辑删除微网站
	function logicDelTwwBanner(){
		var bannerId = $("#edit-bannerId").val();
		if(bannerId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/weiweb/twwbanner/logicDeleteTwwBanner";
			var params = $("#editTwwBannerForm").serialize();
			//异步请求逻辑删除微网站信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("微网站删除成功!");
						//编辑微网站信息清空
						$("#editTwwBannerForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initTwwBannerListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
	
	//实例化一个plupload上传对象
	var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
		browse_button : 'path',
		url : contextPath+'/weiweb/twwbanner/doUpload',
	    flash_swf_url : '${req.contextPath}/assets/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
	    silverlight_xap_url : '${req.contextPath}/assets/plupload/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
	    filters: {
	   	  mime_types : [ //只允许上传图片和zip文件
	   	    { title : "Image files", extensions : "jpg,jpeg,gif,png" }, 
	   	    { title : "Zip files", extensions : "zip" }
	   	  ],
	   	  max_file_size : '10mb', //最大只能上传2M的文件
	   	  prevent_duplicates : true //不允许选取重复文件
	    },
	    multi_selection: true
	});

	uploader.init(); //初始化

	//绑定文件添加进队列事件
	uploader.bind('FilesAdded',function(uploader,files){
		  $.each(uploader.files, function (i, file) {
		        if (uploader.files.length <= 1) {
		            return;
		        }
		        uploader.removeFile(file);
		    });
		  //预览图片函数
		previewImage(files[0], function (imgsrc) {
	        $('#preview').html($( '<img width="380" height="200" src="' + imgsrc + '" name="' + files[0].name + '" />'));
	    });
	    var file_name = files[0].name;
	    $("#path").val(file_name);
	});
	
	//当上传队列中一个文件上传成功后，多个文件上传用UploadComplete
	uploader.bind('FileUploaded',function(uploader,file,responseObject){
	      var data=jQuery.parseJSON(responseObject.response);
	      var imagePath=data.bean.imagePath;
	      $("#path").val(imagePath);
	  	  var formdata=$("#addTwwBannerForm").serialize();
		  var url=contextPath+"/weiweb/twwbanner/insertTwwBanner";
		  Util.ajax.postJson(url, formdata, function(data, flag){
			if(flag && data.returnCode=="0"){
				alert("微网站信息更新成功!",$.scojs_message.TYPE_OK);
				initTwwBannerListInfo();
				$("#myModal").modal('hide');
			}
		});
	});
	//绑定文件上传进度事件
	uploader.bind('UploadProgress',function(uploader,file){
		$('#file-'+file.id+' .progress').css('width',file.percent + '%');//控制进度条
	});
	
	
	//实例化一个plupload上传对象
	var editTwwBannerUploader = new plupload.Uploader({ //实例化一个plupload上传对象
		browse_button : 'edit-path',
		url : contextPath+'/weiweb/twwbanner/doUpload',
	    flash_swf_url : '${req.contextPath}/assets/plupload/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
	    silverlight_xap_url : '${req.contextPath}/assets/plupload/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
	    filters: {
	   	  mime_types : [ //只允许上传图片和zip文件
	   	    { title : "Image files", extensions : "jpg,jpeg,gif,png" }, 
	   	    { title : "Zip files", extensions : "zip" }
	   	  ],
	   	  max_file_size : '10mb', //最大只能上传2M的文件
	   	  prevent_duplicates : true //不允许选取重复文件
	    },
	    multi_selection: true
	});

	editTwwBannerUploader.init(); //初始化

	//绑定文件添加进队列事件
	editTwwBannerUploader.bind('FilesAdded',function(uploader,files){
		  $.each(uploader.files, function (i, file) {
		        if (uploader.files.length <= 1) {
		            return;
		        }
		        uploader.removeFile(file);
		    });
		  //预览图片函数
		previewImage(files[0], function (imgsrc) {
	        $('#edit-preview').html($( '<img width="380" height="200" src="' + imgsrc + '" name="' + files[0].name + '" />'));
	    });
	    var file_name = files[0].name;
	    $("#edit-path").val(file_name);
	});

	//当上传队列中一个文件上传成功后，多个文件上传用UploadComplete
	editTwwBannerUploader.bind('FileUploaded',function(uploader,file,responseObject){
	      var data=jQuery.parseJSON(responseObject.response);
	      var imagePath=data.bean.imagePath;
	      $("#edit-path").val(imagePath);
	  	  var formdata=$("#editTwwBannerForm").serialize();
		  var url=contextPath+"/weiweb/twwbanner/updateTwwBanner";
		  Util.ajax.postJson(url, formdata, function(data, flag){
			if(flag && data.returnCode=="0"){
				alert("微网站信息更新成功!",$.scojs_message.TYPE_OK);
				initTwwBannerListInfo();
				$("#myModal1").modal('hide');
			}
		});
	});

	//绑定文件上传进度事件
	editTwwBannerUploader.bind('UploadProgress',function(uploader,file){
		$('#file-'+file.id+' .progress').css('width',file.percent + '%');//控制进度条
	});




	//图片上传预览
	function previewImage(file, callback) {//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
	    if (!file || !/image\//.test(file.type)) return; //确保文件是图片
	    if (file.type == 'image/gif') {//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
	        var fr = new mOxie.FileReader();
	        fr.onload = function () {
	            callback(fr.result);
	            fr.destroy();
	            fr = null;
	        }
	        fr.readAsDataURL(file.getSource());
	    } else {
	        var preloader = new mOxie.Image();
	        preloader.onload = function () {
	            var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
	            callback && callback(imgsrc); //callback传入的参数为预览图片的url
	            preloader.destroy();
	            preloader = null;
	        };
	        preloader.load(file.getSource());
	    }
	}
	
	
	
	

});



