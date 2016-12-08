
$(document).ready(function(){
	//列表分页每页显示多少条记录
	var global_limit = 10 ;
	
	//初始化微信模板列表信息
	initWXNewsTemplatesListInfo();
	
	
	//新增微信模板信息时，validate验证，验证通过后调用保存方法 
	$("#addWXNewsTemplatesForm").validate({
        submitHandler:function(form){
        	addWXNewsTemplates();
        }    
    });
	
	//新增微信模板信息
	$("#saveWXNewsTemplatesBtn").click(function(){
		var form = $("#addWXNewsTemplatesForm");
		$("#type").val("menu");
		form.submit();
	});
	
	
	
	//修改微信模板信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editWXNewsTemplatesForm").validate({
        submitHandler:function(form){
        	editWXNewsTemplates();
        }    
    });
	
	//保存编辑的微信模板信息
	$("#edit-saveWXNewsTemplatesBtn").click(function(){
		var form = $("#editWXNewsTemplatesForm");
		$("#type").val("edit-menu");
		form.submit();
	});
	//编辑微信模板信息
	$("#editWXNewsTemplatesBtn").click(function(){
		var newsTempId = $("#edit-newsTempId").val();
		if(newsTempId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
	});
	
	//删除微信模板信息
	$("#delWXNewsTemplatesBtn").click(function(){
		//logicDelWXNewsTemplates();//逻辑删除
		delWXNewsTemplates()
	});
	
	//新增微信图文详情信息时，validate验证，验证通过后调用保存方法 
	$("#addWXNewsItemsForm").validate({
	    submitHandler:function(form){
	    	addWXNewsItems();
	    }    
	});
	
	//查询
	$("#querySubmit").click(function(){
		initWXNewsTemplatesListInfo();
	});
	//局部绑定回车事件
	 $("#queryName").bind('keyup',function(event){
		    event=document.all?window.event:event;
		    if((event.keyCode || event.which)==13){
		    	document.getElementById("querySubmit").click();
		    }
		   }); 
//////////////////////////////////////////
});
/*
 * 全局回车事件
document.onkeydown = function(e){
	alert("回车了----");
	   if(!e){
	    e = window.event;
	   }
	   if((e.keyCode || e.which) == 13){
		   document.getElementById("querySubmit").click();
	   }
	  }
*/

//初始化微信模板列表信息
function initWXNewsTemplatesListInfo(currentPage, limit){
	if(typeof currentPage == "undefined"){
		currentPage = 1;
	}
	if(typeof limit == "undefined"){
		limit = global_limit;
	}
	var url = contextPath + "/wx/newstemplates/getList";
	var params=$("#queryForm").serialize();
	params = params + "&pageNumber="+currentPage+"&limit="+limit;
	console.info(params);
	//异步请求微信模板列表数据
	Util.ajax.postJson(url, params, function(data, flag){
		var source = $("#wXNewsTemplates-list-template").html();
		var templet = Handlebars.compile(source);
		if(flag && data.returnCode=="0"){
			//渲染列表数据
			var htmlStr = templet(data.beans);
			$("#wXNewsTemplatesListTable").html(htmlStr);
			//初始化分页数据(当前页码，总数，回调查询函数)
			initPaginator(currentPage, data.bean.count, initWXNewsTemplatesListInfo);
		}
	});
}



//新增微信模板信息
function addWXNewsTemplates(){
	var url = contextPath + "/wx/newstemplates/insertWXNewsTemplates";
	var params = $("#addWXNewsTemplatesForm").serialize();
	//异步请求新增微信模板信息
	Util.ajax.postJson(url, params, function(data, flag){
		if(flag){
			if(data.returnCode=="0"){
				alert("微信模板新增成功!",$.scojs_message.TYPE_OK);
				$("#myModal").modal('hide');
				//重新请求列表数据
				initWXNewsTemplatesListInfo();
				//清空新增微信模板的弹窗信息
				$("#addWXNewsTemplatesForm input").val("");
				$("#descn").val("");
			}
		}else{
			if(data.returnCode=="-1"){
				alert("微信模板编码已经存在，请修改!",$.scojs_message.TYPE_ERROR);
			}else{
				alert(data.returnMessage);
			}
		}
	});
}


//修改微信模板信息
function editWXNewsTemplates(){
	var newsTempId = $("#edit-newsTempId").val();
	
	if(newsTempId==""){
		alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
		return false;
	}
	
	var url = contextPath + "/wx/newstemplates/updateWXNewsTemplates";
	var params = $("#editWXNewsTemplatesForm").serialize();
	//异步请求修改微信模板信息
	Util.ajax.postJson(url, params, function(data, flag){
		if(flag){
			if(data.returnCode=="0"){
				alert("微信模板信息修改成功!",$.scojs_message.TYPE_OK);
				//编辑微信模板信息清空
				$("#editWXNewsTemplatesForm input").val("");
				$("#edit-descn").val("");
				//重新请求列表数据
				initWXNewsTemplatesListInfo();
				$("#myModal1").modal('hide');
			}
		}else{
			if(data.returnCode=="-1"){
				alert("微信模板编码已经存在，请修改!",$.scojs_message.TYPE_ERROR);
			}else{
				alert(data.returnMessage);
			}
		}
	});
}
//删除微信模板
function delWXNewsTemplates(newsTempId){
	if(newsTempId==""){
		alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
		return false;
	}
	confirm("确定删除吗？",function(){
		var url = contextPath + "/wx/newstemplates/deleteWXNewsTemplates";
		$("#edit-newsTempId").val(newsTempId);
		var params = $("#editWXNewsTemplatesForm").serialize();
		//异步请求逻辑删除微信模板信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微信模板删除成功!",$.scojs_message.TYPE_OK);
					//编辑微信模板信息清空
					$("#editWXNewsTemplatesForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initWXNewsTemplatesListInfo();
				}
			}else{
				alert(data.returnMessage);
			}
		});
	});
	
};

//选中微信模板信息
function seltable(){
	
	var index=$("#wXNewsTemplatesListTable tr").find("input:checked").parents("tr").index()-1;
	
	var type = $("#wXNewsTemplatesListTable tr:eq(" +index+") td:eq(2)").text();
	var name = $("#wXNewsTemplatesListTable tr:eq(" +index+") td:eq(3)").text();
	var newsTempId = $("#wXNewsTemplatesListTable tr:eq(" +index+") td:eq(4)").text();
	var createUser = $("#wXNewsTemplatesListTable tr:eq(" +index+") td:eq(6)").text();
	//alert(newsTempId);
	$("#edit-type").val(type);
	$("#edit-name").val(name);
	$("#edit-newsTempId").val(newsTempId);
	$("#edit-createUser").val(createUser);
	
	return false;
};

//新增微信图文详情信息获取微信模板主键
function addWXNewsItemsId(newsTempId){	
	$("#add-newsTempId").val(newsTempId);
}
//新增微信图文详情信息
function addWXNewsItems(){
	var url = contextPath + "/wx/newsitems/insertWXNewsItems";
	var params = $("#addWXNewsItemsForm").serialize();
	//异步请求新增微信图文详情信息
	Util.ajax.postJson(url, params, function(data, flag){
		if(flag){
			if(data.returnCode=="0"){
				alert("微信图文详情新增成功!",$.scojs_message.TYPE_OK);
				$("#myModal2").modal('hide');
				//重新请求列表数据
				initWXNewsTemplatesListInfo();
				//清空新增微信图文详情的弹窗信息
				$("#addWXNewsItemsForm input").val("");
				$("#descn").val("");
			}
		}else{
			if(data.returnCode=="-1"){
				alert("微信图文详情编码已经存在，请修改!",$.scojs_message.TYPE_ERROR);
			}else{
				alert(data.returnMessage);
			}
		}
	});
};


