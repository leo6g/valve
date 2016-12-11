package com.leo.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ai.frame.bean.OutputObject;
import com.ai.frame.util.BeanUtil;


import com.leo.form.Station9wForm;

/**
 * <h2></br>
 * 
 * @descript 
 * @author leo
 * @date 2016-12-10 22:05
 * @since JDK 1.7
 *
 */
@Controller
@RequestMapping("station9w")
public class Station9wController extends BaseController{
	
	
	
	/**
	 * 跳转到尾工位列表页面
	 * @param request
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "list")
	public ModelAndView list( ModelAndView mv) {
		mv.setViewName("weixin/ation9w-list");
		return mv;
	}
	/**
	 * 分页查询尾工位列表
	 * @param Station9wForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getList")
	public OutputObject getList(@ModelAttribute("station9wForm") Station9wForm station9wForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);
		outputObject = getOutputObject(map, "station9wService", "getList");
		return outputObject;
	}
	/**
	 *根据ID查询尾工位
	 * @param Station9wForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getById")
	public OutputObject getById(@ModelAttribute("Station9wForm") Station9wForm station9wForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);	
		outputObject = getOutputObject(map,"station9wService","getById");
		return outputObject;
	}
	/**
	 * 查看所有尾工位
	 * @param "Station9wForm"
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getAll")
	public OutputObject getAll(@ModelAttribute("Station9wForm") Station9wForm station9wForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);	
		outputObject = getOutputObject(map,"station9wService","getAll");
		return outputObject;
	}
	/**
	 * 添加尾工位
	 * @param Station9wForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "insertStation9w")
	public OutputObject insertStation9w(@ModelAttribute("Station9wForm") @Valid Station9wForm station9wForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
				return returnValidatorAjaxResult(result);
			}
			OutputObject outputObject = null;
			Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);
			outputObject = getOutputObject(map, "station9wService", "insertStation9w");
			if(outputObject.getReturnCode().equals("0")){
				outputObject.setReturnMessage("尾工位添加成功!");
			}
			return outputObject;
	}
	/**
	 * 编辑尾工位
	 * @param Station9wForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateStation9w")
	public OutputObject updateStation9w(@ModelAttribute("Station9wForm") @Valid Station9wForm station9wForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);
		outputObject = getOutputObject(map, "station9wService", "updateStation9w");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("尾工位编辑成功!");
		}
		return outputObject;
	}
	/**
	 * 去往添加页面
	 * @return
	 */
	@RequestMapping(value = "add")
	public ModelAndView add() {
		ModelAndView mav=new ModelAndView();
		mav.setViewName("weixin/add-ation9w");
		return mav;
	}
	/**
	 * 去往更新页面
	 * @return
	 */
	@RequestMapping(value = "edit")
	public ModelAndView edit(Model model) {
		ModelAndView mav=new ModelAndView();
		OutputObject outputObject = null;
		Map<String,String> map = new HashMap<String,String>();
		HttpServletRequest request = getRequest();
		map.put("id", request.getParameter("id"));
		outputObject = getOutputObject(map,"station9wService","getById");
		model.addAttribute("output", outputObject);
		mav.setViewName("weixin/edit-ation9w");
		return mav;
	}
	/**
	 * 删除尾工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteStation9w")
	public OutputObject deleteStation9w(@ModelAttribute("Station9wForm") Station9wForm station9wForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);
		outputObject = getOutputObject(map, "station9wService", "deleteStation9w");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("尾工位删除成功!");
		}
		return outputObject;
	}
	/**
	 * 逻辑删除尾工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logicDeleteStation9w")
	public OutputObject logicDeleteStation9w(@ModelAttribute("Station9wForm") Station9wForm station9wForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station9wForm);
		outputObject = getOutputObject(map, "station9wService", "logicDeleteStation9w");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("逻辑删除成功!");
		}
		return outputObject;
	}
	
}
