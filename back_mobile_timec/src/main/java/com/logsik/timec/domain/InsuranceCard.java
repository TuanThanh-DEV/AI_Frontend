package com.logsik.timec.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name = "insurance_card")
public class InsuranceCard implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@Column
	private String insuranceCode;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name = "patient_id", updatable = false,insertable= false)
	private Patient patient;
	
	@Column(name = "patient_id")
	private Long patientId;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date fromDate;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date toDate;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name = "type_id", updatable = false,insertable= false)
	private InsuranceType insuranceType;
	
	@Column(name = "type_id")
	private Long insuranceTypeId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getInsuranceCode() {
		return insuranceCode;
	}

	public void setInsuranceCode(String insuranceCode) {
		this.insuranceCode = insuranceCode;
	}

	public Patient getPatient() {
		return patient;
	}

//	public void setPatient(Patient patient) {
//		this.patient = patient;
//	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public InsuranceType getInsuranceType() {
		return insuranceType;
	}

	public void setInsuranceType(InsuranceType insuranceType) {
		this.insuranceType = insuranceType;
	}

	public Long getInsuranceTypeId() {
		return insuranceTypeId;
	}

	public void setInsuranceTypeId(Long insuranceTypeId) {
		this.insuranceTypeId = insuranceTypeId;
	}

}
