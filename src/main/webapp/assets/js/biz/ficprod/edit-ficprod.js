$(document).ready(function(){
	
	
	//修改理财产品管理信息时，validate验证，验证通过后调用保存方法 
	$("#editForm").validate({
        submitHandler:function(form){
        	editObj();
        }    
    });
	
	//修改理财产品管理信息
	$("#saveBtn").click(function(){
		var form = $("#editForm");
		form.submit();
	});
	
	
	//修改理财产品管理信息
	function editObj(){
		var url = contextPath + "/biz/ficprod/updateFinanceProd";
		var params = $("#editForm").serialize();
		//异步请求新增信息
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert("修改成功!");
					C.load(contextPath + "/biz/ficprod/list");
				}
			}else{
				if(data.returnCode=="-1"){
					alert("产品代码已经存在，请修改!" ,$.scojs_message.TYPE_ERROR);
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
				
				//产品类型-下拉框默认值
				if(dicCode=='ficProdType'){
					$("#"+dicCode).val($("#hidden-type").val());
				}
				//销售渠道-下拉框默认值
				if(dicCode=='ficSaleChannel'){
					$("#"+dicCode).val($("#hidden-saleChannel").val());
				}
				//理财期限-下拉框默认值
				if(dicCode=='ficPeriodType'){
					$("#"+dicCode).val($("#hidden-periodType").val());
				}
			}
		});
	}
	
});



