package com.logsik.timec.dtos;

import java.io.Serializable;

import com.logsik.timec.enums.StatusDayRevenue;

public class MonthRevenueDto implements Serializable {
	private static final long serialVersionUID = 1L;
    
private Long id;
	
	
	private Long hospitalId;
	
	private Integer month;
	
	private Integer year;

	private Long revenue;
	
	private Long profit;
	
	private StatusDayRevenue status;
	
	
	private Long validatedBy;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getHospitalId() {
		return hospitalId;
	}


	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
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


	public Long getRevenue() {
		return revenue;
	}


	public void setRevenue(Long revenue) {
		this.revenue = revenue;
	}


	public Long getProfit() {
		return profit;
	}


	public void setProfit(Long profit) {
		this.profit = profit;
	}


	public StatusDayRevenue getStatus() {
		return status;
	}


	public void setStatus(StatusDayRevenue status) {
		this.status = status;
	}


	public Long getValidatedBy() {
		return validatedBy;
	}


	public void setValidatedBy(Long validatedBy) {
		this.validatedBy = validatedBy;
	}
	
	
	
	
}
