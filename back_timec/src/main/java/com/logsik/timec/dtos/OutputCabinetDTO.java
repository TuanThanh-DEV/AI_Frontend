package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.OutputCabinetStatus;

public class OutputCabinetDTO {
	
	private Long id;
	private Long drugId;
	private Long drugCabinetId;
	private Date outputDate;
	private Integer outAmount;
	private Long prescriptionId;
	private OutputCabinetStatus status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public Date getOutputDate() {
		return outputDate;
	}
	public void setOutputDate(Date outputDate) {
		this.outputDate = outputDate;
	}
	public Integer getOutAmount() {
		return outAmount;
	}
	public void setOutAmount(Integer outAmount) {
		this.outAmount = outAmount;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public OutputCabinetStatus getStatus() {
		return status;
	}
	public void setStatus(OutputCabinetStatus status) {
		this.status = status;
	}
	
}
