package com.logsik.timec.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity(name = "user_config")
public class UserConfig implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id", updatable = false,insertable= false)
	private User user;
	
	@Column(name="user_id")
	private Long userId;
	
	@Column
	private boolean hasSalary;
	
	@Column
	private long birthdayFee;
	
	@Column
	private long holidayFee;
	
	@Column
	private long lunchFee;
	
	@Column
	private long diligenceFee;
	
	@Column
	private long otherSupportFee;
	
	@Column
	private long grossSalary;
	
	@Column
	private long incomeTax;
	
	@Column
	private String otherSupportFeeNote;
	
	@Column
	private long inssurance;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

//	public void setUser(User user) {
//		this.user = user;
//	}

	public boolean isHasSalary() {
		return hasSalary;
	}

	public void setHasSalary(boolean hasSalary) {
		this.hasSalary = hasSalary;
	}

	public long getBirthdayFee() {
		return birthdayFee;
	}

	public void setBirthdayFee(long birthdayFee) {
		this.birthdayFee = birthdayFee;
	}

	public long getHolidayFee() {
		return holidayFee;
	}

	public void setHolidayFee(long holidayFee) {
		this.holidayFee = holidayFee;
	}

	public long getLunchFee() {
		return lunchFee;
	}

	public void setLunchFee(long lunchFee) {
		this.lunchFee = lunchFee;
	}

	public long getDiligenceFee() {
		return diligenceFee;
	}

	public void setDiligenceFee(long diligenceFee) {
		this.diligenceFee = diligenceFee;
	}

	public long getOtherSupportFee() {
		return otherSupportFee;
	}

	public void setOtherSupportFee(long otherSupportFee) {
		this.otherSupportFee = otherSupportFee;
	}

	public long getGrossSalary() {
		return grossSalary;
	}

	public void setGrossSalary(long grossSalary) {
		this.grossSalary = grossSalary;
	}

	public long getIncomeTax() {
		return incomeTax;
	}

	public void setIncomeTax(long incomeTax) {
		this.incomeTax = incomeTax;
	}

	public String getOtherSupportFeeNote() {
		return otherSupportFeeNote;
	}

	public void setOtherSupportFeeNote(String otherSupportFeeNote) {
		this.otherSupportFeeNote = otherSupportFeeNote;
	}

	public long getInssurance() {
		return inssurance;
	}

	public void setInssurance(long inssurance) {
		this.inssurance = inssurance;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
}
