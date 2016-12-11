package com.leo.serviceImpl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;
import com.leo.service.IStation9wService ;
import com.leo.serviceImpl.BaseServiceImpl;
import com.leo.util.DateUtil;

public class Station9wServiceImpl extends BaseServiceImpl implements IStation9wService   {
	private Logger logger = LoggerFactory.getLogger("BaseContoller");
	@Override
	public void getList(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		List<Map<String, String>> list= getBaseDao().queryForList("Station9wMapper.getList", inputObject.getParams());
		outputObject.setBeans(list);
		int totalcount = getBaseDao().getTotalCount("Station9wMapper.countAll", inputObject.getParams());
		outputObject.setObject(totalcount);
		 logger.info("getList success");
	}
	@Override
	public void getById(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		Object object=getBaseDao().queryForObject("Station9wMapper.getById", inputObject.getParams());
		outputObject.setObject(object);

	}
	@Override
	public void getAll(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		inputObject.getParams().put("deleteFlag","0");
		List<Map<String,String>> list = getBaseDao().queryForList("Station9wMapper.getAll", inputObject.getParams());
		outputObject.setBeans(list);
	
	}
	@Override
	public int insertStation9w(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String createTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		//查询首工位是否已经存在 有code验证时放开
		//Object object = getBaseDao().queryForObject("Station9wMapper.getByCode", inputObject.getParams());
	//	if(object==null){
			inputObject.getParams().put("deleteFlag", "0");
			inputObject.getParams().put("createTime", createTime);
			return getBaseDao().insert("Station9wMapper.insert", inputObject.getParams());
	//	}else{
	//		outputObject.setReturnCode("-1");
	//		outputObject.setReturnMessage("首工位已经存在，请修改!");
	//		return -1;
	//	}
	}

	@Override
	public int updateStation9w(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String updateTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		//查询首工位是否存在 有code验证时放开
		//Object object = getBaseDao().queryForObject("Station9wMapper.getByCode", inputObject.getParams());
		//if(object==null){
			inputObject.getParams().put("updateTime", updateTime);
			return getBaseDao().update("Station9wMapper.update", inputObject.getParams());
		//}else{
		//	outputObject.setReturnCode("-1");
		//	outputObject.setReturnMessage("首工位已经存在，请修改!");
		//	return -1;
		//}

	}
	@Override
	public int deleteStation9w(InputObject inputObject, OutputObject outputObject)
			throws Exception {
		return getBaseDao().delete("Station9wMapper.delete", inputObject.getParams());
	}
	
	@Override
	public int logicDeleteStation9w(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String updateTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		inputObject.getParams().put("updateTime", updateTime);
		return getBaseDao().update("Station9wMapper.logicDelete", inputObject.getParams());

	}
	

}
