package com.leo.serviceImpl;

import com.ai.frame.bean.InputObject;
import com.ai.frame.bean.OutputObject;

public interface IProcedureService {
	
	/**
	 * 分页查询检测流程	 
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getList(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 根据ID查询检测流程
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getById(InputObject inputObject,OutputObject outputObject)throws Exception;
	/**
	 * 查询所有检测流程
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public void getAll(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 插入一条新的检测流程
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int insertProcedure(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 更新检测流程
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int updateProcedure(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 删除检测流程(预留)
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int deleteProcedure(InputObject inputObject, OutputObject outputObject) throws Exception;
	/**
	 * 逻辑删除检测流程
	 * @param inputObject
	 * @param outputObject
	 * @throws Exception
	 */
	public int logicDeleteProcedure(InputObject inputObject, OutputObject outputObject) throws Exception;
}
