package com.leo.form;

public class ProcedureForm extends BaseForm{

	/*
	字段注释：批次号
	列名称:batchnum
	字段类型:varchar*/
	private String batchnum;
	/*
	字段注释：阀门条码
	列名称:barcode
	字段类型:varchar*/
	private String barcode;
	/*
	字段注释：9尾工位检测
	列名称:statioin9w
	字段类型:varchar*/
	private String statioin9w;
	/*
	字段注释：id
	列名称:id
	字段类型:varchar*/
	private String id;
	/*
	字段注释：1密封性检测时间
	列名称:station1mtime
	字段类型:varchar*/
	private String station1mtime;
	/*
	字段注释：1密封性检测
	列名称:station1m
	字段类型:varchar*/
	private String station1m;
	/*
	字段注释：0首工位检测时间
	列名称:station0stime
	字段类型:varchar*/
	private String station0stime;
	/*
	字段注释：0首工位检测
	列名称:station0s
	字段类型:varchar*/
	private String station0s;
	/*
	字段注释：2电性能检测时间
	列名称:station2dtime
	字段类型:varchar*/
	private String station2dtime;
	/*
	字段注释：2电性能检测
	列名称:station2d
	字段类型:varchar*/
	private String station2d;
	/*
	字段注释：9尾工位检测时间
	列名称:station9wtime
	字段类型:varchar*/
	private String station9wtime;
	/*
	字段注释：操作员
	列名称:station
	字段类型:varchar*/
	private String station;
	
	
	public void setBatchnum(String batchnum){
		this.batchnum = batchnum;
	}

	public String getBatchnum(){
		return batchnum;
	}

	public void setBarcode(String barcode){
		this.barcode = barcode;
	}

	public String getBarcode(){
		return barcode;
	}

	public void setStatioin9w(String statioin9w){
		this.statioin9w = statioin9w;
	}

	public String getStatioin9w(){
		return statioin9w;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getId(){
		return id;
	}

	public void setStation1mtime(String station1mtime){
		this.station1mtime = station1mtime;
	}

	public String getStation1mtime(){
		return station1mtime;
	}

	public void setStation1m(String station1m){
		this.station1m = station1m;
	}

	public String getStation1m(){
		return station1m;
	}

	public void setStation0stime(String station0stime){
		this.station0stime = station0stime;
	}

	public String getStation0stime(){
		return station0stime;
	}

	public void setStation0s(String station0s){
		this.station0s = station0s;
	}

	public String getStation0s(){
		return station0s;
	}

	public void setStation2dtime(String station2dtime){
		this.station2dtime = station2dtime;
	}

	public String getStation2dtime(){
		return station2dtime;
	}

	public void setStation2d(String station2d){
		this.station2d = station2d;
	}

	public String getStation2d(){
		return station2d;
	}

	public void setStation9wtime(String station9wtime){
		this.station9wtime = station9wtime;
	}

	public String getStation9wtime(){
		return station9wtime;
	}

	public void setStation(String station){
		this.station = station;
	}

	public String getStation(){
		return station;
	}

	
}