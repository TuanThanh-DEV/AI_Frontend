package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.TransferType;

public class TransferFormDto {
	
	private Long id;
	private Long prescriptionId;
	private Long transferHospitalId;
	private Long createdById;
	private Date createdDate;
	private String cls;
	private String diagnosisReports;
	private String analysis;
	private String therapyNote;
	private String patientStatus;
	private String transferReason;
	private String treatmentGuide;
	private Date transferDate;
	private String transportMethod;
	private String transportPerson;
	private Boolean shouldReview;
	private String barCode;
	private TransferType transferType;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Long getTransferHospitalId() {
		return transferHospitalId;
	}
	public void setTransferHospitalId(Long transferHospitalId) {
		this.transferHospitalId = transferHospitalId;
	}
	public Long getCreatedById() {
		return createdById;
	}
	public void setCreatedById(Long createdById) {
		this.createdById = createdById;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	public String getDiagnosisReports() {
		return diagnosisReports;
	}
	public void setDiagnosisReports(String diagnosisReports) {
		this.diagnosisReports = diagnosisReports;
	}
	public String getAnalysis() {
		return analysis;
	}
	public void setAnalysis(String analysis) {
		this.analysis = analysis;
	}
	public String getTherapyNote() {
		return therapyNote;
	}
	public void setTherapyNote(String therapyNote) {
		this.therapyNote = therapyNote;
	}
	public String getPatientStatus() {
		return patientStatus;
	}
	public void setPatientStatus(String patientStatus) {
		this.patientStatus = patientStatus;
	}
	public String getTransferReason() {
		return transferReason;
	}
	public void setTransferReason(String transferReason) {
		this.transferReason = transferReason;
	}
	public String getTreatmentGuide() {
		return treatmentGuide;
	}
	public void setTreatmentGuide(String treatmentGuide) {
		this.treatmentGuide = treatmentGuide;
	}
	public Date getTransferDate() {
		return transferDate;
	}
	public void setTransferDate(Date transferDate) {
		this.transferDate = transferDate;
	}
	public String getTransportMethod() {
		return transportMethod;
	}
	public void setTransportMethod(String transportMethod) {
		this.transportMethod = transportMethod;
	}
	public String getTransportPerson() {
		return transportPerson;
	}
	public void setTransportPerson(String transportPerson) {
		this.transportPerson = transportPerson;
	}
	public Boolean getShouldReview() {
		return shouldReview;
	}
	public void setShouldReview(Boolean shouldReview) {
		this.shouldReview = shouldReview;
	}
	public String getBarCode() {
		return barCode;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public TransferType getTransferType() {
		return transferType;
	}
	public void setTransferType(TransferType transferType) {
		this.transferType = transferType;
	}
	
	
	
}
