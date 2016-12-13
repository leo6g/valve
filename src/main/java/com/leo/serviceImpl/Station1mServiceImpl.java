package com.leo.serviceImpl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;
import com.leo.service.IStation1mService ;
import com.leo.serviceImpl.BaseServiceImpl;
import com.leo.util.DateUtil;

public class Station1mServiceImpl extends BaseServiceImpl implements IStation1mService   {
	private Logger logger = LoggerFactory.getLogger("BaseContoller");
	@Override
	public void getList(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		List<Map<String, String>> list= getBaseDao().queryForList("Station1mMapper.getList", inputObject.getParams());
		outputObject.setBeans(list);
		int totalcount = getBaseDao().getTotalCount("Station1mMapper.countAll", inputObject.getParams());
		outputObject.getBean().put("count", String.valueOf(totalcount));
		 logger.info("getList success");
	}
	@Override
	public void getById(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		Object object=getBaseDao().queryForObject("Station1mMapper.getById", inputObject.getParams());
		outputObject.setObject(object);

	}
	@Override
	public void getAll(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		inputObject.getParams().put("deleteFlag","0");
		List<Map<String,String>> list = getBaseDao().queryForList("Station1mMapper.getAll", inputObject.getParams());
		outputObject.setBeans(list);
	
	}
	@Override
	public int insertStation1m(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String createTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		//查询首工位是否已经存在 有code验证时放开
		//Object object = getBaseDao().queryForObject("Station1mMapper.getByCode", inputObject.getParams());
	//	if(object==null){
			inputObject.getParams().put("deleteFlag", "0");
			inputObject.getParams().put("createTime", createTime);
			return getBaseDao().insert("Station1mMapper.insert", inputObject.getParams());
	//	}else{
	//		outputObject.setReturnCode("-1");
	//		outputObject.setReturnMessage("首工位已经存在，请修改!");
	//		return -1;
	//	}
	}

	@Override
	public int updateStation1m(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String updateTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		//查询首工位是否存在 有code验证时放开
		//Object object = getBaseDao().queryForObject("Station1mMapper.getByCode", inputObject.getParams());
		//if(object==null){
			inputObject.getParams().put("updateTime", updateTime);
			return getBaseDao().update("Station1mMapper.update", inputObject.getParams());
		//}else{
		//	outputObject.setReturnCode("-1");
		//	outputObject.setReturnMessage("首工位已经存在，请修改!");
		//	return -1;
		//}

	}
	@Override
	public int deleteStation1m(InputObject inputObject, OutputObject outputObject)
			throws Exception {
		return getBaseDao().delete("Station1mMapper.delete", inputObject.getParams());
	}
	
	@Override
	public int logicDeleteStation1m(InputObject inputObject,
			OutputObject outputObject) throws Exception {
		String updateTime = DateUtil.date2String(new Date(),DateUtil.DATE_PATTERN.YYYY_MM_DD_HH_MM_SS);
		inputObject.getParams().put("updateTime", updateTime);
		return getBaseDao().update("Station1mMapper.logicDelete", inputObject.getParams());

	}
	

}
