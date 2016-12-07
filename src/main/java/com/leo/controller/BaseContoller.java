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
			logger.info("方法名或服务名不能为空");
		}
		return null;
	}
	private void execute(InputObject inputObj){
		OutputObject outputObj = null;
		String service = inputObj.getService();
		String method = inputObj.getMethod();
		try {
			Object obj = beanFactory.getBean(service);
			Method mth = obj.getClass().getMethod(method, InputObject.class,OutputObject.class);
			mth.invoke(obj, inputObj,outputObj);
		} catch (Exception e) {
			logger.info("execute INVOKE ERROR！");
		}
		
	}
}
