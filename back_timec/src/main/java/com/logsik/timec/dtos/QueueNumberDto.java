package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.QueueNumberStatus;
import com.logsik.timec.enums.QueueType;

public class QueueNumberDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long queueId;
	private Integer theNumber;
	private Long patientId;
	private Date callTime;
	private QueueType type;
	private String note;
	private QueueNumberStatus status;
	private String reasonForReceiving;
	private String formArrived;
	private String packageId;
	private String couponId;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getQueueId() {
		return queueId;
	}
	public void setQueueId(Long queueId) {
		this.queueId = queueId;
	}
	public Integer getTheNumber() {
		return theNumber;
	}
	public void setTheNumber(Integer theNumber) {
		this.theNumber = theNumber;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public Date getCallTime() {
		return callTime;
	}
	public void setCallTime(Date callTime) {
		this.callTime = callTime;
	}
	public QueueType getType() {
		return type;
	}
	public void setType(QueueType type) {
		this.type = type;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public QueueNumberStatus getStatus() {
		return status;
	}
	public void setStatus(QueueNumberStatus status) {
		this.status = status;
	}
	public String getReasonForReceiving() {
		return reasonForReceiving;
	}
	public void setReasonForReceiving(String reasonForReceiving) {
		this.reasonForReceiving = reasonForReceiving;
	}
	public String getFormArrived() {
		return formArrived;
	}
	public void setFormArrived(String formArrived) {
		this.formArrived = formArrived;
	}
	public String getPackageId() {
		return packageId;
	}
	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}
	public String getCouponId() {
		return couponId;
	}
	public void setCouponId(String couponId) {
		this.couponId = couponId;
	}
	
	
}
