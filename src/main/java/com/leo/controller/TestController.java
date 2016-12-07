package com.leo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "test")
public class TestController extends BaseContoller {
	
	@RequestMapping(value="test")
	public ModelAndView test(ModelAndView mv){
		mv.setViewName("test");
		return mv;
	}
	
}
