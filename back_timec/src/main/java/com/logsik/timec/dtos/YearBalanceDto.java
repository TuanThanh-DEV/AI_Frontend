package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class YearBalanceDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;

	private Date date;

	private String companyName;
	
	private String code;

	private String address;

	private String note;

	private boolean hasValidated = false;

	private Long validatedById;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	

	public boolean isHasValidated() {
		return hasValidated;
	}

	public void setHasValidated(boolean hasValidated) {
		this.hasValidated = hasValidated;
	}

	public Long getValidatedById() {
		return validatedById;
	}

	public void setValidatedById(Long validatedById) {
		this.validatedById = validatedById;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
