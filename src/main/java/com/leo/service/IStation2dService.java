package com.leo.service;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;

public interface IStation2dService {
	
	/**
	 * 分页查询首工位	 
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getList(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 根据ID查询首工位
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getById(InputObject inputObject,OutputObject outputObject)throws Exception;
	/**
	 * 查询所有首工位
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getAll(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 插入一条新的首工位
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int insertStation2d(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 更新首工位
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int updateStation2d(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 删除首工位(预留)
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int deleteStation2d(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 逻辑删除首工位
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int logicDeleteStation2d(InputObject inputObject, OutputObject outputObject) throws Exception;
}
