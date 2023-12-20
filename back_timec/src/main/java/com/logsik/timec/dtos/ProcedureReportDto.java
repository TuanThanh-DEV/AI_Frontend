package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.ProcedureReportStatus;

public class ProcedureReportDto {

	private Long id;
	private Date arriveTime;
	private Date startTime;
	private Date doneTime;
	private String note;
	private Long prescriptionId;
	private Long hospitalId;
	private Long patientId;
	private Long procedureServiceId;
	private ProcedureReportStatus status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getArriveTime() {
		return arriveTime;
	}
	public void setArriveTime(Date arriveTime) {
		this.arriveTime = arriveTime;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getDoneTime() {
		return doneTime;
	}
	public void setDoneTime(Date doneTime) {
		this.doneTime = doneTime;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Long getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public Long getProcedureServiceId() {
		return procedureServiceId;
	}
	public void setProcedureServiceId(Long procedureServiceId) {
		this.procedureServiceId = procedureServiceId;
	}
	public ProcedureReportStatus getStatus() {
		return status;
	}
	public void setStatus(ProcedureReportStatus status) {
		this.status = status;
	}
	
}
