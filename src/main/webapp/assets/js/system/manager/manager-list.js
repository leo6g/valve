$(document).ready(function(){
	//列表分页每页显示多少条记录
	global_limit = 10 ;
	
	
	//点击添加按钮
	$("#addBtn").click(function(){
		C.load(contextPath + "/system/manager/add");
	});
	
	//点击编辑按钮
	$("#editBtn").click(function(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		C.load(contextPath + "/system/manager/edit?id="+id);
	});
	
	//点击删除按钮
	$("#delBtn").click(function(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		deleteObj(id);
	});
	
	//点击查看按钮
	$("#viewBtn").click(function(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		C.load(contextPath + "/system/manager/view?id="+id);
	});
	
	
	
	
	//URL传入的页码，如果有值，以URL页码为准。
	var currPage = Util.browser.getParameter("currPage");
	var reg = new RegExp("^[0-9]*$");
	if(currPage != null && reg.test(currPage)){
		currentPage = parseInt(currPage);
		$("#currPage").val(currentPage);
	}else{
		currPage = 1;
	}
	//列表数据请求
	getList(currPage, global_limit);
	
	//点击查询按钮
	$("#searchBtn").click(function(){
		getList();
	});
	
	//点击重置按钮
	$("#resetBtn").click(function(){
		$("#searchForm input[type='text']").val("");
		getList();
	});
	

	//列表数据请求
	function getList(currentPage, limit){
		if(typeof currentPage == "undefined"){
			currentPage = 1;
		}
		if(typeof limit == "undefined"){
			limit = global_limit;
		}
		var url = contextPath + "/system/manager/getList";
		var params = "pageNumber="+currentPage + "&limit=" + limit + "&" + $("#searchForm").serialize();
		//异步请求列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#list-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#listTable").html(htmlStr);
				//初始化分页数据(当前页码，总数，回调查询函数)
				initPaginator(currentPage, data.bean.count, getList);
				
				
				//table列点击事件
				$("#listTable tr").click(function(){
					var id = $(this).attr("data-id");
					$("#edit-id").val(id);
				});
				
				//冻结按钮
				$(".freeze").click(function(){
					var id = $(this).attr("data-id");
					freeze(id);
				});
				
				//解冻按钮
				$(".unfreeze").click(function(){
					var id = $(this).attr("data-id");
					unfreeze(id);
				});
				
			}
		});
		//清空隐藏域信息
		$("#edit-id").val("");
	}



	/**
	 * 冻结
	 */
	function freeze(id){
		confirm("确定冻结该用户吗？", function(){
			var url = contextPath + "/system/manager/freezeManager";
			var params = "id="+id;
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("冻结成功!");
						//重新请求列表数据
						getList();
					}
				}else{
					alert(data.returnMessage,$.scojs_message.TYPE_ERROR);
				}
			});
		});
	}

	/**
	 * 解冻
	 */
	function unfreeze(id){
		confirm("确定解冻该用户吗？", function(){
			var url = contextPath + "/system/manager/unfreezeManager";
			var params = "id="+id;
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("解冻成功!");
						//重新请求列表数据
						getList();
					}
				}else{
					alert(data.returnMessage,$.scojs_message.TYPE_ERROR);
				}
			});
		});
	}

	/**
	 * 逻辑删除
	 */
	function deleteObj(id){
		confirm("确定删除该用户吗？",function(){
			var url = contextPath + "/system/manager/deleteManager";
			var params = "id="+id;
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("用户删除成功!");
						//重新请求列表数据
						getList();
					}
				}else{
					alert(data.returnMessage,$.scojs_message.TYPE_ERROR);
				}
			});
			
		});
	}
	
	
});

