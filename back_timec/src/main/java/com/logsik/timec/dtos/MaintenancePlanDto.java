package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.StatusMaintenancePlan;

public class MaintenancePlanDto {

	private Long id;
	private Long deviceId;
	private Date createdDate;
	private Date planDate;
	private StatusMaintenancePlan status;
	private String note;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(Long deviceId) {
		this.deviceId = deviceId;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getPlanDate() {
		return planDate;
	}
	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}
	public StatusMaintenancePlan getStatus() {
		return status;
	}
	public void setStatus(StatusMaintenancePlan status) {
		this.status = status;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

}
