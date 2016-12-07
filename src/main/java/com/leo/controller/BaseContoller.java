package com.leo.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;
import com.lfc.core.util.JsonUtil;

public class BaseContoller {
	@Autowired
	BeanFactory beanFactory;
	protected Logger logger = LoggerFactory.getLogger("BaseContoller");
	public HttpServletRequest getRequest(){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		return request;
	}
	public HttpSession getSession(){
		HttpSession session = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		return session;
	}
	public OutputObject getOutputObject(InputObject inputObj){
		String service = inputObj.getService();
		String method = inputObj.getMethod();
		if(StringUtils.isNotEmpty(method)&&StringUtils.isNotEmpty(service)){
			execute(inputObj);
		}else{
			logger.info("SERVICE NAME OR METHOD NAME IS NULL!!!");
		}
		return null;
	}
	private void execute(InputObject inputObj){
		long start = System.currentTimeMillis();
		OutputObject outputObj = null;
		String service = inputObj.getService();
		String method = inputObj.getMethod();
		try {
			logger.info("INVOKE SECCESS!", "service=" + inputObj.getService() + "| method=" + inputObj.getMethod()+"|input="+JsonUtil.convertObject2Json(inputObj)+"|COST="+(System.currentTimeMillis() - start)+"ms");
			Object obj = beanFactory.getBean(service);
			Method mth = obj.getClass().getMethod(method, InputObject.class,OutputObject.class);
			mth.invoke(obj, inputObj,outputObj);
			logger.info("INVOKE SECCESS!", "service=" + inputObj.getService() + "| method=" + inputObj.getMethod()+"|output="+JsonUtil.convertObject2Json(outputObj)+"|COST="+(System.currentTimeMillis() - start)+"ms");
		} catch (Exception e) {
			logger.info("execute INVOKE ERROR！");
		}
		
	}
}
