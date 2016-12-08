package com.leo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ai.frame.bean.OutputObject;
import com.leo.form.SYSUserForm;

@Controller
public class LoginController extends BaseController {
	
	@RequestMapping(value="0首工位")
	public ModelAndView station0(ModelAndView mv){
		mv.setViewName("0首工位");
		return mv;
	}
	
	@RequestMapping(value="login")
	public ModelAndView login(ModelAndView mv){
		mv.setViewName("登陆界面");
		mv.addObject("username", "heeee");
		return mv;
	}
	
	@ResponseBody
	@RequestMapping(value="checkUser")
	public OutputObject checkUser(@ModelAttribute("sYSUserForm") SYSUserForm sYSUserForm,HttpServletRequest request,HttpServletResponse response){
		OutputObject out = null;
		
		return out;
	}
	
}
