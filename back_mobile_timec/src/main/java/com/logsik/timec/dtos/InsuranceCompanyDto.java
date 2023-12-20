package com.logsik.timec.dtos;

import java.io.Serializable;

public class InsuranceCompanyDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;
	private String address;
	private String note;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	
}
