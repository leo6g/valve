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


import com.leo.form.Station1mForm;

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
@RequestMapping("station1m")
public class Station1mController extends BaseController{
	
	
	
	/**
	 * 跳转到密封性检测工位列表页面
	 * @param request
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "list")
	public ModelAndView list( ModelAndView mv) {
		mv.setViewName("weixin/ation1m-list");
		return mv;
	}
	/**
	 * 分页查询密封性检测工位列表
	 * @param Station1mForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getList")
	public OutputObject getList(@ModelAttribute("station1mForm") Station1mForm station1mForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);
		map.put("start", String.valueOf(((station1mForm.getPageNumber()-1)*station1mForm.getLimit())));
		outputObject = getOutputObject(map, "station1mService", "getList");
		outputObject.setReturnCode("1");
		return outputObject;
	}
	/**
	 *根据ID查询密封性检测工位
	 * @param Station1mForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getById")
	public OutputObject getById(@ModelAttribute("Station1mForm") Station1mForm station1mForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);	
		outputObject = getOutputObject(map,"station1mService","getById");
		return outputObject;
	}
	/**
	 * 查看所有密封性检测工位
	 * @param "Station1mForm"
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getAll")
	public OutputObject getAll(@ModelAttribute("Station1mForm") Station1mForm station1mForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);	
		outputObject = getOutputObject(map,"station1mService","getAll");
		return outputObject;
	}
	/**
	 * 添加密封性检测工位
	 * @param Station1mForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "insertStation1m")
	public OutputObject insertStation1m(@ModelAttribute("Station1mForm") @Valid Station1mForm station1mForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
				return returnValidatorAjaxResult(result);
			}
			OutputObject outputObject = null;
			Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);
			outputObject = getOutputObject(map, "station1mService", "insertStation1m");
			if(outputObject.getReturnCode().equals("0")){
				outputObject.setReturnMessage("密封性检测工位添加成功!");
			}
			return outputObject;
	}
	/**
	 * 编辑密封性检测工位
	 * @param Station1mForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateStation1m")
	public OutputObject updateStation1m(@ModelAttribute("Station1mForm") @Valid Station1mForm station1mForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);
		outputObject = getOutputObject(map, "station1mService", "updateStation1m");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("密封性检测工位编辑成功!");
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
		mav.setViewName("weixin/add-ation1m");
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
		outputObject = getOutputObject(map,"station1mService","getById");
		model.addAttribute("output", outputObject);
		mav.setViewName("weixin/edit-ation1m");
		return mav;
	}
	/**
	 * 删除密封性检测工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteStation1m")
	public OutputObject deleteStation1m(@ModelAttribute("Station1mForm") Station1mForm station1mForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);
		outputObject = getOutputObject(map, "station1mService", "deleteStation1m");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("密封性检测工位删除成功!");
		}
		return outputObject;
	}
	/**
	 * 逻辑删除密封性检测工位
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logicDeleteStation1m")
	public OutputObject logicDeleteStation1m(@ModelAttribute("Station1mForm") Station1mForm station1mForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(station1mForm);
		outputObject = getOutputObject(map, "station1mService", "logicDeleteStation1m");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("逻辑删除成功!");
		}
		return outputObject;
	}
	
}
