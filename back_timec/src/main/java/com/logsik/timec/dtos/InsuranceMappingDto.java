package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class InsuranceMappingDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String insuranceItemCode;
	private Long drugId;
	private Date startDateValid;
	private Date endDateValid;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getInsuranceItemCode() {
		return insuranceItemCode;
	}
	public void setInsuranceItemCode(String insuranceItemCode) {
		this.insuranceItemCode = insuranceItemCode;
	}
	public Long getDrugId() {
		return drugId;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public Date getStartDateValid() {
		return startDateValid;
	}
	public void setStartDateValid(Date startDateValid) {
		this.startDateValid = startDateValid;
	}
	public Date getEndDateValid() {
		return endDateValid;
	}
	public void setEndDateValid(Date endDateValid) {
		this.endDateValid = endDateValid;
	}
	

}
