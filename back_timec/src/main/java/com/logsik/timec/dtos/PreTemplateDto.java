package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PreTemplateDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private Long departmentId;
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
	public Long getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
	
	
}
