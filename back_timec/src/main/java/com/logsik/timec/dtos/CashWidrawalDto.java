package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class CashWidrawalDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long cashDeskId;
	private Long widrawalAmount;
	private Date widrawalTime;
	private Long validateUserId;
	private String note;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCashDeskId() {
		return cashDeskId;
	}
	public void setCashDeskId(Long cashDeskId) {
		this.cashDeskId = cashDeskId;
	}
	public Long getWidrawalAmount() {
		return widrawalAmount;
	}
	public void setWidrawalAmount(Long widrawalAmount) {
		this.widrawalAmount = widrawalAmount;
	}
	public Date getWidrawalTime() {
		return widrawalTime;
	}
	public void setWidrawalTime(Date widrawalTime) {
		this.widrawalTime = widrawalTime;
	}
	public Long getValidateUserId() {
		return validateUserId;
	}
	public void setValidateUserId(Long validateUserId) {
		this.validateUserId = validateUserId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}

}
