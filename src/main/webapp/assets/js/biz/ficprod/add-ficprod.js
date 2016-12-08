$(document).ready(function(){
	
	
	//新增理财产品管理信息时，validate验证，验证通过后调用保存方法 
	$("#addForm").validate({
        submitHandler:function(form){
        	addObj();
        }    
    });
	
	//新增并提交审核理财产品管理信息
	$("#saveAndCheckBtn").click(function(){
		$("#authState").val('1-WAITING');
		var form = $("#addForm");
		form.submit();
	});
	
	//新增审核理财产品管理信息并存为草稿
	$("#saveAndDreafBtn").click(function(){
		$("#authState").val('DRAFT');
		var form = $("#addForm");
		form.submit();
	});
	
	//新增理财产品管理信息
	function addObj(){
		var url = contextPath + "/biz/ficprod/insertFinanceProd";
		var params = $("#addForm").serialize();
		//异步请求新增信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					if($("#authState").val() == '1-WAITING'){
						var fincId = data.bean.fincId;
						saveBIZAuthInfo(fincId);
					}else{
						alert("更新成功!");
						C.load(contextPath + "/biz/ficprod/list");
					}
				}
			}else{
				if(data.returnCode=="-1"){
					alert("产品代码已经存在，请修改!");
				}else{
					alert(data.returnMessage);
				}
			}
		});
	}
	
	
	//点击取消按钮
	$("#cancelBtn").click(function(){
		C.load(contextPath + "/biz/ficprod/list");
	});
	
	
	//初始化产品类型模版
	initDicByCode('ficProdType');
	
	//初始化销售渠道模版
	initDicByCode('ficSaleChannel');

	//初始化理财期限模版
	initDicByCode('ficPeriodType');
	
	
	/**
	 * 根据数据字典组编码，渲染数据页面数据，编码和页面ID规则要一致
	 */
	function initDicByCode(dicCode){
		var url = contextPath + "/system/dic/queryDicsByGCode";
		var params = "dicGroupCode="+dicCode;
		//请求数据字典信息
		Util.ajax.postJson(url, params, function(data, flag){
			var source = $("#"+dicCode+"-template").html();
			var templet = Handlebars.compile(source);
			if(flag && data.returnCode=="0"){
				//渲染列表数据
				var htmlStr = templet(data.beans);
				$("#"+dicCode).html(htmlStr);
			}
		});
	}
	
	//信息保存至审核表
	function saveBIZAuthInfo(fincId){
		var url=contextPath+"/biz/authinfo/insertBIZAuthInfo";
		var formdata = "type=FINANCE&prodId="+fincId+"&operFlag=WAITING";
		  Util.ajax.postJson(url, formdata, function(data, flag){
			if(flag && data.returnCode=="0"){
				alert("更新成功!");
				C.load(contextPath + "/biz/ficprod/list");
			}
		});
	};
	
});



