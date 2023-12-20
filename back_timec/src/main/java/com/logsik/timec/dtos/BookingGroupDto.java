package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.StatusBooking;

public class BookingGroupDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Date createdDate;
	private Date appointmentDate;
	private Integer numberOfAttendees;
	private StatusBooking status;
	private String note;
	private Long companyId;
	private Long packageId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public Integer getNumberOfAttendees() {
		return numberOfAttendees;
	}

	public void setNumberOfAttendees(Integer numberOfAttendees) {
		this.numberOfAttendees = numberOfAttendees;
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

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Long getPackageId() {
		return packageId;
	}

	public void setPackageId(Long packageId) {
		this.packageId = packageId;
	}

}
