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


import com.leo.form.ProcedureForm;

/**
 * <h2></br>
 * 
 * @descript 
 * @author leo
 * @date 2016-12-11 19:19
 * @since JDK 1.7
 *
 */
@Controller
@RequestMapping("")
public class ProcedureController extends BaseController{
	
	
	
	/**
	 * 跳转到检测流程列表页面
	 * @param request
	 * @param mv
	 * @return
	 */
	@RequestMapping(value = "list")
	public ModelAndView list( ModelAndView mv) {
		mv.setViewName("weixin/ocedure-list");
		return mv;
	}
	/**
	 * 分页查询检测流程列表
	 * @param ProcedureForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getList")
	public OutputObject getList(@ModelAttribute("procedureForm") ProcedureForm procedureForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);
		map.put("start", String.valueOf(((procedureForm.getPageNumber()-1)*procedureForm.getLimit())));
		outputObject = getOutputObject(map, "procedureService", "getList");
		outputObject.setReturnCode("1");
		return outputObject;
	}
	/**
	 *根据ID查询检测流程
	 * @param ProcedureForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getById")
	public OutputObject getById(@ModelAttribute("ProcedureForm") ProcedureForm procedureForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);	
		outputObject = getOutputObject(map,"procedureService","getById");
		return outputObject;
	}
	/**
	 * 查看所有检测流程
	 * @param "ProcedureForm"
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "getAll")
	public OutputObject getAll(@ModelAttribute("ProcedureForm") ProcedureForm procedureForm,BindingResult result, Model model,ModelMap mm) {
		OutputObject outputObject = null;
		if (result.hasErrors()) {
			returnValidatorAjaxResult(result);
		}
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);	
		outputObject = getOutputObject(map,"procedureService","getAll");
		return outputObject;
	}
	/**
	 * 添加检测流程
	 * @param ProcedureForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "insertProcedure")
	public OutputObject insertProcedure(@ModelAttribute("ProcedureForm") @Valid ProcedureForm procedureForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
				return returnValidatorAjaxResult(result);
			}
			OutputObject outputObject = null;
			Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);
			outputObject = getOutputObject(map, "procedureService", "insertProcedure");
			if(outputObject.getReturnCode().equals("0")){
				outputObject.setReturnMessage("检测流程添加成功!");
			}
			return outputObject;
	}
	/**
	 * 编辑检测流程
	 * @param ProcedureForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateProcedure")
	public OutputObject updateProcedure(@ModelAttribute("ProcedureForm") @Valid ProcedureForm procedureForm,BindingResult result, Model model,ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);
		outputObject = getOutputObject(map, "procedureService", "updateProcedure");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("检测流程编辑成功!");
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
		mav.setViewName("weixin/add-ocedure");
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
		outputObject = getOutputObject(map,"procedureService","getById");
		model.addAttribute("output", outputObject);
		mav.setViewName("weixin/edit-ocedure");
		return mav;
	}
	/**
	 * 删除检测流程
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "deleteProcedure")
	public OutputObject deleteProcedure(@ModelAttribute("ProcedureForm") ProcedureForm procedureForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);
		outputObject = getOutputObject(map, "procedureService", "deleteProcedure");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("检测流程删除成功!");
		}
		return outputObject;
	}
	/**
	 * 逻辑删除检测流程
	 * @param departForm
	 * @param result
	 * @param request
	 * @param model
	 * @param mm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "logicDeleteProcedure")
	public OutputObject logicDeleteProcedure(@ModelAttribute("ProcedureForm") ProcedureForm procedureForm,
			BindingResult result,  Model model, ModelMap mm) {
		if (result.hasErrors()) {
			return returnValidatorAjaxResult(result);
		}
		OutputObject outputObject = null;
		Map<String,String> map = BeanUtil.convertBean2Map(procedureForm);
		outputObject = getOutputObject(map, "procedureService", "logicDeleteProcedure");
		if(outputObject.getReturnCode().equals("0")){
			outputObject.setReturnMessage("逻辑删除成功!");
		}
		return outputObject;
	}
	
}
