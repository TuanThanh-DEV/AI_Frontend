package com.logsik.timec.dtos;

import java.io.Serializable;

public class TrialBalanceDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;

	private Long accountCodeId;
	
	private Long yearBalanceId;

	private Long beginYearAmount;

	private Long endYearAmount;

	private Long note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAccountCodeId() {
		return accountCodeId;
	}

	public void setAccountCodeId(Long accountCodeId) {
		this.accountCodeId = accountCodeId;
	}

	public Long getBeginYearAmount() {
		return beginYearAmount;
	}

	public void setBeginYearAmount(Long beginYearAmount) {
		this.beginYearAmount = beginYearAmount;
	}

	public Long getEndYearAmount() {
		return endYearAmount;
	}

	public void setEndYearAmount(Long endYearAmount) {
		this.endYearAmount = endYearAmount;
	}

	public Long getNote() {
		return note;
	}

	public void setNote(Long note) {
		this.note = note;
	}

	public Long getYearBalanceId() {
		return yearBalanceId;
	}

	public void setYearBalanceId(Long yearBalanceId) {
		this.yearBalanceId = yearBalanceId;
	}
	
	
}
