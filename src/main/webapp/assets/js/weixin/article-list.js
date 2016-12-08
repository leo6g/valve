$(document).ready(function(){
	
//列表分页每页显示多少条记录
var global_limit = 10 ;
	//初始化微信文章内容列表信息
	initWXArticleListInfo();
	
	
	//新增微信文章内容信息时，validate验证，验证通过后调用保存方法 
	$("#addWXArticleForm").validate({
        submitHandler:function(form){
        	addWXArticle();
        }    
    });
	
	//新增微信文章内容信息
	$("#saveWXArticleBtn").click(function(){
		var form = $("#addWXArticleForm");
		form.submit();
	});
	
	//修改微信文章内容信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editWXArticleForm").validate({
        submitHandler:function(form){
        	editWXArticle();
        }    
    });
	
	//保存编辑的微信文章内容信息
	$("#edit-saveWXArticleBtn").click(function(){
		var form = $("#editWXArticleForm");
		form.submit();
	});
	//编辑微信文章内容信息
	$("#editWXArticleBtn").click(function(){
		var newsTempId = $("#edit-newsTempId").val();
		if(newsTempId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
	});
	
	//查询按钮
	$("#querySubmit").click(function(){
		initWXArticleListInfo();
	});
	
	
	//新增微信文章内容信息
	function addWXArticle(){
		var name = $("#name").val();
		var type = $("#type").val();
		if(name==""){
			alert("请输入文章名称!");
			return false;
		}
		if(type==""){
			alert("请输入文章类型!");
			return false;
		}
		
		var url = contextPath + "/wx/article/insertWXArticle";
		var params = $("#addWXArticleForm").serialize();
		//异步请求新增微信文章内容信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微信文章内容新增成功!");
					$("#myModal").modal('hide');
					//重新请求列表数据
					initWXArticleListInfo();
					//清空新增微信文章内容的弹窗信息
					$("#addWXArticleForm input").val("");
					$("#descn").val("");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微信文章内容编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
	//修改微信文章内容信息
	function editWXArticle(){
		var newsTempId = $("#edit-newsTempId").val();
		var name = $("#edit-name").val();
		var type = $("#edit-type").val();
	
		if(newsTempId==""){
			alert("请选择一条信息!");
			return false;
		}
		if(name==""){
			alert("请输入文章名称!");
			return false;
		}
		if(type==""){
			alert("请输入文章类型!");
			return false;
		}
	
		var url = contextPath + "/wx/article/updateWXArticle";
		var params = $("#editWXArticleForm").serialize();
		//异步请求修改微信文章内容信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微信文章内容信息修改成功!");
					//编辑微信文章内容信息清空
					$("#editWXArticleForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initWXArticleListInfo();
					$("#myModal1").modal('hide');
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微信文章内容编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	

	//局部绑定回车事件
	 $("#queryName").bind('keyup',function(event){
		    event=document.all?window.event:event;
		    if((event.keyCode || event.which)==13){
		    	document.getElementById("querySubmit").click();
		    }
		   }); 
	 $("#queryType").bind('keyup',function(event){
		    event=document.all?window.event:event;
		    if((event.keyCode || event.which)==13){
		    	document.getElementById("querySubmit").click();
		    }
		   }); 
	 //类型名称转化
	 Handlebars.registerHelper("transformat",function(value){
        if(value=="menu"){
       	  return "菜单";
	     }else if(value=="news"){
	          return "新闻";
        }else if(value=="push"){
	          return "推送";
        }else if(value=="subscribe"){
        	return "关注";
        }else{
       	 return "";
        }
	 });
	
////////////////////////////////////
});

//选中微信文章模板信息
function seltable(){
	var index=$("#wXArticleListTable tr").find("input:checked").parents("tr").index();
	var name = $("#wXArticleListTable tr:eq(" +index+") td:eq(2)").text();
	var type = $("#wXArticleListTable tr:eq(" +index+") td:eq(3)").text();
	var weeklyNumber = $("#wXArticleListTable tr:eq(" +index+") td:eq(4)").text();
	var publishDate = $("#wXArticleListTable tr:eq(" +index+") td:eq(5)").text();
	var newsTempId = $("#wXArticleListTable tr:eq(" +index+") td:eq(6)").text();
	 if(type=="菜单"){
		 type= "menu";
	     }else if(type=="新闻"){
	    	 type= "news";
       }else if(type=="推送"){
    	   type= "push";
       }else if(type=="关注"){
    	   type= "subscribe";
       }else{
    	   type= "";
       }
	
	$("#edit-name").val(name);
	$("#edit-type").val(type);
	$("#edit-weeklyNumber").val(weeklyNumber);
	$("#edit-publishDate").val(publishDate);
	$("#edit-newsTempId").val(newsTempId);
	return false;
};
//逻辑删除微信文章内容
function logicDelWXArticle(newsTempId){
	if(newsTempId==""){
		alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
		return false;
	}
	confirm("确定删除吗？",function(){
		var url = contextPath + "/wx/article/logicDeleteWXArticle";
		$("#edit-newsTempId").val(newsTempId);
		var params = $("#editWXArticleForm").serialize();
		//异步请求逻辑删除微信文章内容信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微信文章内容删除成功!");
					//编辑微信文章内容信息清空
					$("#editWXArticleForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initWXArticleListInfo();
				}
			}else{
				alert(data.returnMessage);
			}
		});
	});
}

//初始化微信文章内容列表信息
function initWXArticleListInfo(currentPage, limit){
	if(typeof currentPage == "undefined"){
		currentPage = 1;
	}
	if(typeof limit == "undefined"){
		limit = global_limit;
	}
	var url = contextPath + "/wx/article/getList";
	var params = $("#queryForm").serialize();
	params = params + "&pageNumber="+currentPage+"&limit="+limit;
	//异步请求微信文章内容列表数据
	Util.ajax.postJson(url, params, function(data, flag){
		var source = $("#wXArticle-list-template").html();
		var templet = Handlebars.compile(source);
		if(flag && data.returnCode=="0"){
			//渲染列表数据
			var htmlStr = templet(data.beans);
			$("#wXArticleListTable").html(htmlStr);
			//初始化分页数据(当前页码，总数，回调查询函数)
			initPaginator(currentPage, data.bean.count, initWXArticleListInfo);
		}
	});
}


function fnPreview(tempId){
	$.ajax({
		type: "POST",
		url : contextPath+ '/wx/newsitems/getAll?newsTempId='+tempId,
		dataType: "json",
		async : false,
		success : function(json) {
			var html = "<div style='position: relative;width: 580px;height: 200px;border-bottom:solid 2px black' onclick=fnViewArticle('"+json.beans[0].itemId+"')>" +
						"<img src='"+json.beans[0].imagePath+"' width='100%' height='100%'>"+
						"<div style='position: absolute;bottom: 0;height: 50px;line-height: 50px;background-color: black;opacity: 0.6;width: 100%;color: white'>"+json.beans[0].title+"</div>" +
						"</div>";
			for(var i=1;i<json.beans.length;i++){
				html+="<div style='width: 580px;height: 100px;position: relative;background-color: white;border-bottom:solid 1px gray' onclick=fnViewArticle('"+json.beans[i].itemId+"')>"+
							"<p style='margin: 0;padding: 0;height: 100px;line-height: 100px'>"+
							json.beans[i].title +
							"</p><img src='"+json.beans[i].imagePath+"' style='position: absolute;right: 0;top: 0;' height='100%' width='178px'>"+
							"</div>";

			}
			$('#preViewDiv').html(html);
		}
	});
}


function fnViewArticle(itemId){
	window.open(contextPath+'/wx/article/outputArticle?articleId='+itemId); 
}

/*//动态改变下拉框显示颜色
changeColor(){
	 alert("zzzzzzzzzzzzzzzzzzzzzz");
	var param = $("#queryType").val();
	alert(param);
	if("请选择" == param.trim()){
		this.style.color="#999";
	}else{
		this.style.color="black";
	}
 }*/