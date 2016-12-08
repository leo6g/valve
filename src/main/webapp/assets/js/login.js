$(function(){
	$("#loginUser").bind("click",function(){
		var url = contextPath + "/checkUser";
		var params = $("#loginForm").serialize();
		Util.ajax.postJson(url, params, function(data, flag){
			if(flag){
				if(data.returnCode=="0"){
					alert(data.returnMessage);
				}
			}else{
			}
		});
	})
})