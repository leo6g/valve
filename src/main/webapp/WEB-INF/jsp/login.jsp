<%@ page language="java" contentType="text/html" pageEncoding="GBK"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>�û���¼</title>
<link rel="stylesheet" type="text/css" href= "<%=request.getContextPath()%>/assets/jsp/images/styles.css">
<script src="<%=request.getContextPath()%>/assets/lib/jquery/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/assets/common/public.js"></script>
<script src="<%=request.getContextPath()%>/assets/common/strong-table.js"></script>
<script src="<%=request.getContextPath()%>/assets/common/clickme.js"></script>
<script src="<%=request.getContextPath()%>/assets/common/common.js"></script>
</head>

<body>
	<div align="center" class="div0">
		<!-- <div class="div1"> -->
		<div class="div3"></div>
		<div style="margin-top: -280px;">
		<div class="top" style="margin-bottom: 220px; "></div>
		<form class="table1"  name="frmLogin" id="loginForm">
			<div>

				<span>����Ա��</span><span>:</span> <input type="text" id="station" name="station" value="" size="20" maxlength="20" onfocus="if (this.value=='Your num')  this.value='';" style="width: 280px; ">
			</div>

			<div>
				<span>��&nbsp;��&nbsp;��</span><span>:</span> <input type="text" id="name" name="name" value="" size="20" maxlength="20" onfocus="if (this.value=='Your name')  this.value='';" style="width: 280px; ">

			</div>
			<div style="margin-bottom: 20px;">
				<span>��&nbsp;&nbsp;&nbsp;&nbsp;��</span><span>:</span> <input id="password" type="password" name="password" value="" size="20" maxlength="20" onfocus="if(this.value=='Your Password') this.value='';" style="width: 280px; ">

			</div>

			
			<input class="divlogin" type="button" id="loginUser" value="��¼" > 
			<input style="height: 40px;width: 140px; font: 20px;" type="reset" name="Reset" value="ȡ��">
		</form>
			<div style="margin-top:200px;position:relative; width: 680px;background-image: url('<%=request.getContextPath()%>/assets/jsp/images/��½����/shadow.png');"></div>
		  </div>
	  </div>
		<script type="text/javascript">  
		$(function(){
			$("#loginUser").bind("click",function(){
				var station = $("#station").val();  
                var name = $("#name").val(); 
                var password = $("#password").val(); 
               if (station ==""){  
                alert("��������!");  
                return ;  
               };
               if (name ==""){  
                alert("�������û���!");  
                return ;  
               }; 
                 
               if (password ==""){  
                alert("����������!");  
                return;
               };
               var url ="<%=request.getContextPath()%>/login/checkUser";
       		var params = $("#loginForm").serialize();
       		Util.ajax.postJson(url, params, function(data,flag){
       				if(data.returnCode=="1"){
       					location.href = "<%=request.getContextPath()%>/station0s";
       				}else{
       					alert(data.returnMessage);
       				}
       		});
			})
			 document.onkeydown = function(e) {
				e = e || window.event;
				if (e.keyCode == 13) {
					$("#loginUser").click();
				}
			}
			
		})
              
    </script>  
	
    
</body>
</html>
