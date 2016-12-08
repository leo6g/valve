package com.leo.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;
import com.ai.frame.util.BeanUtil;
import com.leo.form.SYSUserForm;
import com.leo.util.StringUtil;
@Controller
public class LoginController extends BaseController {
	
	@RequestMapping(value="0首工位")
	public ModelAndView station0(ModelAndView mv){
		mv.setViewName("0首工位");
		return mv;
	}
	
	@RequestMapping(value="login")
	public ModelAndView login(ModelAndView mv,HttpServletRequest request){
		
		String userName = (String)getSession().getAttribute("userName");
//		if(StringUtil.isEmpty(userName)){
//			mv.setViewName("登陆界面");
//		}else{
//			mv.setViewName("0首工位");
//			mv.addObject("username", "heeee");
//		}
		mv.setViewName("登陆界面");
		return mv;
	}
	
	@ResponseBody
	@RequestMapping(value="checkUser")
	public OutputObject checkUser(@ModelAttribute("sYSUserForm") SYSUserForm sYSUserForm,HttpServletRequest request,HttpServletResponse response
			,BindingResult result){
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject out = null;
		InputObject in = new InputObject();
		Map<String,String> param = BeanUtil.convertBean2Map(sYSUserForm);
		in.setService("SYSUserServiceImpl");
		in.setMethod("checkUser");
		in.setParams(param);
		out = getOutputObject(in);
		if(out.getBean()==null){
			out.setReturnCode("0");
			out.setReturnMessage("登陆失败！请检查输入信息");
		}else{
			out.setReturnCode("1");
			getSession().setAttribute("userName", out.getBean().get("name"));
			getSession().setAttribute("station", out.getBean().get("station"));
			out.setReturnMessage("恭喜。。登陆成功");
		}
		return out;
	}
	
}
