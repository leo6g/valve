package com.leo.form;

public class Station1mForm extends BaseForm{

	/*
	字段注释：外泄漏量
	列名称:wxll
	字段类型:varchar*/
	private String wxll;
	/*
	字段注释：外漏泄漏标准/气压
	列名称:wlzlbzh_pressure
	字段类型:varchar*/
	private String wlzlbzhPressure;
	/*
	字段注释：外漏泄漏气压
	列名称:wlxl_pressure
	字段类型:varchar*/
	private String wlxlPressure;
	/*
	字段注释：内漏泄漏气压
	列名称:NLXL_PRESSURE
	字段类型:varchar*/
	private String nlxlPressure;
	/*
	字段注释：内泄漏量
	列名称:nxll
	字段类型:varchar*/
	private String nxll;
	/*
	字段注释：电机阀编号
	列名称:MACHINENUM
	字段类型:varchar*/
	private String machinenum;
	/*
	字段注释：内漏泄漏标准/气压
	列名称:nlxlbzh_pressure
	字段类型:varchar*/
	private String nlxlbzhPressure;
	/*
	字段注释：出厂编号
	列名称:factorynumber
	字段类型:varchar*/
	private String factorynumber;
	/*
	字段注释：电机阀型号
	列名称:MACHINEtype
	字段类型:varchar*/
	private String machinetype;
	/*
	字段注释：线别
	列名称:linenum
	字段类型:varchar*/
	private String linenum;
	/*
	字段注释：车间号
	列名称:wpnum
	字段类型:varchar*/
	private String wpnum;
	/*
	字段注释：id
	列名称:id
	字段类型:varchar*/
	private String id;
	/*
	字段注释：检测时间
	列名称:creattime
	字段类型:varchar*/
	private String creattime;
	/*
	字段注释：批次号
	列名称:batchnum
	字段类型:varchar*/
	private String batchnum;
	/*
	字段注释：工位序号
	列名称:stationnum
	字段类型:varchar*/
	private String stationnum;
	/*
	字段注释：端口号
	列名称:port
	字段类型:varchar*/
	private String port;
	/*
	字段注释：工位号
	列名称:station
	字段类型:varchar*/
	private String station;
	/*
	字段注释：检测结果
	列名称:result
	字段类型:varchar*/
	private String result;
	/*
	字段注释：阀门条码
	列名称:barcode
	字段类型:varchar*/
	private String barcode;
	
	
	public void setWxll(String wxll){
		this.wxll = wxll;
	}

	public String getWxll(){
		return wxll;
	}

	public void setWlzlbzhPressure(String wlzlbzhPressure){
		this.wlzlbzhPressure = wlzlbzhPressure;
	}

	public String getWlzlbzhPressure(){
		return wlzlbzhPressure;
	}

	public void setWlxlPressure(String wlxlPressure){
		this.wlxlPressure = wlxlPressure;
	}

	public String getWlxlPressure(){
		return wlxlPressure;
	}

	public void setNlxlPressure(String nlxlPressure){
		this.nlxlPressure = nlxlPressure;
	}

	public String getNlxlPressure(){
		return nlxlPressure;
	}

	public void setNxll(String nxll){
		this.nxll = nxll;
	}

	public String getNxll(){
		return nxll;
	}

	public void setMachinenum(String machinenum){
		this.machinenum = machinenum;
	}

	public String getMachinenum(){
		return machinenum;
	}

	public void setNlxlbzhPressure(String nlxlbzhPressure){
		this.nlxlbzhPressure = nlxlbzhPressure;
	}

	public String getNlxlbzhPressure(){
		return nlxlbzhPressure;
	}

	public void setFactorynumber(String factorynumber){
		this.factorynumber = factorynumber;
	}

	public String getFactorynumber(){
		return factorynumber;
	}

	public void setMachinetype(String machinetype){
		this.machinetype = machinetype;
	}

	public String getMachinetype(){
		return machinetype;
	}

	public void setLinenum(String linenum){
		this.linenum = linenum;
	}

	public String getLinenum(){
		return linenum;
	}

	public void setWpnum(String wpnum){
		this.wpnum = wpnum;
	}

	public String getWpnum(){
		return wpnum;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setCreattime(String creattime){
		this.creattime = creattime;
	}

	public String getCreattime(){
		return creattime;
	}

	public void setBatchnum(String batchnum){
		this.batchnum = batchnum;
	}

	public String getBatchnum(){
		return batchnum;
	}

	public void setStationnum(String stationnum){
		this.stationnum = stationnum;
	}

	public String getStationnum(){
		return stationnum;
	}

	public void setPort(String port){
		this.port = port;
	}

	public String getPort(){
		return port;
	}

	public void setStation(String station){
		this.station = station;
	}

	public String getStation(){
		return station;
	}

	public void setResult(String result){
		this.result = result;
	}

	public String getResult(){
		return result;
	}

	public void setBarcode(String barcode){
		this.barcode = barcode;
	}

	public String getBarcode(){
		return barcode;
	}

	
}