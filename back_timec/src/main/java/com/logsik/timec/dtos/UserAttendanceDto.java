package com.logsik.timec.dtos;

import java.util.Date;

public class UserAttendanceDto {
	
	private Long id;
	private Long userId;
	private Date dateToWork;
	private Float workHours;
	private Integer month;
	private Integer year;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getDateToWork() {
		return dateToWork;
	}

	public void setDateToWork(Date dateToWork) {
		this.dateToWork = dateToWork;
	}

	public Float getWorkHours() {
		return workHours;
	}

	public void setWorkHours(Float workHours) {
		this.workHours = workHours;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

}
