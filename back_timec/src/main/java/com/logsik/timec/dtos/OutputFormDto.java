package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.OutPutFormStatus;
import com.logsik.timec.enums.OutputFormType;

public class OutputFormDto {

	private Long id;
	private Long drugStoreId;
	private Long moveStoreFormId;
	private Date outputDate;
	private Long createdUserId;
	private Long validateduserId;
	private OutPutFormStatus status;
	private Long toDrugStoreId;
	private Long supplierId;
	private OutputFormType outputFormType;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDrugStoreId() {
		return drugStoreId;
	}
	public void setDrugStoreId(Long drugStoreId) {
		this.drugStoreId = drugStoreId;
	}
	public Date getOutputDate() {
		return outputDate;
	}
	public void setOutputDate(Date outputDate) {
		this.outputDate = outputDate;
	}
	public Long getCreatedUserId() {
		return createdUserId;
	}
	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}
	public Long getValidateduserId() {
		return validateduserId;
	}
	public void setValidateduserId(Long validateduserId) {
		this.validateduserId = validateduserId;
	}
	public OutPutFormStatus getStatus() {
		return status;
	}
	public void setStatus(OutPutFormStatus status) {
		this.status = status;
	}
	public Long getMoveStoreFormId() {
		return moveStoreFormId;
	}
	public void setMoveStoreFormId(Long moveStoreFormId) {
		this.moveStoreFormId = moveStoreFormId;
	}
	public Long getToDrugStoreId() {
		return toDrugStoreId;
	}
	public void setToDrugStoreId(Long toDrugStoreId) {
		this.toDrugStoreId = toDrugStoreId;
	}
	public Long getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}
	public OutputFormType getOutputFormType() {
		return outputFormType;
	}
	public void setOutputFormType(OutputFormType outputFormType) {
		this.outputFormType = outputFormType;
	}
	
}
