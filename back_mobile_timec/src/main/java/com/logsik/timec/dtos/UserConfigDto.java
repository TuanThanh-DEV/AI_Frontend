package com.logsik.timec.dtos;

public class UserConfigDto {
	private Long id;
	
	private boolean hasSalary;
	
	private Long birthdayFee;
	
	private Long holidayFee;
	
	private Long lunchFee;
	
	private Long diligenceFee;
	
	private Long otherSupportFee;
	
	private Long grossSalary;
	
	private Long incomeTax;
	
	private String otherSupportFeeNote;
	
	private Long userId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isHasSalary() {
		return hasSalary;
	}

	public void setHasSalary(boolean hasSalary) {
		this.hasSalary = hasSalary;
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

	public Long getGrossSalary() {
		return grossSalary;
	}

	public void setGrossSalary(Long grossSalary) {
		this.grossSalary = grossSalary;
	}

	public Long getIncomeTax() {
		return incomeTax;
	}

	public void setIncomeTax(Long incomeTax) {
		this.incomeTax = incomeTax;
	}

	public String getOtherSupportFeeNote() {
		return otherSupportFeeNote;
	}

	public void setOtherSupportFeeNote(String otherSupportFeeNote) {
		this.otherSupportFeeNote = otherSupportFeeNote;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
