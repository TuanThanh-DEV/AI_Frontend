package com.logsik.timec.dtos;

public class UserSalaryDto {

	private Long id;
	private Long userId;
	private Integer month;
	private Integer year;
	private Long grossSalary;
	private Long inssurance;
	private Long additional;
	private Long penaltyFee;
	private Long otherMinusFee;
	private Double netSalary;
	private Long incomeTax;
	private Long birthdayFee;
	private Long holidayFee;
	private Long lunchFee;
	private Long diligenceFee;
	private Long otherSupportFee;
	private String note;
	
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
	public Long getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Long grossSalary) {
		this.grossSalary = grossSalary;
	}
	public Long getInssurance() {
		return inssurance;
	}
	public void setInssurance(Long inssurance) {
		this.inssurance = inssurance;
	}
	public Long getAdditional() {
		return additional;
	}
	public void setAdditional(Long additional) {
		this.additional = additional;
	}
	public Long getPenaltyFee() {
		return penaltyFee;
	}
	public void setPenaltyFee(Long penaltyFee) {
		this.penaltyFee = penaltyFee;
	}
	public Long getOtherMinusFee() {
		return otherMinusFee;
	}
	public void setOtherMinusFee(Long otherMinusFee) {
		this.otherMinusFee = otherMinusFee;
	}
	public Double getNetSalary() {
		return netSalary;
	}
	public void setNetSalary(Double netSalary) {
		this.netSalary = netSalary;
	}
	public Long getIncomeTax() {
		return incomeTax;
	}
	public void setIncomeTax(Long incomeTax) {
		this.incomeTax = incomeTax;
	}
	public Long getBirthdayFee() {
		return birthdayFee;
	}
	public void setBirthdayFee(Long birthdayFee) {
		this.birthdayFee = birthdayFee;
	}
	public Long getHolidayFee() {
		return holidayFee;
	}
	public void setHolidayFee(Long holidayFee) {
		this.holidayFee = holidayFee;
	}
	public Long getLunchFee() {
		return lunchFee;
	}
	public void setLunchFee(Long lunchFee) {
		this.lunchFee = lunchFee;
	}
	public Long getDiligenceFee() {
		return diligenceFee;
	}
	public void setDiligenceFee(Long diligenceFee) {
		this.diligenceFee = diligenceFee;
	}
	public Long getOtherSupportFee() {
		return otherSupportFee;
	}
	public void setOtherSupportFee(Long otherSupportFee) {
		this.otherSupportFee = otherSupportFee;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}
