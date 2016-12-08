//列表分页每页显示多少条记录
$(document).ready(function(){
	var global_limit = 20 ;
	
	//初始化微信菜单列表信息
	initWXMenusListInfo();
	initMenusTree();
	getNewsTemplates();		
	//新增微信菜单信息时，validate验证，验证通过后调用保存方法 
	$("#addWXMenusForm").validate({
        submitHandler:function(form){
        	addWXMenus();
        }    
    });
	
	//新增微信菜单信息
	$("#saveWXMenusBtn").click(function(){
		var form = $("#addWXMenusForm");
		form.submit();
	});
	
	//选中微信菜单信息
	$("#wXMenusListTable").delegate("tr","click",function(){
		var levels = $(this).find("td:eq(7)").html();
//		getMenuParent(levels);
		var name = $(this).find("td:eq(2)").html();
		var menuKey = $(this).find("td:eq(3)").html();
		var menuId = $(this).find("td:eq(4)").html();
		var url = $(this).find("td:eq(5)").html();
		var type = $(this).find("td:eq(6)").html();
		var sort = $(this).find("td:eq(0)").html();
		var createUser = $(this).find("td:eq(8)").html();
		var parentId = $(this).find("td:eq(9)").html();
		
		var templateId = $(this).find("td:eq(11)").html();
		var templateType = $(this).find("td:eq(12)").html();

		$("#edit-name").val(name);
		$("#edit-menuKey").val(menuKey);
		$("#edit-menuId").val(menuId);
		$("#edit-url").val(url);
		$("#edit-type").val(type);
		$("#edit-sort").val(sort);
		$("#edit-levels").val(levels);
		$("#edit-createUser").val(createUser);
		$("#edit-parentId").html(parentId);
		
		$("#edit-templateId").val(templateId);
		$("#edit-templateType").val(templateType);
		$(this).css("background","#DFEBF2").siblings().css("background","#FFFFFF");
		hideHang();
		$("#edit-type").change(function(){
			hideHang();
		})
		
		function hideHang(){
			switch ($("#edit-type").val()){
				case "click":
					$(".news-type1").removeClass("dis-no");
					$("#edit-templateId").removeClass("dis-no");
					$("#edit-menuKey").parent().removeClass("dis-no");
					$("#edit-url").parent().addClass("dis-no");
					$(".menu-parameter1 span").text("菜单参数");
					break;
				case "view":
					$(".news-type1").addClass("dis-no");
					$("#edit-menuKey").parent().addClass("dis-no");
					$("#edit-url").parent().removeClass("dis-no");
					$("#edit-templateId").addClass("dis-no");
					$(".menu-parameter1 span").text("URL");
					break;
				default:
					break;
			}
		}
		
		if($("#edit-levels").val() != 2){
			$(".parent-menu1").addClass("dis-no");
		}else{
			$(".parent-menu1").removeClass("dis-no");
		}
		
		$("#edit-levels").change(function(){
			if($(this).val() == 1){
				$(".parent-menu1").addClass("dis-no");
			}else{
				$(".parent-menu1").removeClass("dis-no");
			}
		})
		
		return false;
	});
	
	
	//修改微信菜单信息时，jqvalidate验证，验证通过后调用保存方法 
	$("#editWXMenusForm").validate({
        submitHandler:function(form){
        	editWXMenus();
        }    
    });
	
	//保存编辑的微信菜单信息
	$("#edit-saveWXMenusBtn").click(function(){
		var form = $("#editWXMenusForm");
		form.submit();
	});
	//编辑微信菜单信息
	$("#editWXMenusBtn").click(function(){
		var menuId = $("#edit-menuId").val();
		if(menuId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
	});
	
	//删除微信菜单信息
	$("#delWXMenusBtn").click(function(){
		//logicDelWXMenus();//逻辑删除
		delWXMenus()
	});
	
	//同步微信菜单信息到公众平台
	$("#synWXMenuBtn").click(function(){
		synWXMenu();
	});
	
	hideHang1();
	
	$("#type").change(function(){
		hideHang1();
	})
	
	function hideHang1(){
		switch ($("#type").val()){
			case "click":
				$(".news-type").removeClass("dis-no");
				$("#templateId").removeClass("dis-no");
				$("#menuKey").parent().removeClass("dis-no");
				$("#url").parent().addClass("dis-no");
				$(".menu-parameter span").text("菜单参数");
				break;
			case "view":
				$(".news-type").addClass("dis-no");
				$("#menuKey").parent().addClass("dis-no");
				$("#url").parent().removeClass("dis-no");
				$("#templateId").addClass("dis-no");
				$(".menu-parameter span").text("URL");
				break;
			default:
				break;
		}
	}
	
	if($("#levels").val() != 2){
		$(".parent-menu").addClass("dis-no");
	}else{
		$(".parent-menu").removeClass("dis-no");
	}
	$("#levels").change(function(){
		hideLine($(this));
	})
	
	//关联隐藏
	function hideLine(user){
		if(user.val() == 1){
			$(".parent-menu").addClass("dis-no");
//			getMenuParent(user.val());
		}else{
			$(".parent-menu").removeClass("dis-no");
//			getMenuParent(user.val());
		}
	}
	
	
//初始化微信菜单树状信息
	function initMenusTree(pageNumber, limit){
		var url = contextPath + "/wx/menus/getAllWXMenus";
		var params = "";
		//异步请求菜单树数据
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#parentMenu-template").html();
			var templet = Handlebars.compile(source);
			var source1 = $("#menuParent-template").html();
			var templet1 = Handlebars.compile(source1);
			if(flag && data.returnCode=="0"){
				var menuArr = [];
				for (var i = 0;i<data.beans.length;i++) {
					if(data.beans[i].levels == "1"){
						menuArr.push(data.beans[i]);
						data.beans[i].nodes = [];
						for (var j = 0;j<data.beans.length;j++) {
							if(data.beans[i].menuId == data.beans[j].parentId && data.beans[j].levels != "1"){
								data.beans[i].nodes.push(data.beans[j]);
							}
						}
					}
				}
				var htmlStr = templet(menuArr);
				$("#parentMenu").html(htmlStr);
				var htmlStr1 = templet1(menuArr);
				$("#edit-parentId").html(htmlStr1);
				$("#parentId").html(htmlStr1);
				switch (menuArr.length){
					case 1:
						$(".p-menu").css("width","100%");
						break;
					case 2:
						$(".p-menu").css("width","50%");
						$(".p-menu")[1].style.borderLeft = "1px solid #e7e7eb";
						break;
					case 3:
						$(".p-menu").css("width","33.3%");
						$(".p-menu")[1].style.borderLeft = "1px solid #e7e7eb";
						$(".p-menu")[1].style.borderRight = "1px solid #e7e7eb";
						break;
					default:
						break;
				}
				for (var i = 0;i<$(".children-menu-box").length;i++) {
					$($($(".children-menu-box")[i]).children().children()[0].children).addClass("border-none");
				}
				
				$(".p-menu").click(function(){
//					var cName = $(this).children(".children-menu-box")[0].className;
//					if(cName.indexOf("dis-no")>0){
//						$(".p-menu").children(".children-menu-box").addClass("dis-no");
//						$(this).children(".children-menu-box").removeClass("dis-no");
//					}else{
//						$(".p-menu").children(".children-menu-box").addClass("dis-no");
//					}
					$(this).children(".children-menu-box").toggleClass("dis-no");
					$(this).siblings().children(".children-menu-box").addClass("dis-no");
				})
				if (menuArr.length>2) {
					$("#levels").children()[0].setAttribute("disabled","disabled");
					$("#edit-levels").children()[0].setAttribute("disabled","disabled");
				}
				for (var i = 0;i<menuArr.length;i++) {
					if(menuArr[i].nodes.length>4){
						$("#parentId").children()[i].setAttribute("disabled","disabled");
						$("#edit-parentId").children()[i].setAttribute("disabled","disabled");
					}
				}
			}
		});
	}
//初始化微信菜单列表信息
	function initWXMenusListInfo(currentPage, limit){
		if(typeof currentPage == "undefined"){
			currentPage = 1;
		}
		if(typeof limit == "undefined"){
			limit = global_limit;
		}
		var url = contextPath + "/wx/menus/getAllWXMenus";
		var params = "";
		//异步请求微信菜单列表数据
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#wXMenus-list-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				var menuArr = [];
				for (var i = 0;i<data.beans.length;i++) {
//					switch (data.beans[i].type){
//						case "1":
//							data.beans[i].type = "click";
//							break;
//						case "2":
//							data.beans[i].type = "view";
//							break;
//						default:
//							break;
//					}
					data.beans[i].parameter = data.beans[i].menuKey || data.beans[i].url;
					if(data.beans[i].levels == "1"){
						menuArr.push(data.beans[i]);
						for (var j = 1;j<data.beans.length;j++) {
							if(data.beans[i].menuId == data.beans[j].parentId && data.beans[j].levels != "1"){
								menuArr.push(data.beans[j]);
							}
						}
					}
				}
				menuArr = menuArr.splice(limit*(currentPage-1),limit);
				//渲染列表数据
				var htmlStr = templet(menuArr);
				$("#wXMenusListTable").html(htmlStr);
				//初始化分页数据(当前页码，总数，回调查询函数)
				initPaginator(currentPage, data.beans.length, initWXMenusListInfo);
			}
			
			for (var i = 1;i<$("#wXMenusListTable tr").length;i++) {
				if($($("#wXMenusListTable tr")[i]).children(".levels").html() == "2"){
					$($("#wXMenusListTable tr")[i]).children()[2].style.textAlign = "right";
				}
			}
		});
	}
	
	
//新增微信菜单信息
	function addWXMenus(){
		var url = contextPath + "/wx/menus/insertWXMenus";
		var params = $("#addWXMenusForm").serialize();
		//异步请求新增微信菜单信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					//$("#alert-info-content").html("微信菜单新增成功!");
					//$("#alert-info").modal("show");
					alert("微信菜单新增成功!");
					$("#myModal").modal('hide');
					//重新请求列表数据
					initWXMenusListInfo();
					initMenusTree();
					//清空新增微信菜单的弹窗信息
					$("#addWXMenusForm input").val("");
					$("#descn").val("");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微信菜单编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
//修改微信菜单信息
	function editWXMenus(){
		
		var menuId = $("#edit-menuId").val();
		
		if(menuId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		
		
		var url = contextPath + "/wx/menus/updateWXMenus";
		var params = $("#editWXMenusForm").serialize();
		//异步请求修改微信菜单信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("微信菜单信息修改成功!");
					//编辑微信菜单信息清空
					$("#editWXMenusForm input").val("");
					$("#edit-descn").val("");
					//重新请求列表数据
					initWXMenusListInfo();
					initMenusTree();
					$("#myModal1").modal('hide');
				}
			}else{
				if(data.returnCode=="-1"){
					alert("微信菜单编码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
//删除微信菜单
	function delWXMenus(){
		var menuId = $("#edit-menuId").val();
		if(menuId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/wx/menus/delWXMenus";
			var params = $("#editWXMenusForm").serialize();
			//异步请求逻辑删除微信菜单信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("微信菜单删除成功!");
						//编辑微信菜单信息清空
						$("#editWXMenusForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initWXMenusListInfo();
						initMenusTree();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
//逻辑删除微信菜单
	function logicDelWXMenus(){
		var menuId = $("#edit-menuId").val();
		if(menuId==""){
			alert("请选择一条信息!",$.scojs_message.TYPE_ERROR);
			return false;
		}
		confirm("确定删除吗？",function(){
			var url = contextPath + "/wx/menus/logicDelWXMenus";
			var params = $("#editWXMenusForm").serialize();
			//异步请求逻辑删除微信菜单信息
			Util.ajax.postJson(url, params, function(data, flag){
				if(flag){
					if(data.returnCode=="0"){
						alert("微信菜单删除成功!");
						//编辑微信菜单信息清空
						$("#editWXMenusForm input").val("");
						$("#edit-descn").val("");
						//重新请求列表数据
						initWXMenusListInfo();
					}
				}else{
					alert(data.returnMessage);
				}
			});
		});
	}
	
//逻辑同步微信菜单
	function synWXMenu(){
		var url = contextPath + "/wx/menus/synchrWXMenu";
		//异步请求逻辑同步微信菜单信息
		Util.ajax.postJson(url,{}, function(data, flag){
			alert(data.returnMessage);
		});
	}
//获取父菜单列表
//	function getMenuParent(level){
//		var url = contextPath + "/wx/menus/getAllWXMenus";
//		//异步请求文本模版列表数据1
//		var params = {levels:level-1};
//		Util.ajax.postJsonSync(url, params, function(data, flag){
//			var source = $("#menuParent-template").html();
//			var templet = Handlebars.compile(source);
//			if(flag && data.returnCode=="0"){
//				//渲染列表数据
//				var htmlStr = templet(data.beans);
//				$("#edit-parentId").html(htmlStr);
//				$("#parentId").html(htmlStr);
//			}
//		});
//	}
//获取图文消息模版列表
	function getNewsTemplates(){
		var url = contextPath + "/wx/newstemplates/getAll";
		//异步请求文本模版列表数据
		var params = "";
		Util.ajax.postJsonSync(url, params, function(data, flag){
			var source = $("#news-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#templateId").html(htmlStr);
				$("#edit-templateId").html(htmlStr);
			}
		});
	}
				});
