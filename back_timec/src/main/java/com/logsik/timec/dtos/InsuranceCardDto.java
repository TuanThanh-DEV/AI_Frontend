package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class InsuranceCardDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String insuranceCode;
	private Long patientId;
	private Date fromDate;
	private Date toDate;
	private Long insuranceTypeId;
	private String addressBHYT;
	private String maDKBD;
	private String addressDKBD;
	
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
	public Long getInsuranceTypeId() {
		return insuranceTypeId;
	}
	public void setInsuranceTypeId(Long insuranceTypeId) {
		this.insuranceTypeId = insuranceTypeId;
	}

	public String getMaDKBD() {
		return maDKBD;
	}
	
	public void setMaDKBD(String maDKBD) {
		this.maDKBD = maDKBD;
	}
	public String getAddressBHYT() {
		return addressBHYT;
	}
	public String getAddressDKBD() {
		return addressDKBD;
	}
	public void setAddressBHYT(String addressBHYT) {
		this.addressBHYT = addressBHYT;
	}
	public void setAddressDKBD(String addressDKBD) {
		this.addressDKBD = addressDKBD;
	}

}
