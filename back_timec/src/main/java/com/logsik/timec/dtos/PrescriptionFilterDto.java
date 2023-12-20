package com.logsik.timec.dtos;

import java.util.Date;

public class PrescriptionFilterDto {
	
	private Date fromDate;
    private String fullName;
    private String address;
    private Date toDate;
    private Long docter;
    private Long hospital;
    private Long department;
    
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public Long getDocter() {
		return docter;
	}
	public void setDocter(Long docter) {
		this.docter = docter;
	}
	public Long getHospital() {
		return hospital;
	}
	public void setHospital(Long hospital) {
		this.hospital = hospital;
	}
	public Long getDepartment() {
		return department;
	}
	public void setDepartment(Long department) {
		this.department = department;
	}
	public PrescriptionFilterDto(Date fromDate, String fullName, String address, Date toDate, Long docter,
			Long hospital, Long department) {
		super();
		this.fromDate = fromDate;
		this.fullName = fullName;
		this.address = address;
		this.toDate = toDate;
		this.docter = docter;
		this.hospital = hospital;
		this.department = department;
	}
    
}
