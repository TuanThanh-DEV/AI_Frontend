package com.logsik.timec.dtos;

import java.io.Serializable;

public class DrugStoreDto implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String description;
	private Long hospitalId;
	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}

}
