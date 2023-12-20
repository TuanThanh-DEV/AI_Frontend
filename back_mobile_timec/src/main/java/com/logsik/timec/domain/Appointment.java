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

@Entity(name = "appointment")
public class Appointment implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date appointDate;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="patient_id", updatable = false,insertable= false)
	private Patient patient;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="doctor_id", updatable = false,insertable= false)
	private User user;

	@Column
	private String status;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="hospital_id", updatable = false,insertable= false)
	private Hospital hospital;
	
	@Column(name="patient_id")
	private Long patientId;
	
	@Column(name="doctor_id")
	private Long userId;
	
	@Column(name="hospital_id")
	private Long hospitalId;
	
	@Column(name="prescription_id")
	private Long prescriptionId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getAppointDate() {
		return appointDate;
	}

	public void setAppointDate(Date appointDate) {
		this.appointDate = appointDate;
	}

	public Patient getPatient() {
		return patient;
	}


	public User getUser() {
		return user;
	}


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Hospital getHospital() {
		return hospital;
	}


	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}

	public Long getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	
	
   
}
