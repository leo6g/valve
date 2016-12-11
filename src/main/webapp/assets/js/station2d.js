$(document).ready(function(){
	
//列表分页每页显示多少条记录
var global_limit = 10 ;
	//初始化电性能检测工位列表信息
	initStation2dListInfo();
	
	
	//新增电性能检测工位信息时，validate验证，验证通过后调用保存方法 
	$("#addStation2dForm").validate({
        submitHandler:function(form){
        	addStation2d();
        }    
    });
	
	//新增电性能检测工位信息
	$("#saveStation2dBtn").click(function(){
		var form = $("#addStation2dForm");
		form.submit();
	});
	
	//选中电性能检测工位信息
	$("#station2dListTable").delegate("tr","click",function(){
		var testtimes = $(this).find("td:eq(1)").html();
		var endtime = $(this).find("td:eq(2)").html();
		var enda = $(this).find("td:eq(3)").html();
		var starttime = $(this).find("td:eq(4)").html();
		var starta = $(this).find("td:eq(5)").html();
		var machinenum = $(this).find("td:eq(6)").html();
		var testa = $(this).find("td:eq(7)").html();
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
		
		$("#edit-testtimes").val(testtimes);
		$("#edit-endtime").val(endtime);
		$("#edit-enda").val(enda);
		$("#edit-starttime").val(starttime);
		$("#edit-starta").val(starta);
		$("#edit-machinenum").val(machinenum);
		$("#edit-testa").val(testa);
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
	
	
	//修改电性能检测工位信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editStation2dForm").validate({
        submitHandler:function(form){
        	editStation2d();
        }    
    });
	
	//保存编辑的电性能检测工位信息
	$("#edit-saveStation2dBtn").click(function(){
		var form = $("#editStation2dForm");
		form.submit();
	});
	//编辑电性能检测工位信息
	$("#editStation2dBtn").click(function(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
	});
	
	//删除电性能检测工位信息
	$("#delStation2dBtn").click(function(){
		//logicDelStation2d();//逻辑删除
		delStation2d()
	});
	
	//初始化电性能检测工位列表信息
	function initStation2dListInfo(currentPage, limit){
		if(typeof currentPage == "undefined"){
			currentPage = 1;
		}
		if(typeof limit == "undefined"){
			limit = global_limit;
		}
		var url = contextPath + "/getList";
		var params = "pageNumber="+currentPage+"&limit="+limit;
		//异步请求电性能检测工位列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#station2d-list-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#station2dListTable").html(htmlStr);
				//初始化分页数据(当前页码，总数，回调查询函数)
				initPaginator(currentPage, data.bean.count, initStation2dListInfo);
			}
		});
	}
	
	
	//新增电性能检测工位信息
	function addStation2d(){
		var url = contextPath + "/insertStation2d";
		var params = $("#addStation2dForm").serialize();
		//异步请求新增电性能检测工位信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					//$("#alert-info-content").html("电性能检测工位新增成功!");
					//$("#alert-info").modal("show");
					alert("电性能检测工位新增成功!");
					$("#myModal").modal('hide');
					//重新请求列表数据
					initStation2dListInfo();
					//清空新增电性能检测工位的弹窗信息
					$("#addStation2dForm input").val("");
					$("#descn").val("");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("电性能检测工位编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
	//修改电性能检测工位信息
	function editStation2d(){
		
		
		var url = contextPath + "/updateStation2d";
		var params = $("#editStation2dForm").serialize();
		//异步请求修改电性能检测工位信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("电性能检测工位信息修改成功!");
					//编辑电性能检测工位信息清空
					$("#editStation2dForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initStation2dListInfo();
					$("#myModal1").modal('hide');
				}
			}else{
				if(data.returnCode=="-1"){
					alert("电性能检测工位编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	//删除电性能检测工位
	function delStation2d(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/deleteStation2d";
			var params = $("#editStation2dForm").serialize();
			//异步请求逻辑删除电性能检测工位信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("电性能检测工位删除成功!");
						//编辑电性能检测工位信息清空
						$("#editStation2dForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initStation2dListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
	//逻辑删除电性能检测工位
	function logicDelStation2d(){
		var id = $("#edit-id").val();
		if(id==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/logicDeleteStation2d";
			var params = $("#editStation2dForm").serialize();
			//异步请求逻辑删除电性能检测工位信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("电性能检测工位删除成功!");
						//编辑电性能检测工位信息清空
						$("#editStation2dForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initStation2dListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}

});



