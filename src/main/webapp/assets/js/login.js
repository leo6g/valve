$(function(){
	$("#loginUser").bind("click",function(){
		var url = contextPath + "/checkUser";
		var params = $("#loginForm").serialize();
		Util.ajax.postJson(url, params, function(data,flag){
				if(data.returnCode=="1"){
					location.href = contextPath + "/login";
					alert("dsds");
				}else{
					alert(data.returnMessage);
				}
		});
	})
})