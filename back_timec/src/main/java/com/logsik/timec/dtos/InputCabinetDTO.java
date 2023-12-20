package com.logsik.timec.dtos;

import java.util.Date;

public class InputCabinetDTO {
	
	private Long id;
	private Long drugId;
	private Long drugCabinetId;
	private Date inputDate;
	private Integer inputAmount;
	private Long inputCabinetFormId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getInputDate() {
		return inputDate;
	}
	public void setInputDate(Date inputDate) {
		this.inputDate = inputDate;
	}
	public Integer getInputAmount() {
		return inputAmount;
	}
	public void setInputAmount(Integer inputAmount) {
		this.inputAmount = inputAmount;
	}
	public Long getInputCabinetFormId() {
		return inputCabinetFormId;
	}
	public void setInputCabinetFormId(Long inputCabinetFormId) {
		this.inputCabinetFormId = inputCabinetFormId;
	}
	public Long getDrugId() {
		return drugId;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public Long getDrugCabinetId() {
		return drugCabinetId;
	}
	public void setDrugCabinetId(Long drugCabinetId) {
		this.drugCabinetId = drugCabinetId;
	}
	
}
