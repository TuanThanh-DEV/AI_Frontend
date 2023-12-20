package com.logsik.timec.dtos;

import java.io.Serializable;


public class DepartmentDto implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String description;
	private Long hospitalId;
	private Boolean hasActive = false;
	private String departmentCode;
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
	public Boolean getHasActive() {
		return hasActive;
	}
	public void setHasActive(Boolean hasActive) {
		this.hasActive = hasActive;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

}
