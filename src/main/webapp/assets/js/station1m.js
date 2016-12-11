$(document).ready(function(){
	
//列表分页每页显示多少条记录
var global_limit = 10 ;
	//初始化密封性检测工位列表信息
	initStation1mListInfo();
	
	
	//新增密封性检测工位信息时，validate验证，验证通过后调用保存方法 
	$("#addStation1mForm").validate({
        submitHandler:function(form){
        	addStation1m();
        }    
    });
	
	//新增密封性检测工位信息
	$("#saveStation1mBtn").click(function(){
		var form = $("#addStation1mForm");
		form.submit();
	});
	
	//选中密封性检测工位信息
	$("#station1mListTable").delegate("tr","click",function(){
		var wxll = $(this).find("td:eq(1)").html();
		var wlzlbzhPressure = $(this).find("td:eq(2)").html();
		var wlxlPressure = $(this).find("td:eq(3)").html();
		var nlxlPressure = $(this).find("td:eq(4)").html();
		var nxll = $(this).find("td:eq(5)").html();
		var machinenum = $(this).find("td:eq(6)").html();
		var nlxlbzhPressure = $(this).find("td:eq(7)").html();
		var factorynumber = $(this).find("td:eq(8)").html();
		var machinetype = $(this).find("td:eq(9)").html();
		var linenum = $(this).find("td:eq(10)").html();
		var wpnum = $(this).find("td:eq(11)").html();
		var id = $(this).find("td:eq(12)").html();
		var creattime = $(this).find("td:eq(13)").html();
		var batchnum = $(this).find("td:eq(14)").html();
		var stationnum = $(this).find("td:eq(15)").html();
		var port = $(this).find("td:eq(16)").html();
		var station = $(this).find("td:eq(17)").html();
		var result = $(this).find("td:eq(18)").html();
		var barcode = $(this).find("td:eq(19)").html();
		
		$("#edit-wxll").val(wxll);
		$("#edit-wlzlbzhPressure").val(wlzlbzhPressure);
		$("#edit-wlxlPressure").val(wlxlPressure);
		$("#edit-nlxlPressure").val(nlxlPressure);
		$("#edit-nxll").val(nxll);
		$("#edit-machinenum").val(machinenum);
		$("#edit-nlxlbzhPressure").val(nlxlbzhPressure);
		$("#edit-factorynumber").val(factorynumber);
		$("#edit-machinetype").val(machinetype);
		$("#edit-linenum").val(linenum);
		$("#edit-wpnum").val(wpnum);
		$("#edit-id").val(id);
		$("#edit-creattime").val(creattime);
		$("#edit-batchnum").val(batchnum);
		$("#edit-stationnum").val(stationnum);
		$("#edit-port").val(port);
		$("#edit-station").val(station);
		$("#edit-result").val(result);
		$("#edit-barcode").val(barcode);
		
		$(this).css("background","#DFEBF2").siblings().css("background","#FFFFFF");
		return false;
	});
	
	
	//修改密封性检测工位信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editStation1mForm").validate({
        submitHandler:function(form){
        	editStation1m();
        }    
    });
	
	//保存编辑的密封性检测工位信息
	$("#edit-saveStation1mBtn").click(function(){
		var form = $("#editStation1mForm");
		form.submit();
	});
	//编辑密封性检测工位信息
	$("#editStation1mBtn").click(function(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
	});
	
	//删除密封性检测工位信息
	$("#delStation1mBtn").click(function(){
		//logicDelStation1m();//逻辑删除
		delStation1m()
	});
	
	//初始化密封性检测工位列表信息
	function initStation1mListInfo(currentPage, limit){
		if(typeof currentPage == "undefined"){
			currentPage = 1;
		}
		if(typeof limit == "undefined"){
			limit = global_limit;
		}
		var url = contextPath + "/station1m/getList";
		var params = "pageNumber="+currentPage+"&limit="+limit;
		//异步请求密封性检测工位列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#station1m-list-template").html();
			var templet = Handlebars.compile(source);
			if(data.returnCode=="1"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#station1mListTable").html(htmlStr);
				//初始化分页数据(当前页码，总数，回调查询函数)
				initPaginator(currentPage, data.bean.count, initStation1mListInfo);
			}
		});
	}
	
	
	//新增密封性检测工位信息
	function addStation1m(){
		var url = contextPath + "/insertStation1m";
		var params = $("#addStation1mForm").serialize();
		//异步请求新增密封性检测工位信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					//$("#alert-info-content").html("密封性检测工位新增成功!");
					//$("#alert-info").modal("show");
					alert("密封性检测工位新增成功!");
					$("#myModal").modal('hide');
					//重新请求列表数据
					initStation1mListInfo();
					//清空新增密封性检测工位的弹窗信息
					$("#addStation1mForm input").val("");
					$("#descn").val("");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("密封性检测工位编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
	//修改密封性检测工位信息
	function editStation1m(){
		
		
		var url = contextPath + "/updateStation1m";
		var params = $("#editStation1mForm").serialize();
		//异步请求修改密封性检测工位信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("密封性检测工位信息修改成功!");
					//编辑密封性检测工位信息清空
					$("#editStation1mForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initStation1mListInfo();
					$("#myModal1").modal('hide');
				}
			}else{
				if(data.returnCode=="-1"){
					alert("密封性检测工位编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	//删除密封性检测工位
	function delStation1m(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/deleteStation1m";
			var params = $("#editStation1mForm").serialize();
			//异步请求逻辑删除密封性检测工位信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("密封性检测工位删除成功!");
						//编辑密封性检测工位信息清空
						$("#editStation1mForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initStation1mListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
	//逻辑删除密封性检测工位
	function logicDelStation1m(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/logicDeleteStation1m";
			var params = $("#editStation1mForm").serialize();
			//异步请求逻辑删除密封性检测工位信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("密封性检测工位删除成功!");
						//编辑密封性检测工位信息清空
						$("#editStation1mForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initStation1mListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}

});



