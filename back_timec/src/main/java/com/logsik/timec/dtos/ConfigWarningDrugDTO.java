package com.logsik.timec.dtos;

public class ConfigWarningDrugDTO {

	private Long id;
	private Long drugOneId;
	private Long drugTwoId;
	private int numberValidDate;
	private String description;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDrugOneId() {
		return drugOneId;
	}
	public void setDrugOneId(Long drugOneId) {
		this.drugOneId = drugOneId;
	}
	public Long getDrugTwoId() {
		return drugTwoId;
	}
	public void setDrugTwoId(Long drugTwoId) {
		this.drugTwoId = drugTwoId;
	}
	public int getNumberValidDate() {
		return numberValidDate;
	}
	public void setNumberValidDate(int numberValidDate) {
		this.numberValidDate = numberValidDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

	
}
