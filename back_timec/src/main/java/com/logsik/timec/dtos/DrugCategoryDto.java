package com.logsik.timec.dtos;

import java.io.Serializable;

import com.logsik.timec.enums.DrugType;

public class DrugCategoryDto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private DrugType drugType;
	
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
	public DrugType getDrugType() {
		return drugType;
	}
	public void setDrugType(DrugType drugType) {
		this.drugType = drugType;
	}
	
	

}
