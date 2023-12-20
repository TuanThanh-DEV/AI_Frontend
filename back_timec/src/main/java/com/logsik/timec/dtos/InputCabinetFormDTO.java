package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.InputCabinetFormStatus;

public class InputCabinetFormDTO {

	private Long id;
	private Long DrugCabinetId;
	private Date inputDate;
	private Long createdUserId;
	private Long validatedUserId;
	private InputCabinetFormStatus status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDrugCabinetId() {
		return DrugCabinetId;
	}
	public void setDrugCabinetId(Long drugCabinetId) {
		DrugCabinetId = drugCabinetId;
	}
	public Date getInputDate() {
		return inputDate;
	}
	public void setInputDate(Date inputDate) {
		this.inputDate = inputDate;
	}
	public Long getCreatedUserId() {
		return createdUserId;
	}
	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}
	public Long getValidatedUserId() {
		return validatedUserId;
	}
	public void setValidatedUserId(Long validatedUserId) {
		this.validatedUserId = validatedUserId;
	}
	public InputCabinetFormStatus getStatus() {
		return status;
	}
	public void setStatus(InputCabinetFormStatus status) {
		this.status = status;
	}
	
	
}
