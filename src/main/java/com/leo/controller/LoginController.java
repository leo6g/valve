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
	
	@RequestMapping(value="station0s")
	public ModelAndView station0s(ModelAndView mv){
		mv.setViewName("station0s");
		return mv;
	}
	@RequestMapping(value="station1m")
	public ModelAndView station1m(ModelAndView mv){
		mv.setViewName("station1m");
		return mv;
	}
	@RequestMapping(value="station2d")
	public ModelAndView station2d(ModelAndView mv){
		mv.setViewName("station2d");
		return mv;
	}
	@RequestMapping(value="station9w")
	public ModelAndView station9w(ModelAndView mv){
		mv.setViewName("station9w");
		return mv;
	}
	@RequestMapping(value="sealingTest")
	public ModelAndView sealingTest(ModelAndView mv){
		mv.setViewName("sealingTest");
		return mv;
	}
	@RequestMapping(value="testingProcedures")
	public ModelAndView testingProcedures(ModelAndView mv){
		mv.setViewName("testingProcedures");
		return mv;
	}
	@RequestMapping(value="electrical")
	public ModelAndView electrical(ModelAndView mv){
		mv.setViewName("electrical");
		return mv;
	}
	
	
	@RequestMapping(value="login")
	public ModelAndView login(ModelAndView mv,HttpServletRequest request){
		String userName = (String)getSession().getAttribute("userName");
		if(StringUtil.isNotEmpty(userName)){
			mv.setViewName("station0s");
		}else{
			mv.setViewName("login");
		}
		return mv;
	}
	
	@ResponseBody
	@RequestMapping(value="login/checkUser")
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
		}
		return out;
	}
	
}
