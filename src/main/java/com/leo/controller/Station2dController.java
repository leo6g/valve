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


import com.leo.form.Station2dForm;

/**
 * <h2></br>
 * 
 * @descript 
 * @author leo
 * @date 2016-12-10 22:07
 * @since JDK 1.7
 *
 */
@Controller
@RequestMapping("station2d")
public class Station2dController extends BaseController{
	
	
	
	/**
	 * 跳转到电性能检测工位列表页面
	 * @param request
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "list")
	public ModelAndView list( ModelAndView mv) {
		mv.setViewName("weixin/ation2d-list");
		return mv;
	}
	/**
	 * 分页查询电性能检测工位列表
	 * @param Station2dForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getList")
	public OutputObject getList(@ModelAttribute("station2dForm") Station2dForm station2dForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);
		outputObject = getOutputObject(map, "station2dService", "getList");
		outputObject.setReturnCode("1");
		return outputObject;
	}
	/**
	 *根据ID查询电性能检测工位
	 * @param Station2dForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getById")
	public OutputObject getById(@ModelAttribute("Station2dForm") Station2dForm station2dForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);	
		outputObject = getOutputObject(map,"station2dService","getById");
		return outputObject;
	}
	/**
	 * 查看所有电性能检测工位
	 * @param "Station2dForm"
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getAll")
	public OutputObject getAll(@ModelAttribute("Station2dForm") Station2dForm station2dForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);	
		outputObject = getOutputObject(map,"station2dService","getAll");
		return outputObject;
	}
	/**
	 * 添加电性能检测工位
	 * @param Station2dForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "insertStation2d")
	public OutputObject insertStation2d(@ModelAttribute("Station2dForm") @Valid Station2dForm station2dForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
				return returnValidatorAjaxResult(result);
			}
			OutputObject outputObject = null;
			Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);
			outputObject = getOutputObject(map, "station2dService", "insertStation2d");
			if(outputObject.getReturnCode().equals("0")){
				outputObject.setReturnMessage("电性能检测工位添加成功!");
			}
			return outputObject;
	}
	/**
	 * 编辑电性能检测工位
	 * @param Station2dForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateStation2d")
	public OutputObject updateStation2d(@ModelAttribute("Station2dForm") @Valid Station2dForm station2dForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);
		outputObject = getOutputObject(map, "station2dService", "updateStation2d");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("电性能检测工位编辑成功!");
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
		mav.setViewName("weixin/add-ation2d");
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
		outputObject = getOutputObject(map,"station2dService","getById");
		model.addAttribute("output", outputObject);
		mav.setViewName("weixin/edit-ation2d");
		return mav;
	}
	/**
	 * 删除电性能检测工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteStation2d")
	public OutputObject deleteStation2d(@ModelAttribute("Station2dForm") Station2dForm station2dForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);
		outputObject = getOutputObject(map, "station2dService", "deleteStation2d");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("电性能检测工位删除成功!");
		}
		return outputObject;
	}
	/**
	 * 逻辑删除电性能检测工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logicDeleteStation2d")
	public OutputObject logicDeleteStation2d(@ModelAttribute("Station2dForm") Station2dForm station2dForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station2dForm);
		outputObject = getOutputObject(map, "station2dService", "logicDeleteStation2d");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("逻辑删除成功!");
		}
		return outputObject;
	}
	
}
