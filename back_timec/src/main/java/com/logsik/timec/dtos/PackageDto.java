package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PackageDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String code;
	private String pricePackage;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getPricePackage() {
		return pricePackage;
	}
	public void setPricePackage(String pricePackage) {
		this.pricePackage = pricePackage;
	}
	
	
	
	

}
