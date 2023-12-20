package com.logsik.timec.dtos;

import java.io.Serializable;

public class HospitalDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String code;
	private String address;
	private Boolean hasActive =false;
	
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
	public Boolean getHasActive() {
		return hasActive;
	}
	public void setHasActive(Boolean hasActive) {
		this.hasActive = hasActive;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	
}
