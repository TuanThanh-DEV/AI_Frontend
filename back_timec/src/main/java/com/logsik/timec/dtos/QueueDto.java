package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.Status;

public class QueueDto {

	private Long id;
	private Long departmentId;
	private Long callerId;
	private String name;
	private Integer currentNumber;
	private Integer nextNumber;
	private Integer maxNumber;
	private Date createdDate;
	private Status status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
	
	public Long getCallerId() {
		return callerId;
	}
	public void setCallerId(Long callerId) {
		this.callerId = callerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getCurrentNumber() {
		return currentNumber;
	}
	public void setCurrentNumber(Integer currentNumber) {
		this.currentNumber = currentNumber;
	}
	public Integer getNextNumber() {
		return nextNumber;
	}
	public void setNextNumber(Integer nextNumber) {
		this.nextNumber = nextNumber;
	}
	public Integer getMaxNumber() {
		return maxNumber;
	}
	public void setMaxNumber(Integer maxNumber) {
		this.maxNumber = maxNumber;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
}
