package com.leo.form;

import org.hibernate.validator.constraints.NotEmpty;

public class SYSUserForm extends BaseForm{

	/*
	字段注释：姓名
	列名称:name
	字段类型:varchar*/
	@NotEmpty
	private String name;
	/*
	字段注释：密码
	列名称:password
	字段类型:varchar*/
	@NotEmpty
	private String password;
	/*
	字段注释：工位号
	列名称:station
	字段类型:varchar*/
	@NotEmpty
	private String station;
	
	
	public void setName(String name){
		this.name = name;
	}

	public String getName(){
		return name;
	}

	public void setPassword(String password){
		this.password = password;
	}

	public String getPassword(){
		return password;
	}

	public void setStation(String station){
		this.station = station;
	}

	public String getStation(){
		return station;
	}

	
}