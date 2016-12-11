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


import com.leo.form.Station0sForm;

/**
 * <h2></br>
 * 
 * @descript 
 * @author leo
 * @date 2016-12-10 22:06
 * @since JDK 1.7
 *
 */
@Controller
@RequestMapping("station0s")
public class Station0sController extends BaseController{
	
	
	
	/**
	 * 跳转到首工位列表页面
	 * @param request
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "list")
	public ModelAndView list( ModelAndView mv) {
		mv.setViewName("weixin/ation0s-list");
		return mv;
	}
	/**
	 * 分页查询首工位列表
	 * @param Station0sForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getList")
	public OutputObject getList(@ModelAttribute("station0sForm") Station0sForm station0sForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);
		outputObject = getOutputObject(map, "station0sService", "getList");
		return outputObject;
	}
	/**
	 *根据ID查询首工位
	 * @param Station0sForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getById")
	public OutputObject getById(@ModelAttribute("Station0sForm") Station0sForm station0sForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);	
		outputObject = getOutputObject(map,"station0sService","getById");
		return outputObject;
	}
	/**
	 * 查看所有首工位
	 * @param "Station0sForm"
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getAll")
	public OutputObject getAll(@ModelAttribute("Station0sForm") Station0sForm station0sForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);	
		outputObject = getOutputObject(map,"station0sService","getAll");
		return outputObject;
	}
	/**
	 * 添加首工位
	 * @param Station0sForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "insertStation0s")
	public OutputObject insertStation0s(@ModelAttribute("Station0sForm") @Valid Station0sForm station0sForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
				return returnValidatorAjaxResult(result);
			}
			OutputObject outputObject = null;
			Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);
			outputObject = getOutputObject(map, "station0sService", "insertStation0s");
			if(outputObject.getReturnCode().equals("0")){
				outputObject.setReturnMessage("首工位添加成功!");
			}
			return outputObject;
	}
	/**
	 * 编辑首工位
	 * @param Station0sForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateStation0s")
	public OutputObject updateStation0s(@ModelAttribute("Station0sForm") @Valid Station0sForm station0sForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);
		outputObject = getOutputObject(map, "station0sService", "updateStation0s");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("首工位编辑成功!");
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
		mav.setViewName("weixin/add-ation0s");
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
		outputObject = getOutputObject(map,"station0sService","getById");
		model.addAttribute("output", outputObject);
		mav.setViewName("weixin/edit-ation0s");
		return mav;
	}
	/**
	 * 删除首工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteStation0s")
	public OutputObject deleteStation0s(@ModelAttribute("Station0sForm") Station0sForm station0sForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);
		outputObject = getOutputObject(map, "station0sService", "deleteStation0s");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("首工位删除成功!");
		}
		return outputObject;
	}
	/**
	 * 逻辑删除首工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logicDeleteStation0s")
	public OutputObject logicDeleteStation0s(@ModelAttribute("Station0sForm") Station0sForm station0sForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station0sForm);
		outputObject = getOutputObject(map, "station0sService", "logicDeleteStation0s");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("逻辑删除成功!");
		}
		return outputObject;
	}
	
}
