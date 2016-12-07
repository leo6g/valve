package com.leo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TestController extends BaseContoller {
	
	@RequestMapping(value="login")
	public ModelAndView test(ModelAndView mv){
		mv.setViewName("login");
		return mv;
	}
	
}
