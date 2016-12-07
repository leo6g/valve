package com.leo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController extends BaseContoller {
	
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
	
}
