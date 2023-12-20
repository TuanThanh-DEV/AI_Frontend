package com.logsik.timec.dtos;

import com.logsik.timec.enums.StatusBooking;

public class PatientBookingGroupDto {

	private Long id;
	private Long patientId;
	private Long bookingGroupId;
	private StatusBooking status;
	private String note;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public Long getBookingGroupId() {
		return bookingGroupId;
	}
	public void setBookingGroupId(Long bookingGroupId) {
		this.bookingGroupId = bookingGroupId;
	}
	public StatusBooking getStatus() {
		return status;
	}
	public void setStatus(StatusBooking status) {
		this.status = status;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	
	
}
